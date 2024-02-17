/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { FunctionComponent, PropsWithChildren, createContext, useContext, useEffect, useState, } from 'react';
import { Center, Spinner } from '@chakra-ui/react';
import { collection, doc, getDoc, getDocs, onSnapshot, } from "firebase/firestore";
import { db, auth, functions } from "../utils/firebase";
import { signInAnonymously } from "firebase/auth";
import { httpsCallable } from 'firebase/functions';


const DataProviderContext = createContext({ 
    categories: [],
    items: [],
    lines: [],
    getItemsByCategory: () => [],
    getItemById: () => [],
    addToCart: () => {},
    removeCartItem: () => {},
    checkout: () => Promise.resolve(""),
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

  //getDoc comes from firebase firestore, it can import automatically and receive the document
  const fetchRestaurantInfo = async () => {
    /*
    The getDoc function is used to retrieve data for a single document. 
    We need to provide a reference to a specific document in Firestore.
    If we know the exact document ID I want, then we will use getDoc. 
    */
    const restaurantInfoSnapshot = await getDoc(doc(db, 'restaurant', 'info'));
    setRestaurantInfo(restaurantInfoSnapshot.data());
  }

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
  
  //because this wil be about internet latency
  //so here I have to use asychronized fuction to wait our request
  const fetchData = async () => {
    //automatically log in using anonymous users I have stored in Firebase
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

  const addToCart = (line) => {
    setLines([...lines, line]);
  };

  console.log(lines);

  const removeCartItem = (itemIndex) => {
    setLines(lines.filter((_, index) => index !== itemIndex));
  };

  //get the data from the form data of checkout page, we should save this data to the firebase
  const checkout = async (order) => {
    //1. use httpsCallable function to save to the firebase(Create an https Callable reference)
    const placeOrderCallable = httpsCallable(functions, 'placeorder');

    //2. Calling functions and passing order data
    const { data } = await placeOrderCallable({...order, lines})
    console.log(data);
    //3. after saving into database, we should fresh the lines array
    setLines([]);
    //4. also set order
    setOrder(data.order);
    
    /**
     * 5 Set up a document listener to monitor changes in specific order documents in the Firestore database. 
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
  
//get data from the form data of register page, save data to firebase
const registerNewAccount = async (userInfo) => {
  
  //1. use httpsCallable function to save to the firebase(Create an https Callable reference)
  const registerNewAccountCallable = httpsCallable(functions, 'registerAccount');
  console.log(userInfo);

//TODO: change ID to match email - so referencing can be done by email

  // //2. Calling functions and passing order data
  const { data } = await registerNewAccountCallable({...userInfo})
  console.log("waited for registerNewAccountCallable");
  console.log(data);

  // //4. also set user
  setUser(data.userInfo);
  return data.id; 
}

/* Get data from Login page. Check firebase to see if no account matching email is found or
*  credentials match or do not match an existing account 
*/
const sendLoginRequest = async (credentials) => {
  
  //1. use httpsCallable function to save to the firebase(Create an https Callable reference)
  // const sendLoginRequestCallable = httpsCallable(functions, 'tryLogin');
  // console.log(credentials);
  
  // // //2. Calling functions and passing login credentials
  // const { data } = await sendLoginRequestCallable({...credentials})
  // console.log(data);

  // // //4. also set user
  // setUser(data.credentials);
  // return data.id; 
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
    <DataProviderContext.Provider value={{lines, restaurantInfo, categories, items, getItemsByCategory, getItemById, addToCart, removeCartItem, checkout, registerNewAccount, order}}>
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
