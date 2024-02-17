import React from 'react';
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
        <TextInput source="first_name" fullWidth />      
        <TextInput source="last_name" fullWidth />
        <TextInput source="email_address" fullWidth />
        <TextInput source="phone_number" fullWidth />
        <PasswordInput source="new_password"  fullWidth />
    </Edit>
);

const UserList = () => (
    <List>
      <Datagrid rowClick="edit">
        <TextInput source="first_name" />      
        <TextInput source="last_name" />
        <TextInput source="email_address" />
        <TextInput source="phone_number" />
      </Datagrid>
    </List>
  );

export const UserProps = {
    icon: MdContacts,
    name: "user",
    list: UserList,
    edit: UserEdit,
}