
import {
    List,
    TextField,
    Datagrid,
    DateField
  } from "react-admin";
import { MdMail } from "react-icons/md";

const ContactUsList = () => (
    <List sort={{ field: "createAt", order: "DEC" }}>
      <Datagrid rowClick="edit">
        <TextField source="firstName" label="First Name" />      
        <TextField source="lastName" label="Last Name" />
        <TextField source="email" label="Email" />
        <TextField source="phone" label="Phone" />
        <TextField multiline source="message" />
        <DateField source="createAt" showTime label="Submitted At" />
      </Datagrid>
    </List>
  );

export const ContactUsProps = {
    icon: MdMail,
    name: "contactus",
    list: ContactUsList,
};