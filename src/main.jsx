 
import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./pages/Root"; 
import { Home } from "./pages/Home"; 
import { Menu } from "./pages/Menu"; 
import { Item } from "./pages/Item";
import { Cart } from "./pages/Cart";
import { CheckOut } from "./pages/CheckOut";
import { Gratitude } from "./pages/Gratitude";
import { Info } from "./pages/Info";
import { Contact } from "./pages/Contact";
import { Admin } from "./pages/Admin"; 
import { Login } from "./pages/Login"; 
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile"; 
import { ForgotPassword } from "./pages/ForgotPassword";

import "./styles.css";
import { DataProvider } from "./components/dataProvider";

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
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  // top-level routes such as login
  {
    path: "admin/*",
    element: <Admin />, // Added here as a top-level route
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <React.StrictMode>
      <ChakraProvider>
        <DataProvider>
            <RouterProvider router={router} />
        </DataProvider>
      </ChakraProvider>
  </React.StrictMode>
);
