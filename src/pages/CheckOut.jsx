import { Accordion, AccordionButton, Center, Container, AccordionItem, AccordionPanel, FormControl, FormErrorMessage, FormLabel, Input, Radio, RadioGroup, Textarea, VStack, } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import  { useEffect,  useRef } from "react";
import { BottomButton } from "../components/BottomButton";
import { useDataProvider } from "../components/dataProvider"
import { calculateOrderTotal, } from "../utils/calculations";
import { RECEIVE_METHODS } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import logtail from "../logger.js";
import "../styles.css";


export const CheckOut = () => {
    
    const navigate = useNavigate();
    
    const { order, fetchUserProfile, lines, restaurantInfo, checkout, setCartChanged } = useDataProvider();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const isMounted = useRef(false); // Used to track the mounting status of components

    
    useEffect(() => {
        isMounted.current = true;
        const fetchAndSetUserProfile = async () => {
            try {
                const data = await fetchUserProfile();
                // console.log(data);
                if (data && isMounted.current) {
                    /*
                        Asynchronous retrieval of user information during component loading, 
                        and updating form fields with setValue after obtaining the data. 
                        In this way, the user's personal information will be automatically filled in the form, 
                        and if the user updates the information, the updated information will also be sent when submitting the form
                    */
                    setValue("firstName", data.firstName);
                    setValue("lastName", data.lastName);
                    setValue("email", data.email);
                    setValue("phone", data.phone);
                    //...other fields in future
                }
            } catch (error) {logtail.error(`Checkout user error: ${error.message}`);}//, {orderId: order.id})}
        };

        fetchAndSetUserProfile();
        
        /**
         * We used useRef to create an isMounted reference that will remain unchanged throughout the entire lifecycle of the component. 
         * In the cleanup function of useEffect, we set isMounted. current to false. In this way, 
         * before the fetchAndSetUserProfile asynchronous function attempts to set the state, it checks isMounted. current. 
         * If the component has already been uninstalled, the state setting operation will not be performed, 
         * thus avoiding errors in updating the state of uninstalled components.
        */
    
        return () => {
        isMounted.current = false;
        };
    }, []); 


    const onSubmit = async (data) => {
        await checkout (data);
        navigate("/gratitude")
    }


    if (!restaurantInfo) return null;

    return (
        <Center><Container margin="5em" mb="5em" >
        <form title="checkout-form" onSubmit={handleSubmit(onSubmit)}>
            <Accordion 
            defaultIndex={[0, 1, 2]} allowMultiple>

                <AccordionItem title='checkout-user-info'>
                    <AccordionButton  _hover={{ boxShadow: "0 0 10px 1px gold" }} color="white" bg="black">CONTACT</AccordionButton>
                    <AccordionPanel>
                        <VStack mt={4}>
                        <FormControl isInvalid={!!errors?.firstName?.type}>
                                <FormLabel>First Name</FormLabel>
                                <Input
                                    border="outset 2px tan"
                                    title='checkout-first-name'
                                    placeholder="First Name"
                                    {...register("firstName", { required: true })}
                                />
                                <FormErrorMessage>Required</FormErrorMessage>
                            </FormControl>
                            <FormControl  isInvalid={!!errors?.lastName?.type}>
                                <FormLabel>Last Name</FormLabel>
                                <Input border="outset 2px tan"
                                    title='checkout-last-name'
                                    placeholder="Last Name"
                                    {...register("lastName", { required: true })}
                                />
                                <FormErrorMessage>Required</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors?.email?.type}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    border="outset 2px tan"
                                    title='checkout-email'
                                    placeholder="Email"
                                    {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
                                />
                                <FormErrorMessage>{"Email address is invalid"}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors?.phone?.type}>
                                <FormLabel>Phone</FormLabel>
                                <Input
                                    border="outset 2px tan"
                                    title='checkout-phone'
                                    placeholder="Phone"
                                    {...register("phone", { required: true })}
                                />
                                <FormErrorMessage>Required</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors?.address?.type}>
                                <FormLabel>Address</FormLabel>
                                <Input
                                    border="outset 2px tan"
                                    title='checkout-address'
                                    placeholder="Address"
                                    {...register("address", { required: true })}
                                />
                                <FormErrorMessage>Required</FormErrorMessage>
                            </FormControl>
                        </VStack>
                    </AccordionPanel>
                </AccordionItem>

                {/* <AccordionItem title='checkout-payment'>
                    <AccordionButton bg="black" color="white">PAYMENT METHOD</AccordionButton>
                    <AccordionPanel>
                        <VStack mt={4}>
                            <FormControl isInvalid={!!errors?.paymentMethod?.type}>
                                <FormLabel>Payment Method</FormLabel>
                                <RadioGroup>
                                    <VStack alignItems="flex-start">
                                        {restaurantInfo.paymentMethods.map((method, index) => (
                                            <Radio
                                            border="outset 2px tan"
                                                key={index}
                                                value={method}
                                                {...register("paymentMethod", { required: true })}
                                            >
                                                {PAYMENT_METHODS.find((m) => m.id === method)?.name}
                                            </Radio>
                                            ))}
                                    </VStack>
                                </RadioGroup>
                                <FormErrorMessage>Required</FormErrorMessage>
                            </FormControl>
                        </VStack>
                    </AccordionPanel>
                </AccordionItem> */}
                <AccordionItem title='checkout-receive'>
                    <AccordionButton bg="black" color="white">PICKUP OR DELIVERY</AccordionButton>
                    <AccordionPanel>
                        <VStack mt={4}>
                            <FormControl isInvalid={!!errors?.receiveMethod?.type}>
                                <RadioGroup>
                                    <VStack alignItems="flex-start">
                                        {restaurantInfo.receiveMethods.map((method, index) => (
                                            <Radio
                                            border="outset 2px tan"
                                                key={index}
                                                value={method}
                                                {...register("receiveMethod", { required: true })}
                                            >
                                                {RECEIVE_METHODS.find((m) => m.id === method)?.name}
                                            </Radio>
                                            ))}
                                    </VStack>
                                </RadioGroup>
                                <FormErrorMessage>Required</FormErrorMessage>
                            </FormControl>
                        </VStack>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem title='checkout-comments'>
                    <AccordionButton bg="black" color="white">COMMENTS</AccordionButton>
                    <AccordionPanel>
                        <VStack mt={4}>
                            <FormControl>
                                <FormLabel>Comments</FormLabel>
                                <Textarea border="outset 2px tan" placeholder="Comments..." {...register("comments")} />
                            </FormControl>
                        </VStack>
                    </AccordionPanel> 
                </AccordionItem>
            </Accordion>
            <BottomButton color="white" bg="black" border="tan 2px outset"
            title='checkout-button'
            label="Place Order"
            total={calculateOrderTotal(lines, 10).toFixed(2)}
            />        
        </form>
        </Container></Center>  
    );
};