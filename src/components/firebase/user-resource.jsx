
import {
    List,
    Create,
    Datagrid,
    SimpleForm,
    TextInput,
    Edit,
    PasswordInput,
  } from "react-admin";
  import { MdContacts } from "react-icons/md";

const UserForm = () => {
    <SimpleForm sanitizeEmptyValues>
        <TextInput source="firstName"  fullWidth/>      
        <TextInput source="lastName"  fullWidth/>
        <TextInput source="email" fullWidth/>
        <TextInput source="phone"  fullWidth/>
        <PasswordInput source="new_password" fullWidth />
      </SimpleForm>
  }

  const UserCreate = () => (
    <Create>
      <UserCreate />
    </Create>
  );

const UserEdit = () => (
    <Edit>
      <UserForm/>
    </Edit>
);

const UserList = () => (
    <List sort={{ field: "lastName", order: "ASC" }}>
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
    create: UserCreate,
    edit: UserEdit,
}