 
/* eslint-disable no-unused-vars */
 
import React, { createContext, useContext, useEffect, useState, } from "react";
import { Center, Spinner } from "@chakra-ui/react";
import { collection, doc, getDoc, getDocs, onSnapshot, deleteDoc, query, limit, writeBatch } from "firebase/firestore";
import { db, auth, functions } from "../utils/firebase";
import { signInAnonymously } from "firebase/auth";
import { httpsCallable } from "firebase/functions";


const DataProviderContext = createContext({ 
    categories: [],
    items: [],
    lines: [],
    getItemsByCategory: () => [],
    getItemById: () => [],
    addToCart: () => {},
    removeCartItem: () => {},
    checkout: () => Promise.resolve(""),
    checkIfEmailRegistered: () => Promise.resolve(false),
});

// export const useDataProviderForEmailCode = () => useContext(DataProviderEmailCodeContext);
// const DataProviderEmailCodeContext = createContext({
//     code: [],
// });

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
  const [order, setOrder] = useState();
  const [user, setUser] = useState();
  const [cartChanged, setCartChanged] = useState(false);

  
// Function to check if an email is registered
const checkIfEmailRegistered = async (email) => {
    try {
        // Get the Firebase Authentication instance
        const auth = getAuth();
        
        // Get the user record by email
        const userRecord = await getUserByEmail(auth, email);

        // If the user record exists, the email is registered
        return !!userRecord;
    } catch (error) {
        // Handle errors, such as email not found
        console.error("Error checking email registration:", error);
        return false;
    }
};

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
    console.log("Current user:", user); // Check current user
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
      console.log(`User profile fetched for UID ${uid}:`, userData);
      return userData;
    } catch (error) {
      console.error(`Error fetching user profile for UID ${uid}:`, error);
      return null;
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

  const fetchCartItems = async () => {
    console.log("Current user:", user); // check current user
    if (!user || !user.uid) {
      console.log("No user logged in, or missing UID.");
      return []; // if no user login or user doesn't have uid, return null array
    }
    const cartItems = [];
    const uid = user.uid;
    const cartRef = collection(db, "carts", uid, "items");
    try {
      const snapshot = await getDocs(cartRef);
      if (snapshot.empty) {
        console.log(`No cart items found for UID: ${uid}`);
      } else {
        snapshot.forEach(doc => {
          cartItems.push({ id: doc.id, ...doc.data() });
        });
      }
    } catch (error) {
      console.error(`Error fetching cart items for UID ${uid}:`, error);
    }
    console.log(`Cart items fetched for UID ${uid}:`, cartItems);
    return cartItems;
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
    setIsReady(true);
  }

  const getItemById = (itemId) => {
    return items.find((item) => item.id === itemId);
  };

  /*
    category actually is a id of string type when you look at the database
    here I will parase a category id in it and iterate each item's category, 
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
    console.log("Snapshot empty:", querySnapshot.empty);
    return !querySnapshot.empty; // If snapshot. empty is true, then the shopping cart is empty, otherwise it is not empty
  };

  const addToCart = async (line) => {
    const uid = user.uid;
    //1. use httpsCallable function to save to the firebase(Create an https Callable reference)
    const placeCartCallable = httpsCallable(functions, "placecart");

    //2. Calling functions and passing order data
    const { data } = await placeCartCallable({...line, uid});
    setCartChanged(true);
    console.log(data);

    return;
  };

  console.log(lines);

  const removeCartItem = async (itemId) => {
    if (!user) return; // make sure user does exist
    const uid = user.uid;
    const itemRef = doc(db, "carts", uid, "items", itemId); // Using doc to locate specific shopping cart entry documents
    await deleteDoc(itemRef); // Use deleteDoc to delete the document
    // update UI
    setLines(currentLines => currentLines.filter(line => line.id !== itemId));
    setCartChanged(true);
  };

  //get the data from the form data of checkout page, we should save this data to the firebase
  const checkout = async (order) => {
    //1. use httpsCallable function to save to the firebase(Create an https Callable reference)
    const placeOrderCallable = httpsCallable(functions, "placeorder");

    //2. Calling functions and passing order data
    const { data } = await placeOrderCallable({...order, lines})
    console.log(data);

    //3. also set order
    setOrder(data.order);
    
    /**
     * 4. Set up a document listener to monitor changes in specific order documents in the Firestore database. 
     * For example, if the order status changes from "pending" to "confirmed" or "cancelled", 
     * we can use this listener to capture this change and update the UI of the client application to notify users of the change in order status
     * 
     * 'data. id 'is the order ID returned after calling the' placeOrderCallable 'function in the previous step.
     *  The 'onsnapshot' method will listen for any updates to this order document.
     *  When the order document changes, the provided callback function will be triggered, and 'docsnapshot' contains the current data of the document.
     *  The 'setOrder' function is used to update the status of the React component so that the interface can reflect the latest status of the order
     */
    onSnapshot(doc(db, "order", data.id), (docSnapshot) => {
      setOrder(docSnapshot.data());
    });

    return data.id; 
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


//get data from the form data of register page, save data to firebase
const registerNewAccount = async (userInfo) => {
  
  //1. use httpsCallable function to save to the firebase(Create an https Callable reference)
  const registerNewAccountCallable = httpsCallable(functions, "registerAccount");
  console.log(userInfo);

  //TODO: change ID to match email - so referencing can be done by email

  //2. Calling functions and passing order data
  const { data } = await registerNewAccountCallable({...userInfo})
  console.log("waited for registerNewAccountCallable");
  console.log(data);

  //3. also set user
  //setUser(data.userInfo);

  return data;
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

  //3. also set user
  //setUser(data.credentials);
  return data.id; 
}

  useEffect(() => {
    fetchData();
  }, []);


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
    <DataProviderContext.Provider value={{ user, lines, setLines, restaurantInfo, categories, items, cartChanged, setCartChanged, checkCartNotEmpty, getUserInfo, fetchUserProfile, fetchCartItems, getItemsByCategory, getItemById, addToCart, removeCartItem, checkout, registerNewAccount, storeContactUsForm, clearCartAfterConfirmation, order, checkIfEmailRegistered}}>
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
