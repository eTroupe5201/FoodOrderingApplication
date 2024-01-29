import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './pages/Root'; 
import { Home } from './pages/Home'; 
import { Item } from "./pages/Item";
import { Cart } from "./pages/Cart";
import { CheckOut } from "./pages/CheckOut";
import { Gratitude } from "./pages/Gratitude";
import { Info } from "./pages/info";
import { Login } from './pages/Login'; 

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
