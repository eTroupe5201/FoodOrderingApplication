import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './pages/Root'; 
import { Home } from './pages/Home'; 
import { Menu } from './pages/Menu'; 
import { Item } from "./pages/Item";
import { Cart } from "./pages/Cart";
import { CheckOut } from "./pages/CheckOut";
import { Gratitude } from "./pages/Gratitude";
import { Info } from "./pages/info";
import { Contact } from "./pages/Contact";
import { Login } from './pages/Login'; 
import "./styles.css";

/**
 * default page is homepage, and click oder button will go to menu page of our restaurant
 * item page is about your choices like (do you add salad, need spicy?), special requirment, and also quantity for the unique food on the menu
 * cart page includes all food you have ordered and ready to pay
 * checkout page will be about the bank information, your first name, telephone number and so on
 * gratitude page will be just a thankyou or pay fail after you pay
 * info page will include opening hour, payment method, address and so on
 * 
 * contact page will be contact with the app developer
*/
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "item/:id",
        element: <Item />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <CheckOut />,
      },
      {
        path: "gratitude",
        element: <Gratitude />,
      },
      {
        path: "info",
        element: <Info />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  // top-level routes such as login
  {
    path: "login/*",
    element: <Login />, // Added here as a top-level route
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <ChakraProvider>
//       <App />
//     </ChakraProvider>
//   </React.StrictMode>,
// )
