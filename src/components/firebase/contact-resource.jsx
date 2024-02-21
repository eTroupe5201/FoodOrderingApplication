
import {
    List,
    TextInput,
  } from "react-admin";
  import { MdMail } from "react-icons/md";

const ContactUsList = () => (
    <List>
        <TextInput source="firstName" />      
        <TextInput source="lastName" />
        <TextInput source="email" />
        <TextInput source="phone" />
        <TextInput multiline source="message" />
    </List>
  );

export const ContactUsProps = {
    icon: MdMail,
    name: "contactus",
    list: ContactUsList,
}