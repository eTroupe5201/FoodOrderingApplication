import { Admin as FAdmin, Resource, CustomRoutes, Layout, AppBar, RefreshIconButton, } from "react-admin";
import { FirebaseDataProvider, FirebaseAuthProvider } from "react-admin-firebase";
import { firebaseConfig } from "../utils/firebase";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { CategoryProps } from "../components/firebase/category-resource";
import { ItemProps } from "../components/firebase/item-resource";
import { OrderProps } from "../components/firebase/order-resource";
import { UserProps } from "../components/firebase/user-resource";
import { ContactUsProps} from "../components/firebase/contact-resource";
import { Route } from "react-router-dom";
import { Info } from "../components/firebase/info";

/**
 * react-admin is a frontend framework for building admin panels and back-office interfaces quickly and with less boilerplate. 
 * It provides pre-built components and a structure that allows you to perform CRUD (Create, Read, Update, Delete) operations on data sources with minimal setup. 
 * It's designed to work with a variety of data providers, and in our food-odering app, it's being used with Firebase as the backend database.
 */

const options = {
    logging: true,
    persistence: "session",
    lazyLoading: {
      enabled: true,
    },
    watch: ["orders"],
  };


const dataProvider = FirebaseDataProvider(firebaseConfig, options);
const authProvider = FirebaseAuthProvider(firebaseConfig, {});

const MyAppBar = () => (
    <AppBar
      toolbar={
        <>
          <RefreshIconButton />
          <IconButton href="/admin/info">
            <SettingsIcon style={{ color: "white" }} />
          </IconButton>
        </>
      }
    />
);

export const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} />;

/**
 * 
 * @Admin component can be used as the main component for an admin dashboard page 
 * where we can manage our Firebase data, such as viewing, adding, editing, and deleting items 
 * This setup is particularly useful for creating back-office applications, 
 * internal tools, or content management systems that interact with the Firebase database.
 */

export const Admin = () => {
    return (
      <FAdmin layout={MyLayout} authProvider={authProvider} basename="/admin" dataProvider={dataProvider}>
        <Resource {...CategoryProps} />
        <Resource {...ItemProps} />
        <Resource {...OrderProps} />
        <Resource {...UserProps} />
        <Resource {...ContactUsProps} />
        <CustomRoutes>
          <Route path="/info" element={<Info />} />
        </CustomRoutes>
      </FAdmin>
    );
  }