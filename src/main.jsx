 
import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles.css";
import { DataProvider } from "./components/dataProvider";
import loadable from "@loadable/component";

const Root = loadable(() => import("./pages/Root"), {resolveComponent: (components) => components.Root});
const Home = loadable(() => import("./pages/Home"), {resolveComponent: (components) => components.Home});
const Menu = loadable(() => import("./pages/Menu"), {resolveComponent: (components) => components.Menu});
const Item = loadable(() => import("./pages/Item"), {resolveComponent: (components) => components.Item});
const Cart = loadable(() => import("./pages/Cart"), {resolveComponent: (components) => components.Cart});
const CheckOut = loadable(() => import("./pages/CheckOut"), {resolveComponent: (components) => components.CheckOut});
const Gratitude = loadable(() => import("./pages/Gratitude"), {resolveComponent: (components) => components.Gratitude});
const Info = loadable(() => import("./pages/Info"), {resolveComponent: (components) => components.Info});
const Contact =  loadable(() => import("./pages/Contact"), {resolveComponent: (components) => components.Contact});
const Admin =  loadable(() => import("./pages/Admin"), {resolveComponent: (components) => components.Admin});
const Login =  loadable(() => import("./pages/Login"), {resolveComponent: (components) => components.Login});
const Register = loadable(() => import("./pages/Register"), {resolveComponent: (components) => components.Register});
const Profile =  loadable(() => import("./pages/Profile"), {resolveComponent: (components) => components.Profile});
const EditProfile =  loadable(() => import("./pages/EditProfile"), {resolveComponent: (components) => components.EditProfile});
const Orders =  loadable(() => import("./pages/Orders"), {resolveComponent: (components) => components.Orders});
const ForgotPassword =  loadable(() => import("./pages/ForgotPassword"), {resolveComponent: (components) => components.ForgotPassword});

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
      {
        path: "editprofile",
        element: <EditProfile />,
      },
      {
        path: "orders/:id",
        element: <Orders />,
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
      <ChakraProvider >
        <DataProvider>
            <RouterProvider router={router} />
        </DataProvider>
      </ChakraProvider>
  </React.StrictMode>
);
