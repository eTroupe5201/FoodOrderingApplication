import React from "react";
import {
    List,
    TextInput,
  } from "react-admin";
  import { MdMail } from "react-icons/md";

const ContactUsList = () => (
    <List>
        <TextInput source="first_name" />      
        <TextInput source="last_name" />
        <TextInput source="email_address" />
        <TextInput source="phone_number" />
        <TextInput multiline source="message" />
    </List>
  );

export const ContactUsProps = {
    icon: MdMail,
    name: "contact_us",
    list: ContactUsList,
}