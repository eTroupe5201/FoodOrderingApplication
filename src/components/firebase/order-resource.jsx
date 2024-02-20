
import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  required,
  NumberField,
  DateField,
  ArrayField,
  ChipField,
  EditButton,
  RadioButtonGroupInput,
} from "react-admin";
import { MdReceipt } from "react-icons/md";
import { ORDER_STATUS } from "../../utils/constants";

//Defines a shared configuration object for formatting currency-related fields.
const currencyOptions = { style: "currency", currency: "USD" };


/** 
 * @returns Provides a form for editing the details of an order
 * Contains TextInput for editable text fields and NumberField for displaying formatted numeric values. 
 * It also includes a RadioButtonGroupInput for selecting the order status and an ArrayField for listing items within the order. 
 * The SimpleForm component is used to wrap these fields.
 */

const OrderForm = () => {
    return (
        <SimpleForm>
            <TextInput source="firstName" validate={required()} fullWidth />
            <TextInput source="lastName" validate={required()} fullWidth />
            <TextInput source="email" validate={required()} fullWidth />
            <TextInput source="phone" validate={required()} fullWidth />
            <TextInput source="comments" fullWidth />
            <NumberField source="total" options={currencyOptions} />
            <RadioButtonGroupInput source="status" choices={ORDER_STATUS} />
            <TextInput source="reason" fullWidth />
            <ArrayField source="lines">
                <Datagrid bulkActionButtons={false}>
                    <TextField source="label" />
                    <NumberField source="price" options={currencyOptions} />
                    <NumberField source="quantity" />
                    <TextField source="comments" />
                    <ArrayField source="value">
                        <Datagrid bulkActionButtons={false}>
                            <ChipField source="value" />
                            <NumberField source="price" options={currencyOptions} />
                        </Datagrid>
                    </ArrayField>
                </Datagrid>
            </ArrayField>
        </SimpleForm>
    );
};


const OrderEdit = () => (
    <Edit>
      <OrderForm />
    </Edit>
);

/**
 * @returns Displays a list of orders with the ability to sort and style rows conditionally
 * Uses a Datagrid to list order fields, such as names, contact information, and status. 
 * Conditional styling is applied to rows where the status is "pending". 
 * An EditButton is included to navigate directly to the edit view of an order.
 */
const OrderList = () => (
    <List sort={{ field: "pickupTime", order: "DESC" }}>
        <Datagrid
            rowClick="edit"
            bulkActionButtons={false}
            rowStyle={(record) => ({
                backgroundColor: record.status === "pending" ? "pink" : "inherit",
            })}
        >
            <TextField source="firstName" />
            <TextField source="lastName" />
            <TextField source="email" />
            <TextField source="phone" />
            <TextField source="status" />
            <NumberField source="total" options={currencyOptions} />
            <DateField source="pickupTime" showTime label="Pickup" />
            <EditButton />
        </Datagrid>
    </List>
);


export const OrderProps = {
    icon: MdReceipt,
    name: "order",
    list: OrderList,
    edit: OrderEdit,
}