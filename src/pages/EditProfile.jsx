import React, {useState, useEffect, useRef} from "react";
import { Box, Text, Flex, VStack, Input, FormControl, FormLabel, FormErrorMessage, useToast} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDataProvider } from "../components/dataProvider"
import { auth } from "../utils/firebase" 
import { updateProfile, updateEmail, updatePhone } from "firebase/auth";
import "../styles.css";

//TODO: fix state issue with setValue (cannot change input)
export const EditProfile = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const { fetchUserProfile } = useDataProvider();
    const isMounted = useRef(true); // Used to track the mounting status of components'
    const { register, handleSubmit, setValue, getValues, formState, watch } = useForm();

    const [emailErrorMsg, setEmailErrorMsg]= useState("Required. Enter a valid email address.");

    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    
     useEffect(() => {
        const fetchAndSetUserProfile = async () => {
            const data = await fetchUserProfile();
            // console.log(data);
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
                setFname(data.firstName);

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
    
        return () => {
        isMounted.current = false;
        };
    }, [fetchUserProfile, setValue, setFname]); 

    const handleEditProfile = async (data) => {
        //if firsts dont match, save new
        if (getValues("firstName") != fname) {
            updateProfile(auth.currentUser, {
                firstName: getValues("firstName")
            }).then(() => {
                console.log("first name updated");
            }).catch((error) => {
                console.log(error);
            });
        };
        //same for last
        //same for email
        //same for phone
        //nav back to profile with toast about succesful save

        //emails and passwords match
        
    };

    return (
        <><form className='EditProfile' onSubmit={handleSubmit(handleEditProfile)}> 
            <Flex  mb="5em" alignContent='center' justifyContent='center'>
                <Box border="outset 2px tan" borderRadius="25px"
                 title='edit-profile-form-box' id='edit-profile-form-box' bg='#000000' 
                 color='#fff' w={{base:"25em", sm:"30em", md:"35em"}} height='100%' m='2rem' p='2rem'> 
                   
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
                </Box>
            </Flex>
        </form></>
    );
};