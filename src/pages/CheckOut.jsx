import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, FormControl, FormErrorMessage, FormLabel, Input, Radio, RadioGroup, Textarea, VStack, } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import React, { useEffect, useState, useRef } from "react";
import { BottomButton } from "../components/BottomButton";
import { useDataProvider } from "../components/dataProvider"
import { calculateOrderSubtotal, calculateOrderTotal, } from "../utils/calculations";
import { PAYMENT_METHODS } from "../utils/constants";
import { useNavigate } from "react-router-dom";

export const CheckOut = () => {
    
    const navigate = useNavigate();
    
    const { fetchUserProfile, lines, restaurantInfo, checkout } = useDataProvider();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const isMounted = useRef(true); // Used to track the mounting status of components

    
    useEffect(() => {
        const fetchAndSetUserProfile = async () => {
            const data = await fetchUserProfile();
            console.log(data);
            if (data) {
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
    
            fetchAndSetUserProfile();
        };
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
    }, [restaurantInfo]); 


    const onSubmit = async (data) => {
        await checkout (data);
        navigate("/gratitude")
    }


    if (!restaurantInfo) return null;

    return (
        <form title='checkout-form' onSubmit={handleSubmit(onSubmit)}>
            <Accordion defaultIndex={[0, 1, 2]} allowMultiple>

                <AccordionItem title='checkout-user-info'>
                    <AccordionButton bg="gray.200">CONTACT</AccordionButton>
                    <AccordionPanel>
                        <VStack mt={4}>
                        <FormControl isInvalid={!!errors?.firstName?.type}>
                                <FormLabel>First Name</FormLabel>
                                <Input
                                    title='checkout-first-name'
                                    placeholder="First Name"
                                    {...register("firstName", { required: true })}
                                />
                                <FormErrorMessage>Required</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors?.lastName?.type}>
                                <FormLabel>Last Name</FormLabel>
                                <Input
                                    title='checkout-last-name'
                                    placeholder="Last Name"
                                    {...register("lastName", { required: true })}
                                />
                                <FormErrorMessage>Required</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors?.email?.type}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    title='checkout-email'
                                    placeholder="Email"
                                    {...register("email", { required: true })}
                                />
                                <FormErrorMessage>Required</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors?.phone?.type}>
                                <FormLabel>Phone</FormLabel>
                                <Input
                                    title='checkout-phone'
                                    placeholder="Phone"
                                    {...register("phone", { required: true })}
                                />
                                <FormErrorMessage>Required</FormErrorMessage>
                            </FormControl>
                        </VStack>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem title='checkout-payment'>
                    <AccordionButton bg="gray.200">PAYMENT METHOD</AccordionButton>
                    <AccordionPanel>
                        <VStack mt={4}>
                            <FormControl isInvalid={!!errors?.paymentMethod?.type}>
                                <FormLabel>Payment Method</FormLabel>
                                <RadioGroup>
                                    <VStack alignItems="flex-start">
                                        {restaurantInfo.paymentMethods.map((method, index) => (
                                            <Radio
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
                </AccordionItem>


                <AccordionItem title='checkout-comments'>
                    <AccordionButton bg="gray.200">COMMENTS</AccordionButton>
                    <AccordionPanel>
                        <VStack mt={4}>
                            <FormControl>
                                <FormLabel>Comments</FormLabel>
                                <Textarea placeholder="Comments..." {...register("comments")} />
                            </FormControl>
                        </VStack>
                    </AccordionPanel> 
                </AccordionItem>
            </Accordion>
            <BottomButton
                title='checkout-button'
                label="Place pick up order"
                total={calculateOrderTotal(lines, 10).toFixed(2)}
            />
        </form>
    );
};