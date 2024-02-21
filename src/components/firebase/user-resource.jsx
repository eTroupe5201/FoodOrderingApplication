
import {
    List,
    Datagrid,
    SimpleForm,
    TextInput,
    Edit,
    PasswordInput,
  } from "react-admin";
  import { MdContacts } from "react-icons/md";

const UserEdit = () => (
    <Edit>
        <SimpleForm sanitizeEmptyValues />
        <TextInput source="firstName" fullWidth />      
        <TextInput source="lastName" fullWidth />
        <TextInput source="email" fullWidth />
        <TextInput source="phone" fullWidth />
        <PasswordInput source="password"  fullWidth />
    </Edit>
);

const UserList = () => (
    <List>
      <Datagrid rowClick="edit">
        <TextInput source="firstName" />      
        <TextInput source="lastName" />
        <TextInput source="email" />
        <TextInput source="phone" />
      </Datagrid>
    </List>
  );

export const UserProps = {
    icon: MdContacts,
    name: "users",
    list: UserList,
    edit: UserEdit,
}