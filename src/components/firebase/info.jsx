import { Card } from "@mui/material";
import {
  CheckboxGroupInput,
  SimpleForm,
  TextInput,
  TimeInput,
  useNotify,
} from "react-admin";
import { PAYMENT_METHODS } from "../../utils/constants";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase"
import { useEffect, useState } from "react";

export const Info = () => {
    const notify = useNotify();
    const restaurantRef = doc(db, "restaurant", "info");
    const [defaultValues, setDefaultValues] = useState();

    /**
     * 3. When the user clicks the 'Save' button, the SimpleForm component calls the handleSubmit function with the current form data.(the data comes from SimpleForm)
     * handleSubmit makes an asynchronous call to Firebase using setDoc to update the restaurantRef document with the new form data.
     */
    const handleSubmit = async (data) => {
        await setDoc(restaurantRef, data);
        notify(`Restaurant information updated`, { type: "success" });
    };

    /**
     * 2. The fetchData function asynchronously retrieves the restaurant's information from Firebase. 
     * Until this data is fetched, defaultValues is undefined because useState was called without an argument. 
     * This means the form will not render yet because the conditional if (!defaultValues) return null; will be true, 
     * resulting in the component rendering nothing (an empty page).
     * 
     * 4. After 3, snapshot will have its value, once the data is fetched and setDefaultValues is called, 
     * defaultValues is updated with the fetched data, causing the component to re-render.
     * Since this is a state update, it triggers a re-render of the component. On re-render, 
     * the SimpleForm will receive these defaultValues and use them to populate the form fields. 
     * This way, the form fields will display the most up-to-date data from the database when the component is displayed.
     */
    const fetchData = async () => {
        const snapshot = await getDoc(restaurantRef);
        setDefaultValues(snapshot.data() || {});
    };

     /**
     * 1. On the initial mount of the Info component, useEffect is called, which in turn calls fetchData. 
     * This is the first thing that happens when the component renders. 
     * The useEffect hook does not run again after this point because it has an empty dependency array, 
     * indicating it should only run once after the component mounts.
     */
    useEffect(() => {
        fetchData();
    }, []);

    if (!defaultValues) return null;


    return (
        <Card>
          <SimpleForm
            defaultValues={{
              ...defaultValues,
              openingTime: defaultValues.openingTime?.toDate ? defaultValues.openingTime.toDate() : null,
              closingTime: defaultValues.closingTime?.toDate ? defaultValues.closingTime.toDate() : null,
            }}
            sanitizeEmptyValues
            onSubmit={handleSubmit}
          >
            <TextInput source="name" fullWidth />
            <TextInput source="address" fullWidth />
            <TextInput source="phone" fullWidth />
            <TimeInput source="openingTime" fullWidth />
            <TimeInput source="closingTime" fullWidth />
            <CheckboxGroupInput source="paymentMethods" choices={PAYMENT_METHODS} />
          </SimpleForm>
        </Card>
      );

};