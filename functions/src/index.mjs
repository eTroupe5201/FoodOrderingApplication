// import * as admin from "firebase-admin";

//Note: cd to the funtions path, and run "npm run deploy"
import admin from 'firebase-admin';

import {onCall, HttpsError} from "firebase-functions/v2/https";

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

  //Create a reference to Firestore for database operations
  const firestore = admin.firestore();
  //Retrieve order field in  database lines [] from the request, which is included in the attributes of the order. 
  //Lines is an array, and the rest are the firstname and lastname and so on
  const lines = request.data.lines;

  const draft = {
    ...request.data, //Copy the data in the request to the draft object
    status: "pending",
    createdBy: request.auth.uid, //Set the createdBy field to the current user's UID (User Identity)
    total: calculateOrderTotal(lines, 10),
    subTotal: calculateOrderSubtotal(lines),
    //A special value used by the server to fill in the current timestamp when a document is submitted to the database
    pickupTime: admin.firestore.FieldValue.serverTimestamp(),
    createAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  //Save the order draft object to the Firestore collection named "order" and wait for the operation to complete
  const order = await firestore.collection("order").add(draft);

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
  return {id: order.id, order: draft, restaurant: restaurant};
});


export const registerAccount = onCall(async (request) => {
  //Check if the user calling the function has passed authentication. 
  //If the user is not authenticated, the function returns an error.
  if (!request.auth) {
    return new HttpsError("failed-precondition", "You are not authorized");
  }
  
  console.log("WE HERE");
  //Create a reference to Firestore for database operations
  const firestore = admin.firestore();

  const draft = {
    ...request.data,
    createdBy: request.auth.uid, //Set the createdBy field to the current user's UID (User Identity)
    pickupTime: admin.firestore.FieldValue.serverTimestamp(),
    createAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  //Save the user info to the Firestore collection named "users" and wait for the operation to complete
  const userInfo = await firestore.collection("users").add(draft);
  const restaurantDoc = await firestore.doc("restaurant/info").get();
  const restaurant = restaurantDoc.data();

  //after calling registerAccount in dataProvider, userInfo has needed user details to create an email confirmation
  if (restaurant) {
    try {
      // Using the await keyword to wait for the asynchronous operation of sendMail to complete
      let info = await transport.sendMail({
        to: `${draft.email}`,
        subject: `Welcome to Divine Delicacies, ${draft.firstName}!`,
        html: `
          <div>
            <h1>Hi ${draft.firstName},.</h1>
            <p>Thank you for linking your email, ${draft.email}, to create an account with us. 
              We look forward to providing you with great service and even greater culinary experiences! 
            </p>
            <h2>Restaurant Information:</h2>
            <p>${restaurant.name}</p>
            <p>${restaurant.address}</p>
            <p>If you need any assistance, feel free to contact us at ${restaurant.phone}.</p>
          </div>
        `,
      });
      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.error("Error sending email: %s", error);
    }
  }

  // //After the function is confirmed, return the newly created order ID and order draft object.
   return {id: userInfo.id, userInfo: draft};
});


// export const tryLogin = onCall(async (request) => {
//   //Check if the user calling the function has passed authentication. 
//   //If the user is not authenticated, the function returns an error.
//   if (!request.auth) {
//     return new HttpsError("failed-precondition", "You are not authorized");
//   }
  
//   //Create a reference to Firestore for database operations
//   const firestore = admin.firestore();

//   const email = request.data.email; 
//   const pw = request.data.password;
  
//   //to track latest login
//   const latestSuccessfulLogin = {
//     createdBy: request.auth.uid, //Set the createdBy field to the current user's UID (User Identity)
//     pickupTime: admin.firestore.FieldValue.serverTimestamp(),
//     createAt: admin.firestore.FieldValue.serverTimestamp(),
//   };

//   //get reference to user for provided email address
//   const userAccountRef = await firestore.doc(db, "users", email);
//   const userAccount = userAccountRef.data();
//   console.log(userAccount);

//   //existing account found
//   if (userAccount) {
//     //check for matching password
//     if (userAccount.password === pw) {
//       setDoc(userAccountRef(db, "users", email), {
//         createdBy: latestSuccessfulLogin.createdBy,
//         pickupTime: latestSuccessfulLogin.pickupTime,
//         createAt: latestSuccessfulLogin.createAt,
//       })
//       return {userInfo: userAccount}
//     }
//     //incorrect password
//     else 

//   }

//   //return error, flagging Login page to alert user that no account exists
//   return error;
// });


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
