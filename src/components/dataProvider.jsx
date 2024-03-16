/* eslint-disable no-unused-vars */
 
import React, { createContext, useContext, useEffect, useState, useRef} from "react";
import { Center, Spinner, useToast } from "@chakra-ui/react";
import { collection, doc, getDoc, getDocs, onSnapshot, deleteDoc, query, limit, writeBatch, updateDoc } from "firebase/firestore";
import { db, auth, functions } from "../utils/firebase";
import { signInAnonymously } from "firebase/auth";
import { httpsCallable } from "firebase/functions";
import { getFirestore,  where } from "firebase/firestore";
import logtail from "../logger";

// import { getLatLng } from "../utils/getLatLing";

const DataProviderContext = createContext({ 
    categories: [],
    items: [],
    lines: [],
    getItemsByCategory: () => [],
    getItemById: () => [],
    addToCart: () => {},
    removeCartItem: () => {},
    checkout: () => Promise.resolve(""),
    selectedOption: "",
    updateSelectedOption: () => {},
    selectedFilter: "",
    updateSelectedFilter: () => {},
    searchedItem: "",
    updateSearch: () => {},
});

export const useDataProvider = () => useContext(DataProviderContext);
/**
 * Set up a DataProvider in the React front-end application, which is an intermediate layer between the application and Firebase, 
 * used to handle data retrieval and updates. The DataProvider component is responsible for retrieving data 
 * and providing it to all sub components through context. 
 * This means that data and functions are managed in a centralized location, and any changes only need to be made once in the DataProvider, 
 * and all subcomponents will automatically receive updates.
 */
export const DataProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [restaurantInfo, setRestaurantInfo] = useState();
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [lines, setLines] = useState([]);
  const [order, setOrder] = useState({});
  const [user, setUser] = useState();
  const [cartChanged, setCartChanged] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [travelTime, setTravelTime] = useState("");
  const [deliveryFirstname, setdeliveryFirstname ] = useState("");
  const [deliveryLastname, setdeliveryLastname ] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchedItem, setSearch] = useState(""); // [1

  const toast = useToast();
  // const [paypalId, setpaypalId] = useState();

  //getDoc comes from firebase firestore, it can import automatically and receive the document
  const fetchRestaurantInfo = async () => {
    /*
    The getDoc function is used to retrieve data for a single document. 
    We need to provide a reference to a specific document in Firestore.
    If we know the exact document ID I want, then we will use getDoc. 
    */
    const restaurantInfoSnapshot = await getDoc(doc(db, "restaurant", "info"));
    setRestaurantInfo(restaurantInfoSnapshot.data());
  }

  const fetchUserProfile = async () => {

    if (!user || !user.uid) {
      console.log("No user logged in, or missing UID.");
      return null; // If no user login or user doesn't have uid, return null
    }
    const uid = user.uid;
    try {
      const userProfileDoc = await getDoc(doc(db, "users", uid));
      if (!userProfileDoc.exists()) {
        console.log(`No user profile found for UID: ${uid}`);
        return null;
      }
      const userData = userProfileDoc.data();
      return userData;
    } catch (error) {
      console.error(`Error fetching user profile for UID ${uid}:`, error);
      return null;
    }
  };
  const fetchSelectedSearch = async () => {
    try {
      // Simulate fetching data asynchronously
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return ""; // Return selected option after resolving Promise
    } catch (error) {
      console.error("Error fetching selected option:", error);
      return ""; // Return empty string if error occurs
    }
  };
    // Simulated asynchronous operation to fetch selected option
    const fetchSelectedOption = async () => {
      try {
        // Simulate fetching data asynchronously
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return ""; // Return selected option after resolving Promise
      } catch (error) {
        console.error("Error fetching selected option:", error);
        return ""; // Return empty string if error occurs
      }
    };
      // Simulated asynchronous operation to fetch selected option
      const fetchSelectedFilter = async () => {
        try {
          // Simulate fetching data asynchronously
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return ""; // Return selected option after resolving Promise
        } catch (error) {
          console.error("Error fetching selected option:", error);
          return ""; // Return empty string if error occurs
        }
      };
  

  const fetchCategories = async () => {
    /*
    The getDocs function is used to retrieve data for all documents in the collection. 
    We need to provide a reference to a specific collection in Firestore. 
    If we want to retrieve all the documents in a collection, or run a query to retrieve multiple matching documents, then use getDocs.
    */

   //1. use getdocs function to get the data from the firebase
   const categoriesSnapshot = await getDocs(collection(db, "category"));
   //2. create an empty array for ready
   const dbCategories = [];
   //3. iterate array to retrieve the data and push to this array
   categoriesSnapshot.forEach((category) => 
    dbCategories.push(category.data())
   );
   //4. setCategories state
   setCategories(dbCategories);
  }

  const fetchItems = async () => {
    const itemsSnapshot = await getDocs(collection(db, "item"));
    const dbItems = [];
    itemsSnapshot.forEach((item) => dbItems.push(item.data()));
    setItems(dbItems);
  };

  const fetchItemImageById = async (id) => {
    // 假设 `id` 是你想要查询的项目的ID
    const docRef = doc(db, "item", id); // 创建对特定文档的引用
    const docSnap = await getDoc(docRef); // 获取文档快照
  
    if (docSnap.exists()) {
      const itemData = docSnap.data(); // 获取文档数据
      const itemSrc = itemData.image.src; // 假设图片的源地址存储在 'src' 字段
      // 这里可以根据需要设置图片的src，例如：setItemImageSrc(itemSrc);
      console.log(itemSrc); // 或处理src的其他逻辑
      return itemSrc;
    } else {
      // doc.data() 为 undefined 表示没有找到文档
      console.log("No such document!");
    }
  };
  
  const fetchCartItems = async () => {

    if (!user || !user.uid) {
      console.log("No user logged in, or missing UID.");
      return []; // if no user login or user doesn't have uid, return null array
    }
    const cartItems = [];
    const uid = user.uid;
    const cartRef = collection(db, "carts", uid, "items");
    try {
      const snapshot = await getDocs(cartRef);
      if (!snapshot.empty) {
        snapshot.forEach(doc => {
          cartItems.push({ id: doc.id, ...doc.data() });
        });
      }
    } catch (error) {
      console.error(`Error fetching cart items for UID ${uid}:`, error);
    }

    //console.log(`Cart items fetched for UID ${uid}:`, cartItems);

    return cartItems;
  };

  const fetchOrder = async (userId) => {
    const uid = user.uid;
    if (!uid) {
      console.log("UID is required to fetch order.");
      return null; // if no UID provided, return null
    }
    
    const orderRef = collection(db, "order"); // reference to the 'order' collection
    let orderData = null;
    
    try {
      const snapshot = await getDocs(orderRef);
      if (snapshot.empty) {
        console.log(`No order found for UID: ${userId}`);
      } else {
        snapshot.forEach(doc => {
          // Check if the order's UID matches the provided UID
          if (doc.data().uid === userId) {
            orderData = { id: doc.id, ...doc.data() };
          }
        });
      }
    } catch (error) {
      console.error(`Error fetching order for UID ${uid}:`, error);
    }
    
    
    return orderData;
  };
  
  
  
  //because this wil be about internet latency
  //so here I have to use asychronized fuction to wait our request
  const fetchData = async () => {
    //automatically log in using anonymous users I have stored in Firebase because I set up the firestore rule
    //Because for security reasons I have to set it up to only allow read/write access to authenticated users (even anonymously authenticated users)
    await signInAnonymously(auth);
    await fetchRestaurantInfo();
    await fetchCategories();
    await fetchItems();
    const data = await fetchSelectedOption();
    const filter = await fetchSelectedFilter();
    const search = await fetchSelectedSearch();
    console.log("Fetched data:", data);
    setSelectedOption(data);
    setSelectedFilter(filter);
    setSearch(search);
    setIsReady(true);

  };
  const updateSelectedFilter = (filter) => {
    setSelectedFilter(filter);
  };

  const updateSelectedOption = (option) => {
    console.log("Selected option:", option);
    setSelectedOption(option);
  };

  const updateSearch = (searchItem) => {
    console.log("Selected query:", searchItem);
    setSearch(searchItem);
  }
  const getItemById = (itemId) => {
    return items.find((item) => item.id === itemId);
  };

  const getOrderById = (orderId) => {
    return orderHistory.find((order) => order.id === orderId);
  }

  /*
    category actually is a id of string type when you look at the database
    here I will parse a category id in it and iterate each item's category, 
    which is also a string type bounded with its category type,
    to filter out every items meet in its category correspondily
  */
  const getItemsByCategory = (category) => {
    return items.filter((item) => item.category === category);
  };

  const checkCartNotEmpty = async () => {
    if (!user) return false; 
    const uid = user.uid;
    const cartRef = collection(db, "carts", uid, "items"); // Using collection to locate the user's shopping cart entry
    // Create a query object and apply limit on it
    const querySnapshot = await getDocs(query(cartRef, limit(1)));
    //console.log("Snapshot empty:", querySnapshot.empty);
    return !querySnapshot.empty; // If snapshot. empty is true, then the shopping cart is empty, otherwise it is not empty
  };

  const addToCart = async (dataWithId) => {
    const uid = user.uid;
    //1. use httpsCallable function to save to the firebase(Create an https Callable reference)
    const placeCartCallable = httpsCallable(functions, "placecart");

    //we may need to update the cart quantity directly if we have already had this food item
    //so what we can do can use fetch cart item to loop the cart items
    try{
      const cartItems = await fetchCartItems();
      let itemExists = false;

      for (const cartItem of cartItems) {
        //if food item exists, update the quantity
        if(cartItem.id === dataWithId.id){

          cartItem.quantity = dataWithId.quantity;
          itemExists = true;
          //and then call the cloud function to update the database
          const updateCartItemCallable = httpsCallable(functions, "updateCartItem");
          const { updateData } = await updateCartItemCallable(cartItem);
          console.log("Cloud function update response:", updateData); 

        }
      }

      //only when food item definetely doesn't exist, will call this function placeCartCallable(dataWithId);
      if(!itemExists){
        const { newData } = await placeCartCallable(dataWithId);
        console.log("Cloud function response:", newData);
      }
      setCartChanged(true); 
    } catch (error) {
      console.error("Error updating cart:", error);
    }

  };

  /* 
    Updates Cart in Firebase and UI, triggered by the user clicking the remove button on the Cart or CartModal.
  */
  const removeCartItem = async (itemId) => {
    if (!user) return; // make sure user does exist
    const uid = user.uid;
    const itemRef = doc(db, "carts", uid, "items", itemId); // Using doc to locate specific shopping cart entry documents
    await deleteDoc(itemRef); // Use deleteDoc to delete the document
    // update UI
    setLines(currentLines => currentLines.filter(line => line.id !== itemId));
    setCartChanged(true);
  };

  /* 
    Updates 'Favorite' field on an order to true or false. This is triggered by the user clicking the 
    heart/favorite icon on the Order page.
  */
  const updateFavoriteStatus = async (orderId, newStatus) => {
    if (!user) return; // make sure user does exist

    const orderRef = doc(db, "order", orderId); // Using doc to locate specific shopping cart entry documents

    //updateDoc field "favorite" to newStatus (true for favorite, false for unfavorite)
    await updateDoc(orderRef, {favorite: newStatus});

  };

  const setPickupOrderStatus = async () => {
    if (!user || !order) return; // make sure user and order does exist
    
    try {
      const orderRef = doc(db, "order", order.id); // Using doc to locate order
      //updateDoc field "status" to confirmed (triggered by 'Pay at Restaurant' button being clicked)
      await updateDoc(orderRef, {status: "confirmed"});

      //listen for doc changes to update UI
      onSnapshot(doc(db, "order", order.id), async (docSnapshot) => {
        const data = docSnapshot.data();
        const pickupTime = data.pickupTime?.toDate().toLocaleString();
        setOrder({ id: docSnapshot.id, ...data, pickupTime });
      });
    
      return order;
    } catch (error) {
      console.error("Error with setPickupOrderStatus: ", error);
      throw error; 
    }
  };

  /*
    Gets data from form data of CheckOut page and saves to Firebase.
  */
  const checkout = async (order) => {
    try{
      // use httpsCallable function to save to the firebase(Create an https Callable reference)
      const placeOrderCallable = httpsCallable(functions, "placeorder");

      // Calling functions and passing order data
      const result = await placeOrderCallable({...order, lines})
      const data = result.data;

      // Check for errors or success from the cloud function response
      if (data.status) {
        alert(data.success); // as usual, regardless of the state, it should enter this if logic body
        setOrder({ ...data.order, id: data.id }); // update setOrder
      }else{
        alert("An unexpected error occurred. Please try again.");
      }
      return data.id;
    }catch (error) {
      console.error("Order placement error:", error);
      alert("Failed to place order. Please try again.");
      return null; // Return null to indicate failure
    }
  }

  const generateOrder = async () => {
    try {
      const paypalCreateOrderCallable = httpsCallable(functions, "paypalCreateOrder");
      const response = await paypalCreateOrderCallable({
        total: order.total,
      });
      // setpaypalId(response.data.id);
      return response.data.id;
    } catch (error) {
      console.error("Error creating PayPal order:", error);
      return { error: error.message };
    }
  };

  const handleOrder = async (paypalId) => {
    try {
      const paypalHandleOrderCallable = httpsCallable(functions, "paypalHandleOrder");
      const response = await paypalHandleOrderCallable({
        orderId: order.id,
        paypalId: paypalId,
      });

      console.log(order.id);
      console.log(paypalId);

      /**
       * Set up a document listener to monitor changes in specific order documents in the Firestore database. 
       * For example, if the order status changes from "pending" to "confirmed" or "cancelled", 
       * we can use this listener to capture this change and update the UI of the client application to notify users of the change in order status
       * 
       * 'data. id 'is the order ID returned after calling the' placeOrderCallable 'function in the previous step.
       *  The 'onsnapshot' method will listen for any updates to this order document.
       *  When the order document changes, the provided callback function will be triggered, and 'docsnapshot' contains the current data of the document.
       *  The 'setOrder' function is used to update the status of the React component so that the interface can reflect the latest status of the order
      */
     
      // let lastStatus = null;
      onSnapshot(doc(db, "order", order.id), async (docSnapshot) => {
        const data = docSnapshot.data();
        const pickupTime = data.pickupTime?.toDate().toLocaleString();
        setOrder({ id: docSnapshot.id, ...data, pickupTime });
  
        // if (data.status === "confirmed" && lastStatus !== "confirmed") {
        //   // Update the last status
        //   lastStatus = data.status;
        //   // Call algorithm to obtain the most appropriate delivery man
        //   await findAndAssignDeliveryPerson();    
        //   // // Update the last status
        //   // lastStatus = data.status;     
        // }
      });
    
      return response.data.order;
    } catch (error) {
      console.error("Error handling PayPal order:", error);
      throw error; 
    }
  };

  const findAndAssignDeliveryPerson = async () => {
    try {
      const preparingRidersCallable = httpsCallable(functions, "ridersHandler");
      const response = await preparingRidersCallable({
        restaurantAddress: restaurantInfo.address,
        userAddress: order.address,
        orderId: order.id,
      });
      console.log(response.data);

      toast({
        title: "Delivery person assigned. Please pay attention to your email", 
        description: `Delivery person ID: ${response.data.deliveryPersonId}. Estimated delivery time: ${response.data.estimatedDeliveryTime} minutes.`,
        position: "top",
        status: "success", 
        isClosable: true,
    });

      return response.data;
    } catch (error) {
      console.error("Error message:", error);
      // return { error: error.message };
    }
  }

 
  const clearCartAfterConfirmation = async () => {
    if (!user) return; // make sure user exists
    const uid = user.uid;
    const cartRef = collection(db, "carts", uid, "items"); // Locate the subcollection for the user's cart items

    // Retrieve all cart items
    const snapshot = await getDocs(cartRef);
    // Create a batch to delete all items in a single atomic operation
    const batch = writeBatch(db);

    snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref); // Add delete operation for each cart item to the batch
    });

    // Commit the batch
    await batch.commit();

    // Clear the lines state after all items have been deleted
    setLines([]);
  };

  // Not in line with business logic, a user can have multiple orders
  // const clearOrderAfterConfirmation = async () => {
  //   if (!user) return; // make sure user exists

  //   // If each user has only one order and you want to delete it
  //   const orderRef = doc(db, "order", order.id); // Locate the subcollection for the order

  //   // Delete the order document
  //   await deleteDoc(orderRef);

  //   // Clear the order state after all items have been deleted
  //   setOrder(null);
  // };


//get data from the form data of register page, save data to firebase
const registerNewAccount = async (userInfo) => {
  
  //1. use httpsCallable function to save to the firebase(Create an https Callable reference)
  const registerNewAccountCallable = httpsCallable(functions, "registerAccount");
  console.log(userInfo);

  //2. Calling functions and passing order data
  const { data } = await registerNewAccountCallable({...userInfo});
  console.log(data);

  //3. also set user
  //setUser(data.userInfo);

  return data;
}

const updateUserAccount = async (userInfo) => {
  const updateUserAccountCallable = httpsCallable(functions, "updateAccount");
  const id = user.uid;

  const { data } = await updateUserAccountCallable({...userInfo, id});

  return data.uid;
}

const getUserInfo = async (userInfo) => {
  setUser(userInfo);
}

const storeContactUsForm = async (formInfo) => {
  //1. use httpsCallable function to save to the firebase(Create an https Callable reference)
  const sendContactUsRequestCallable = httpsCallable(functions, "contactUsSubmit");
  console.log(formInfo);
  
  //2. Calling functions and passing form info 
  const { data } = await sendContactUsRequestCallable({...formInfo})
  console.log(data);

  return data.id; 
}

const getOrderHistory = async () => {
  const uid = user.uid;
  
  const orderRef = collection(db, "order"); // reference to the 'order' collection
  let orderData = [];
  
  try {
    const snapshot = await getDocs(orderRef);
    if (snapshot.empty) {
      console.log(`No orders found for UID: ${uid}`);
    } else {

      snapshot.forEach(doc => {
        // Check if the order's UID matches the provided UID
        if (doc.data().createdBy === uid && doc.data().status === "confirmed") {
          orderData.push({ id: doc.id, ...doc.data()});
        }
      });
    }
  } catch (error) {
    console.error(`Error fetching order for UID ${uid}:`, error);
  }

    setOrderHistory(orderData);
  
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const isUserInDatabase = async (user) => {
    
    const email = user.email;
    console.log("Email:", email);
    try {
      const db = getFirestore();
      const usersCollectionRef = collection(db, "users"); // Replace "users" with your actual collection name
      const querySnapshot = await getDocs(query(usersCollectionRef, where("email", "==", email)));

      if (!querySnapshot.empty) {
      return true;

      } else {
          console.log("User not found");
         return false;
      }
  } catch (error) {
      console.error("Error fetching user:", error);
      return false;
  }
}


  /** 
   * if is ready is false, which means we still fetch nothing from our database, it will show a spin(The pattern of loading items waiting)
   * otherwise, if fetchdata await the firebase data, it will show <RouterProvider router={router} /> and then we can navigate to each route
   * 
   * Children are a special prop that represents the content within a component tag. 
   * When a component is created and other components or JSX are included between its opening and closing tags, 
   * these included contents will be passed to the component as a child prop. 
   * In main. js, the<RouterProvider router={router}/>is wrapped in the DataProvider, which means it will become the child of the DataProvider. 
   * Furthermore, for example, any component that uses useDataProvider will be able to access the restaurantInfo state.
  */
  return (
    <DataProviderContext.Provider value={{ user, order, lines, setLines, restaurantInfo, categories, items, cartChanged, orderHistory, 
    checkCartNotEmpty, getUserInfo, fetchUserProfile, fetchCartItems, fetchItemImageById, fetchOrder, getItemsByCategory, getItemById, addToCart, setCartChanged,
    removeCartItem, checkout, registerNewAccount, storeContactUsForm, clearCartAfterConfirmation, setOrder, generateOrder, getOrderById,
    handleOrder, getOrderHistory, updateUserAccount, travelTime, setTravelTime, findAndAssignDeliveryPerson, deliveryFirstname, setdeliveryFirstname,
    deliveryLastname, setdeliveryLastname, isUserInDatabase, selectedFilter,updateSelectedFilter,selectedOption,updateSelectedOption,searchedItem,
    updateSearch, setPickupOrderStatus 
    }}>

      {isReady ? (
        children
      ) : (
        <Center height="100vh">
          <Spinner />
        </Center>
      )}
    </DataProviderContext.Provider>
  );
};
