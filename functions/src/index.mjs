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

// 定义PayPal环境配置秘密
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


// 使用Firebase环境配置
// const clientId = "ATvxwPLNB7YURswAzGKYDa8TJAUx-Co-Z17VUfSBvDJ9cNK8ipeP5r16OBjNoSXHevl8egA6-e7SCYDL"
// const secretKey = "EAOasMlFOuJv7pkXsEobLEvmdqVngftHc6UbFAdVX6P7hpuC_G9WDBbiRnOwaL5_2MMQ5hJ8hMBPZxsQ"

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

  // Check if an order already exists for the user
  const orderRef = firestore.collection("order").doc(uid);
  const orderSnapshot = await orderRef.get();

  let orderId;
  if (orderSnapshot.exists) {
    // Update the existing order
    await orderRef.update(draft);
    orderId = uid; // The order ID is the user's UID
  } else {
    // Create a new order with the UID as the document ID
    await orderRef.set(draft);
    orderId = uid; // The order ID is the user's UID
  }

  //Save the order draft object to the Firestore collection named "order" and wait for the operation to complete
  // const order = await firestore.collection("order").add(draft);

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
  return {id: orderId, order: draft, restaurant: restaurant};
});


export const paypalCreateOrder = onCall({ secrets: ["PAYPAL_CLIENT_ID", "PAYPAL_SECRET_KEY"] }, async (request) => {
  // 检查用户是否已认证
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }

  // 使用秘密值初始化PayPal客户端
  const environment = new core.SandboxEnvironment(paypalClientId.value(), paypalSecretKey.value());
  const client = new core.PayPalHttpClient(environment);

  // 设置订单请求体
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
    // 执行创建订单请求
    const response = await client.execute(requestBody);
    return { id: response.result.id };
  } catch (error) {
    console.error(error);
    throw new HttpsError('internal', 'Unable to create order.');
  }
});

export const paypalHandleOrder = onCall({ secrets: ["PAYPAL_CLIENT_ID", "PAYPAL_SECRET_KEY"] }, async (request) => {
  // 检查用户是否已认证
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }

  const uid = request.auth.uid;

  // 使用秘密值初始化PayPal客户端
  const environment = new core.SandboxEnvironment(paypalClientId.value(), paypalSecretKey.value());
  const client = new core.PayPalHttpClient(environment);

  // 从请求数据中获取订单ID和paypalId
  const paypalId = request.data.paypalId;
  if (!paypalId) {
    throw new HttpsError('invalid-argument', 'paypal id is required.');
  }

  // 设置捕获订单请求体
  let requestBody = new orders.OrdersCaptureRequest(paypalId);
  requestBody.requestBody({});

  try {
    const response = await client.execute(requestBody);
    // 订单捕获成功，更新数据库中的订单状态
    const orderRef = admin.firestore().collection('order').doc(uid);
    await orderRef.update({ status: 'confirmed' });
    return response.result;
  } catch (error) {
    // 捕获订单失败，更新数据库中的订单状态
    const orderRef = admin.firestore().collection('order').doc(uid);
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
    ...line, // 包含商品信息
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
