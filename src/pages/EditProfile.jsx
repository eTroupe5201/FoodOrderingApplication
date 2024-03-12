import React, {useState, useEffect, useRef} from "react";
import { Box, Button, Text, Flex, VStack, Input, FormControl, FormLabel, FormErrorMessage} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDataProvider } from "../components/dataProvider"
import "../styles.css";

export const EditProfile = () => {
    const navigate = useNavigate();
    const { fetchUserProfile, updateUserAccount } = useDataProvider();
    const isMounted = useRef(false); // Used to track the mounting status of components'
    const { register, handleSubmit, setValue, formState, watch } = useForm();

    const [emailErrorMsg, setEmailErrorMsg]= useState("Required. Enter a valid email address.");
    
     useEffect(() => {
        isMounted.current = true;
        const fetchAndSetUserProfile = async () => {
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
            }
        };

        fetchAndSetUserProfile();
        
        /**
         * We used useRef to create an isMounted reference that will remain unchanged throughout the entire lifecycle of the component. 
         * In the cleanup function of useEffect, we set isMounted. current to false. In this way, 
         * before the fetchAndSetUserProfile asynchronous function attempts to set the state, it checks isMounted. current. 
         * If the component has already been uninstalled, the state setting operation will not be performed, 
         * thus avoiding errors in updating the state of uninstalled components.
        */
    
        return () => {isMounted.current = false;};
    }, []); 

    const handleEditProfile = async (data) => {
        updateUserAccount(data);
        navigate("/profile");  
    };

    return (
        <> <Flex  mb="5em" alignContent='center' justifyContent='center'>
                <Box border="outset 2px tan" borderRadius="25px"
                 title='edit-profile-form-box' id='edit-profile-form-box' bg='#000000' 
                 color='#fff' w={{base:"25em", sm:"30em", md:"35em"}} height='100%' m='2rem' p='2rem'> 
                    <form className='EditProfile' onSubmit={handleSubmit(handleEditProfile)}>
                    <VStack>
                        <Text fontSize='20px' fontWeight='bold' mb='1rem'> EDIT PROFILE </Text>                        
                        <FormControl id='fnameField' isInvalid={!!formState?.errors?.firstName?.type}>
                            <FormLabel>First Name</FormLabel>
                            <Input 
                                id='firstName'
                                title='edit-profile-first-name'
                                {...register("firstName", { required: true, pattern:/(^[a-zA-Z,'-][a-zA-Z\s,'-]{0,20}[a-zA-Z]$)/})}
                            />
                            <FormErrorMessage>Required</FormErrorMessage>
                        </FormControl>
                        <FormControl id='lnameField' isInvalid={!!formState?.errors?.lastName?.type}>
                            <FormLabel>Last Name</FormLabel>
                            <Input 
                                id='lastName'
                                title='edit-profile-last-name'
                                {...register("lastName", { required: true, pattern:/(^[a-zA-Z,'-][a-zA-Z\s,'-]{0,20}[a-zA-Z]$)/ })}
                            />
                            <FormErrorMessage>Required</FormErrorMessage>
                        </FormControl>

                        <FormControl id='emailField' isInvalid={!!formState?.errors?.email?.type}>
                            <FormLabel >Email Address</FormLabel>
                            <Input 
                                id='email'
                                title='edit-profile-email'
                                {...register("email", { 
                                    required: true,
                                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    validate: (val) => {
                                        if (watch("confirmEmail") != val) {
                                            setEmailErrorMsg("Email addresses do not match.");
                                        } 
                                        else {
                                            setEmailErrorMsg("Required. Enter a valid email address.");
                                        }
                                    }
                                })}
                            />
                            <FormErrorMessage>{emailErrorMsg}</FormErrorMessage>
                        </FormControl>
                        
                        <FormControl id='phoneField' >
                            <FormLabel>Phone Number (optional)</FormLabel>
                            <Input 
                                type='tel'
                                title='edit-profile-phone'
                                {...register("phone")}
                            />
                        </FormControl>
                        <Text> Please note: there may be a small delay for any updated information to reflect on your Profile page </Text>
                        <Box 
                            title='edit-profile-save-button'
                            align='center'
                            as='button' 
                            pt='0.25rem' 
                            mt='0.5rem'
                            bg='black' 
                            color='white'
                            h='40px'
                            w='250px'
                            fontWeight='bold'
                            fontSize="15px"
                            _hover={{ boxShadow: "0 0 5px 1px tan" }}
                            border="outset 2px tan"
                            borderRadius='md'
                        >
                            Save
                        </Box>                    
                    </VStack>
                    </form>

                    <Flex justifyContent="center"><Button 
                        mt="-2rem"
                        pt='0.25rem' 
                        bg='black' 
                        color='white'
                        h='40px'
                        w='250px'
                        fontFamily={"'Raleway', sans-serif"}                     
                        fontWeight='bold'
                        fontSize="15px"
                        _hover={{ boxShadow: "0 0 5px 1px tan" }}
                        border="outset 2px tan"
                        borderRadius='md' 
                        onClick={() => navigate("/profile")}
                    >
                        Go Back
                    </Button></Flex>
                </Box>
            </Flex>
        </>
    );
};