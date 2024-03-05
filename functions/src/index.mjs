// import * as admin from "firebase-admin";

//Note: cd to the funtions path, and run "npm run deploy"
import admin from 'firebase-admin';

import { CloudTasksClient } from '@google-cloud/tasks';
const client = new CloudTasksClient();

import {onCall, onRequest, HttpsError } from "firebase-functions/v2/https";
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
import { calculateDistanceTime, getLatLng } from "./utils/mapServices.mjs";


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
const googleMapsKey = defineSecret("GOOGLEMAPS_SERVER_KEY");


//email address hezhihong98@gmail.com 
//https://nodemailer.com/
const transport = createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "264ae0c6cf23c7",
    pass: "aed0a46367cffc",
  },
});



async function createTaskForOrderUpdate(orderId, riderId, delayInSeconds, remainingTime, newStatus) {
  const project = 'food-odering-project-3e43f';
  const queue = 'orders';
  const location = 'us-central1';
  const url = `https://${location}-${project}.cloudfunctions.net/updateOrderStatus`;
  const payload = {orderId, riderId, remainingTime, newStatus};

  const parent = client.queuePath(project, location, queue);
  const scheduleTimeSeconds = Math.round(delayInSeconds + Date.now() / 1000);
  const task = {
    httpRequest: {
      httpMethod: 'POST',
      url,
      body: Buffer.from(JSON.stringify(payload)).toString('base64'),
      headers: {
        'Content-Type': 'application/json',
      },
    },
    scheduleTime: {
      seconds: scheduleTimeSeconds,
    },
  };

  await client.createTask({parent, task});
}

export const updateOrderStatus = onRequest(async (req, res) => {
  if (req.method === "POST") {
    try {
      const { orderId, riderId, remainingTime, newStatus } = req.body;
      const firestore = admin.firestore();

      // 更新订单状态
      const orderRef = firestore.collection("order").doc(orderId);
      await orderRef.update({ orderArriveStatus: newStatus, waitingTime: remainingTime });
      const orderDoc = await orderRef.get();
      const orderData = orderDoc.data();

      // 更新骑手状态
      const riderRef = firestore.collection("deliveryperson").doc(riderId);
      await riderRef.update({ status: newStatus, estimatedTime: remainingTime });
      if(remainingTime === 0){
        await riderRef.update({ isFree: true }); //证明骑手已到达，可以重新接单了
      }
      const riderDoc = await riderRef.get();
      const riderData = riderDoc.data();

      // 获取餐厅信息
      const restaurantDoc = await firestore.doc("restaurant/info").get();
      const restaurant = restaurantDoc.data();

      //如果已经送达，就不用显示这句话了
      let remainingTimeParagraph = remainingTime === 0 ? "" : `<p>Expected delivery in <b> ${remainingTime} </b> minutes</p>`;

      // 发送邮件通知
      let info = await transport.sendMail({
        to: orderData.email,
        subject: `${restaurant.name} - Order Status Update`,
        html: `
          <div>
            <h1>Hi ${orderData.firstName}, your order status has been updated.</h1>
            <p>Order ID: ${orderId}</p>
            <p>Your order has been accepted by our food delivery staff: ${riderData.firstname} ${riderData.lastname}</p>
            <p>Your order status now is: ${newStatus}</p>
            <p>Delivery rider position: Based on GPS tracking of the rider's real-time position, we cannot achieve such precision because the riders are all samples</p>
            ${remainingTimeParagraph}
            <p>If you need any assistance, feel free to contact us at ${restaurant.phone}.</p>
            <p>And you can also contact our food delivery staff at ${riderData.phone}.</p>
          </div>
        `
      });

      console.log("Message sent: %s", info.messageId);
      res.status(200).send("Order status updated and email sent.");
    } catch (error) {
      console.error("Error: %s", error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
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

  const userRef = await firestore.collection('users').doc(uid).get();
  const userData = userRef.data();

  // 获取 'email' 字段的值
  const email = userData.email;
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
            <p>Order ID: ${draft.id}</p>
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
            <p>Comments: ${draft.comments} </p>
            <p>Subtotal: $${draft.subTotal.toFixed(2)}</p>
            <p>Total: $${draft.total.toFixed(2)}</p>
            <p>please pay your order as soon as possible</p>
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

export const ridersHandler = onCall({ secrets: ["GOOGLEMAPS_SERVER_KEY"] }, async (request) => {

  const firestore = admin.firestore();
  //获取orderId
  const orderId = request.data.orderId;
  //获取餐厅地址
  const restaurantAddress = request.data.restaurantAddress;
  //获取用户地址
  const userAddress = request.data.userAddress;

  //调用函数计算餐厅到用户地址的距离和时间
  const restaurantHomeInfo = await calculateDistanceTime(restaurantAddress, userAddress, googleMapsKey.value());
  // const restaurantHomedistance = restaurantHomeInfo.distance;
  const restaurantHomeTime = restaurantHomeInfo.duration;

  // 获取指定的订单文档引用
  const orderRef = firestore.collection("order").doc(orderId);

  //寻找空闲的配送员
  const deliveryPersonsRef = firestore.collection("deliveryperson");
  const snapshot = await deliveryPersonsRef.where("isFree", "==", true).get();

  //开始实现找到距离最近的配送员
  let closestDeliveryPerson = null;
  let shortestDistance = Infinity;

  //循环遍历所有isFree为true的配送员
  for (const doc of snapshot.docs) { 
    //先从数据库中拿我们的数据出来
    const deliveryPerson = doc.data();
    //餐厅作为起点，外卖员作为终点计算距离
    const deliveryPersonInfo = await calculateDistanceTime(restaurantAddress, deliveryPerson.address, googleMapsKey.value());
    const distance = deliveryPersonInfo.distance;
    //比较距离大小并更新 
    if (distance < shortestDistance) {
      shortestDistance = distance;
      closestDeliveryPerson = doc;
    }
  }

  //循环结束，找到最近的外卖员，更新这个外卖员个人信息并返回
  //包括isFree更新为false以及他的orderId
  if (closestDeliveryPerson) {
    const riderId = closestDeliveryPerson.id;
    // 获取当前时间
    const now = new Date();
    // 调用calculateDistance函数获取距离和时间
    const deliveryPersonInfo = await calculateDistanceTime(restaurantAddress, closestDeliveryPerson.data().address, googleMapsKey.value());
    // 计算预计到达时间（将分钟转换为毫秒，并加上5分钟的缓冲时间）
    const bufferTime = 5; // 5分钟的缓冲时间
    //模拟简单算法，总耗时为：5分钟缓冲时间+外卖员到餐厅的距离+餐厅到用户住址的时间即为总时间
    const arrivalTimeInMilliseconds = now.getTime() + (deliveryPersonInfo.duration + bufferTime + restaurantHomeTime) * 60000;
    const arrivalTime = new Date(arrivalTimeInMilliseconds);

    // 使用事务同时更新订单和配送员信息
    await firestore.runTransaction(async (transaction) => {
      const orderSnapshot = await transaction.get(orderRef);
      if (!orderSnapshot.exists) {
        throw new Error(`Order with ID ${orderId} does not exist.`);
      }
      if (orderSnapshot.data().deliveryPersonId) {
        console.log(`Order ${orderId} is already assigned to a delivery person.`);
        return; // 如果已分配，直接退出事务
      }

      transaction.update(orderRef, {
        deliveryPersonId: closestDeliveryPerson.id,
        estimatedArrivalTime: arrivalTime,
        assignedStatus: true,
      });

      transaction.update(closestDeliveryPerson.ref, {
        isFree: false,
        orderId: orderId,
        estimatedArrivalTime: arrivalTime,
      });
    });

    // 使用calculateDistance函数返回的预计配送时间（分钟），加上额外的5分钟
    const estimatedDeliveryTime = deliveryPersonInfo.duration + bufferTime + restaurantHomeTime;

    // 定义状态更新时间点
    const totalTimeInSeconds = (deliveryPersonInfo.duration + bufferTime + restaurantHomeTime) * 60;

    const beginUpdateDelay = 120; //2分钟后骑手已接单
    const beginRemainingTime = Math.round((totalTimeInSeconds - beginUpdateDelay) / 60);

    const firstUpdateDelay = totalTimeInSeconds / 3;
    const firstRemainingTime = Math.round((totalTimeInSeconds - firstUpdateDelay) / 60);

    const secondUpdateDelay = 2 * totalTimeInSeconds / 3;
    const secondRemainingTime = Math.round((totalTimeInSeconds - secondUpdateDelay) / 60);

    const finalUpdateDelay = totalTimeInSeconds;
    const finalRemainingTime = 0;

    // 创建任务
    await createTaskForOrderUpdate(orderId, riderId, beginUpdateDelay, beginRemainingTime, 'accepted');
    await createTaskForOrderUpdate(orderId, riderId, firstUpdateDelay, firstRemainingTime, 'delivering');
    await createTaskForOrderUpdate(orderId, riderId, secondUpdateDelay, secondRemainingTime, 'arriving');
    await createTaskForOrderUpdate(orderId, riderId, finalUpdateDelay, finalRemainingTime, 'arrived');

    return {
      deliveryPersonFirstName: closestDeliveryPerson.data().firstname,
      deliveryPersonLastName: closestDeliveryPerson.data().lastname,
      estimatedDeliveryTime: estimatedDeliveryTime // 以分钟为单位
    };
  } else {
    // 没有找到可用的配送员
    throw new Error('No available delivery person found');
  }

});


// export const getOrderHistory = onCall (async (request) => {
//   const ordersRef = admin.firestore().collection("order");


//   const dbOrders = [];

//   console.info("getOrderHistory log: uid: " + request.data.id);

//   try { 
//     const confirmedOrdersSnapshot = await ordersRef.where("createdBy", "==", request.data.id).where("status", "==", "confirmed").get();

//     console.info("getOrderHistory log: Snapshot done");    
  
//     if(confirmedOrdersSnapshot.empty){
//       // No confirmed orders
//       console.info("getOrderHistory log: no confirmed orders found");
//       return null;
//     } 

//     confirmedOrdersSnapshot.forEach((order) => {
//       console.info("getOrderHistory log: " + order.data());
//       dbOrders.push(order.data())
//     });
  
//     return dbOrders;
//     } catch (error) {
//     throw new HttpsError('internal', 'Unable to pull order history.', error);
//   }
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
  const uid =request.auth.uid;

  //check if user with email already exists
  const existingUserDoc = await firestore.collection("users").doc(email).get();
  const existingUser = existingUserDoc.data();
  if (existingUser) {
    throw new HttpsError('already-exists', 'The email provided is already in use by an existing user.');
  }


  /**
   * The client side has successfully created the user using createUserWithEmailAndPassword and sent an email verification (sendEmailVerification),
   * There is no need to create a user account again in the cloud function. 
   * The main responsibility becomes to save additional user information in Firestore, 
   * rather than creating new users in the authentication system
   * 
   * const userRecord = await admin.auth().createUser({
   *  email: request.data.email, 
   *  password: request.data.password
   * });
       
   */

  // Prepare user info without the password
  const userInfoWithoutPassword = {
    firstName: request.data.firstName,
    lastName: request.data.lastName,
    email: request.data.email,
    phone: request.data.phone,
    createdBy: uid,
    lastLogin: admin.firestore.FieldValue.serverTimestamp(),
    pickupTime: admin.firestore.FieldValue.serverTimestamp(),
    createAt: admin.firestore.FieldValue.serverTimestamp(),
  };


  // Save the additional user data in Firestore (without the password)
  await admin.firestore().collection('users').doc(uid).set(userInfoWithoutPassword);

  // Return success response
  return { success: true, uid: uid, userInfo: userInfoWithoutPassword };
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
