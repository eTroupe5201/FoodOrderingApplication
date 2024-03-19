
import {
    List,
    Create,
    Datagrid,
    SimpleForm,
    TextInput,
    Edit,
    TextField, 
    EmailField,
    required,
    DateField
  } from "react-admin";
  import { MdContacts } from "react-icons/md";

const validateEmail = (value) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(value) ? undefined : "Invalid email";
};

const UserForm = () => {
    return (
    <SimpleForm sanitizeEmptyValues>
       <TextInput source="firstName" label="First Name" validate={[required()]} fullWidth />
        <TextInput source="lastName" label="Last Name" validate={[required()]} fullWidth />
        <TextInput source="email" validate={[required(), validateEmail]} fullWidth />
        <TextInput source="phone" validate={[required()]} fullWidth />
      </SimpleForm>
    );
  };

  const UserCreate = () => (
    <Create>
      <UserForm />
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
        <TextField source="firstName" label="First Name" />
        <TextField source="lastName" label="Last Name" />
        <EmailField source="email" />
        <TextField source="phone" />
        <DateField source="createAt" showTime label="Account Created" />
        <DateField source="lastupdate" showTime label="Last Login" />
      </Datagrid>
    </List>
  );

export const UserProps = {
    icon: MdContacts,
    name: "users",
    list: UserList,
    create: UserCreate,
    edit: UserEdit,
};