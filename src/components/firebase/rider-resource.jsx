import {
    List,
    Datagrid,
    TextField,
    Create,
    SimpleForm,
    TextInput,
    required,
    DateField,
    Edit,
    NumberField,
    EmailField,
    BooleanField,
    SelectInput,
    FunctionField
  } from "react-admin";
import { MdOutlineDeliveryDining } from "react-icons/md";
  

const validateEmail = (value) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(value) ? undefined : 'Invalid email';
};

const statusChoices = [
    { id: 'waiting', name: 'Waiting order' },
    { id: 'accepted', name: 'Order accepted' },
    { id: 'delivering', name: 'Delivery in progress' },
    { id: 'arriving', name: 'Arriving soon' },
    { id: 'arrived', name: 'Order arrived' },
  ];

const DeliveryPersonForm = () => {
    return (
      <SimpleForm sanitizeEmptyValues>
        <TextInput source="firstname" label="First Name" validate={[required()]} fullWidth />
        <TextInput source="lastname" label="Last Name" validate={[required()]} fullWidth />
        <TextInput source="email" validate={[required(), validateEmail]} fullWidth />
        <TextInput source="phone" validate={[required()]} fullWidth />
        <TextInput source="address" fullWidth />
        <SelectInput source="status" choices={statusChoices} label="Status" validate={[required()]} fullWidth />
        <SelectInput source="isFree" label="Is Free" choices={[
          { id: true, name: 'Free' },
          { id: false, name: 'Busy' }
        ]} fullWidth />
      </SimpleForm>
    );
};

  
const DeliveryPersonCreate = () => (
    <Create>
      <DeliveryPersonForm />
    </Create>
);
  
const DeliveryPersonEdit = () => (
    <Edit>
      <DeliveryPersonForm />
    </Edit>
);
  
const DeliveryPersonList = () => (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="firstname" label="First Name" />
        <TextField source="lastname" label="Last Name" />
        <EmailField source="email" />
        <TextField source="phone" />
        <TextField source="address" />
        <FunctionField
          label="Status"
          render={record => {
            const status = statusChoices.find(choice => choice.id === record.status);
            return status ? status.name : '';
          }}
        />
        <FunctionField
          label="Is Free"
          render={record => record.isFree ? 'Free' : 'Busy'}
        />
        <DateField source="createdate" showTime label="Created At" />
        <DateField source="lastupdate" showTime label="Updated At" />
      </Datagrid>
    </List>
);
  
export const DeliveryPersonProps = {
    icon: MdOutlineDeliveryDining,
    name: "deliveryperson",
    list: DeliveryPersonList,
    create: DeliveryPersonCreate,
    edit: DeliveryPersonEdit,
};
  