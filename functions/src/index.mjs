// import * as admin from "firebase-admin";

//Note: cd to the funtions path, and run "npm run deploy"
import admin from 'firebase-admin';

import {onCall, HttpsError } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import pkg from '@paypal/checkout-server-sdk';
const { core, orders } = pkg;

//https://nodemailer.com/about/
//https://mailtrap.io/inboxes/2601336/messages
import {createTransport} from "nodemailer";
import {
  calculateOrderSubtotal,
  calculateOrderTotal
} from "./utils/calculations.mjs";


/**
 * background: 
 * Firebase Functions: A serverless execution environment hosted on Google Cloud that allows you to run backend code in response to HTTP requests, database changes, and other events.
   Firestore: The NoSQL cloud database provided by Firebase for storing and synchronizing data.
   HTTP Callable Functions: Allow you to directly call these functions from client code without creating an HTTP request.

   The reason why use firebase admin SDK: (https://firebase.google.com/docs/admin/setup)
   When a user places an order, the application backend (server) can use the Admin SDK to create a new Firestore document 
   to store order information. Since the operation occurs on the server side, 
   we can perform additional verification or processing before saving the order, 
   such as checking inventory, applying discounts, or calculating tax rates. 
   So, for applications that need to process and store sensitive data on the server side, the Firebase Admin SDK is a very suitable choice.
 */

//Initialize the Firebase Admin SDK, which is a prerequisite for communicating with the Firebase service
admin.initializeApp();

// Define PayPal environment configuration secrets
const paypalClientId = defineSecret("PAYPAL_CLIENT_ID");
const paypalSecretKey = defineSecret("PAYPAL_SECRET_KEY");

//email address hezhihong98@gmail.com 
//https://nodemailer.com/
const transport = createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "60e6194ecc7e65",
    pass: "e9b9362aaea175",
  },
});


/*
  A Callable Cloud Function named placeorder has been defined. 
  As mentioned above, the Callable function is a special type of Cloud Function 
  that can be called directly from the front-end application without creating an HTTP request
*/
export const placeorder = onCall(async (request) => {
  //Check if the user calling the function has passed authentication. 
  //If the user is not authenticated, the function returns an error.
  if (!request.auth) {
    return new HttpsError("failed-precondition", "You are not authorized");
  }

  const uid = request.auth.uid;

  //Create a reference to Firestore for database operations
  const firestore = admin.firestore();
  //Retrieve order field in  database lines [] from the request, which is included in the attributes of the order. 
  //Lines is an array, and the rest are the firstname and lastname and so on
  const lines = request.data.lines;

  const draft = {
    ...request.data, //Copy the data in the request to the draft object
    uid: uid,
    status: "pending",
    createdBy: request.auth.uid, //Set the createdBy field to the current user's UID (User Identity)
    total: calculateOrderTotal(lines, 10).toFixed(2),
    subTotal: calculateOrderSubtotal(lines),
    //A special value used by the server to fill in the current timestamp when a document is submitted to the database
    pickupTime: admin.firestore.FieldValue.serverTimestamp(),
    createAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  //Check for any unfinished orders
  const ordersRef = firestore.collection("order");
  const pendingOrderSnapshot = await ordersRef.where("uid", "==", uid).where("status", "==", "pending").get();

  //Process unfinished orders
  /**
   * According to the previous logic, if the system always checks for orders in a "pending" state when processing orders, 
   * and updates them instead of creating new orders if such orders are found, 
   * theoretically there should not be multiple "pending" orders for the same user at the same time.
   * 
   * PendingOrdersnapshot.docs[0]: The document snapshot of the first (or possibly the only) matching "pending" status order. 
   * Even if the expectation is usually to find an order with a "pending" status, 
   * the query design still allows for multiple results to be returned
   */
  if(!pendingOrderSnapshot.empty){
    // There are unfinished orders, please update them
    const existingOrderId = pendingOrderSnapshot.docs[0].id;
    await ordersRef.doc(existingOrderId).update({
      ...draft, // Update order details
    });

    return {
      success: "Order updated successfully",
      id: existingOrderId,
      order: draft,
      status: "pending-update", // New status indicating updated pending orders
    };
  }

  //Check if there are any cancelled orders
  const cancelledOrderSnapshot = await ordersRef.where("uid", "==", uid).where("status", "==", "cancelled").get();
  
  if (!cancelledOrderSnapshot.empty) {
    // There are cancelled orders, please delete these orders
    for (const doc of cancelledOrderSnapshot.docs) {
      await ordersRef.doc(doc.id).delete();
    }

    // Create a new order after deleting the cancelled order
    const newOrderRef = ordersRef.doc(); // generate unique id from firebase
    await newOrderRef.set(draft);

    return {
      success: "Order placed successfully after cancelling previous orders",
      id: newOrderRef.id,
      order: draft,
      status: "cancelled-update",
    };
  }

  // No pending or cancelled orders, continue to create new orders
  const newOrderRef = ordersRef.doc();
  await newOrderRef.set(draft);
  

  const email = request.data.email;
  const restaurantDoc = await firestore.doc("restaurant/info").get();
  const restaurant = restaurantDoc.data();
  console.log(restaurant);

  //after calling placeorder in dataProvider, the draft data will have order and line info
  //we create a simple email confirmation letter to the email address
  //https://nodemailer.com/
  if (restaurant) {
    try {
      // Using the await keyword to wait for the asynchronous operation of sendMail to complete
      let info = await transport.sendMail({
        to: email,
        subject: `${restaurant.name} - Order Confirmation`,
        html: `
          <div>
            <h1>Hi ${draft.firstName}, your order is confirmed.</h1>
            <p>Order ID: ${order.id}</p>
            <h2>Restaurant Information:</h2>
            <p>${restaurant.name}</p>
            <p>${restaurant.address}</p>
            <h2>Order Details:</h2>
            <ul>
              ${draft.lines.map(line => `
                <li>
                  <h3>${line.quantity}x ${line.label}: $${line.price.toFixed(2)}</h3>
                  ${line.value.map(value => `
                    <p>${value.variant}: ${value.value} - $${value.price.toFixed(2)}</p>
                  `).join('')}
                </li>
              `).join('')}
            </ul>
            <p>Subtotal: $${draft.subTotal.toFixed(2)}</p>
            <p>Total: $${draft.total.toFixed(2)}</p>
            <p>If you need any assistance, feel free to contact us at ${restaurant.phone}.</p>
          </div>
        `,
      });
      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.error("Error sending email: %s", error);
    }
  }

  //After the function is confirmed, return the newly created order ID and order draft object.
  return {status: "order placed", success: "Order placed successfully", id: newOrderRef.id, order: draft, restaurant: restaurant};
});


export const paypalCreateOrder = onCall({ secrets: ["PAYPAL_CLIENT_ID", "PAYPAL_SECRET_KEY"] }, async (request) => {

  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }

  // Initialize PayPal client with secret values
  const environment = new core.SandboxEnvironment(paypalClientId.value(), paypalSecretKey.value());
  const client = new core.PayPalHttpClient(environment);

  // Set order request body
  let requestBody = new orders.OrdersCreateRequest();
  requestBody.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: request.data.total
      }
    }]
  });

  try {
    // Execute Create Order Request
    const response = await client.execute(requestBody);
    return { id: response.result.id };
  } catch (error) {
    console.error(error);
    throw new HttpsError('internal', 'Unable to create order.');
  }
});

export const paypalHandleOrder = onCall({ secrets: ["PAYPAL_CLIENT_ID", "PAYPAL_SECRET_KEY"] }, async (request) => {

  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }

  const orderId = request.data.orderId;

  // Initialize PayPal client with secret values
  const environment = new core.SandboxEnvironment(paypalClientId.value(), paypalSecretKey.value());
  const client = new core.PayPalHttpClient(environment);

  // Retrieve order ID and PayPalId from request data
  const paypalId = request.data.paypalId;
  if (!paypalId) {
    throw new HttpsError('invalid-argument', 'paypal id is required.');
  }

  // Set capture order request body
  let requestBody = new orders.OrdersCaptureRequest(paypalId);
  requestBody.requestBody({});

  try {
    const response = await client.execute(requestBody);
    // Order capture successful, update order status in the database
    const orderRef = admin.firestore().collection('order').doc(orderId);
    await orderRef.update({ status: 'confirmed' });
    return response.result;
  } catch (error) {
    // Capture order failed, update order status in database
    const orderRef = admin.firestore().collection('order').doc(orderId);
    await orderRef.update({ status: 'cancelled' });
    console.error(error);
    throw new HttpsError('internal', 'Unable to capture order.');
  }
});



export const placecart = onCall(async (request) => {
  //Check if the user calling the function has passed authentication. 
  //If the user is not authenticated, the function returns an error.
  if (!request.auth) {
    return new HttpsError("failed-precondition", "You are not authorized");
  }

  const uid = request.auth.uid;
  const itemId = request.data.id; //also parase the itemId
  const line = request.data;

  // prepare cart data
  const cartData = {
    ...line, // including food item's information
    createdAt: admin.firestore.FieldValue.serverTimestamp(), 
};


  // save user's cart info to database
  // Here, the carts collection is used to store each user's shopping cart. Each user's shopping cart is a document, and the ID of the document is the user's UID. 
  // The product items in each shopping cart are stored in the items subset of the document
  try {
      const docRef = await admin.firestore().collection('carts').doc(uid).collection('items').doc(itemId).set(cartData);
      console.log('Item added to cart with doc ID:', docRef.id); 
      return { result: "Item added to cart", docId: docRef.id }; 
  } catch (error) {
      throw new functions.https.HttpsError('internal', 'Unable to add item to cart', error);
  }
});

export const updateCartItem = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("failed-precondition", "You are not authorized");
  }

  const uid = request.auth.uid;
  const { id, quantity } = request.data; // obtain the foot item id and quantity attributes from request body

  // obtain specific food item  from specfic user's cart
  const cartItemRef = admin.firestore().collection('carts').doc(uid).collection('items').doc(id);

  try {
    // obtain food item's information
    const doc = await cartItemRef.get();

    if (!doc.exists) {
      throw new HttpsError('not-found', 'The cart item does not exist.');
    }

    // if cart item does exist, we can add up the quantity 
    await cartItemRef.update({
      quantity: admin.firestore.FieldValue.increment(quantity)
    });

    return { result: "Cart item updated successfully." };
  } catch (error) {
    throw new HttpsError('internal', 'Unable to update cart item.', error);
  }
});

export const getOrderHistory = onCall (async (request) => {
  const ordersRef = firestore.collection("order");
  const confirmedOrdersSnapshot = await ordersRef.where("createdBy", "==", request.auth.uid).where("status", "==", "confirmed").get();

  const dbOrders = [];

  if(confirmedOrdersSnapshot.empty){
    // No confirmed orders
    return null;
  }

  confirmedOrdersSnapshot.forEach((order) => 
    dbOrders.push(order.data())
  );

  return dbOrders;
});

// export const registerAccount = onCall(async (request) => {
//   //Check if the user calling the function has passed authentication. 
//   //If the user is not authenticated, the function returns an error.
//   if (!request.auth) {
//     return new HttpsError("failed-precondition", "You are not authorized");
//   }
  
//   //Create a reference to Firestore for database operations
//   const firestore = admin.firestore();

//   const email = request.data.email;

//   const draft = {
//     firstName: request.data.firstName,
//     lastName: request.data.lastName,
//     email: request.data.email,
//     phone: request.data.phone,
//     password: request.data.password,
//     createdBy: request.auth.uid, //Set the createdBy field to the current user's UID (User Identity)
//     lastLogin: admin.firestore.FieldValue.serverTimestamp(),
//     pickupTime: admin.firestore.FieldValue.serverTimestamp(),
//     createAt: admin.firestore.FieldValue.serverTimestamp(),
//   };

//   //if user with email exists already, do not process request 
//   const existingUserDoc = await firestore.collection("users").doc(email).get();
//   const existingUser = existingUserDoc.data();
//   if (existingUser) {return;}

//   //Save the user info to the Firestore collection named "users" and wait for the operation to complete
//   const userInfo = await firestore.collection("users").doc(email).set(draft);

//   // //After the function is confirmed, return the newly created order ID and order draft object.
//    return {id: userInfo.id, userInfo: draft};
// });

//We don't need to save the user's password in Firestore because Firebase Authentication already securely handles the password.
export const updateAccount = onCall(async (request) => {
  if (!request.auth) {
    return new HttpsError("failed-precondition", "You are not authorized");
  }

  const uid = request.auth.uid;

  // obtain reference to user info
  const userRef = admin.firestore().collection('users').doc(uid);

  try {
    // if cart item does exist, we can add up the quantity 
    await userRef.update({
      firstName: request.data.firstName,
      lastName: request.data.lastName,
      email: request.data.email, 
      phone: request.data.phone
    });
    return { result: "User info updated successfully." };
  } catch (error) {
    throw new HttpsError('internal', 'Unable to update user', error);
  }
});

export const registerAccount = onCall(async (request) => {

  if (!request.auth) {
    return new HttpsError("failed-precondition", "You are not authorized");
  }
  
  //Create a reference to Firestore for database operations
  const firestore = admin.firestore();

  const email = request.data.email;

  //check if user with email already exists
  const existingUserDoc = await firestore.collection("users").doc(email).get();
  const existingUser = existingUserDoc.data();
  if (existingUser) {
    throw new HttpsError('already-exists', 'The email provided is already in use by an existing user.');
  }

  // Create the user with email and password via Firebase Authentication to host our status
  const userRecord = await admin.auth().createUser({
    //uid: request.data.email,
    email: request.data.email,
    password: request.data.password
  });

  // Prepare user info without the password
  const userInfoWithoutPassword = {
    firstName: request.data.firstName,
    lastName: request.data.lastName,
    email: request.data.email,
    phone: request.data.phone,
    createdBy: request.auth.uid,
    lastLogin: admin.firestore.FieldValue.serverTimestamp(),
    pickupTime: admin.firestore.FieldValue.serverTimestamp(),
    createAt: admin.firestore.FieldValue.serverTimestamp(),
  };


  // Save the additional user data in Firestore (without the password)
  await admin.firestore().collection('users').doc(userRecord.uid).set(userInfoWithoutPassword);

  // Return success response
  return { success: true, uid: userRecord.uid, userInfo: userInfoWithoutPassword };
});

export const contactUsSubmit = onCall(async (request) => {
//Check if the user calling the function has passed authentication. 
  //If the user is not authenticated, the function returns an error.
  if (!request.auth) {
    return new HttpsError("failed-precondition", "You are not authorized");
  }
  
  //Create a reference to Firestore for database operations
  const firestore = admin.firestore();

  //parse contact form data into draft 
  const draft = {
    firstName: request.data.firstName,
    lastName: request.data.lastName,
    email: request.data.email,
    phone: request.data.phone,
    message: request.data.message,
    createdBy: request.auth.uid, //Set the createdBy field to the current user's UID (User Identity)
    lastLogin: admin.firestore.FieldValue.serverTimestamp(),
    pickupTime: admin.firestore.FieldValue.serverTimestamp(),
    createAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  
  //send form data to DB to be saved 
  const contactForm = await firestore.collection("contactus").add(draft);

  //After the function is confirmed, return the newly created order ID and order draft object.
  return {id: contactForm.id, contactForm: draft};
});

/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// })