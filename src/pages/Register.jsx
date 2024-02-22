import React, {useState} from "react";
import { Box, Text, Flex, VStack, InputGroup, Input, InputRightElement, FormControl, FormLabel, FormErrorMessage, useToast} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDataProvider } from "../components/dataProvider"
import {GoogleButton} from 'react-google-button'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"; // Updated import

/* Register page - use React hook Forms for collecting input and validating. Once validated and submitted, send request to Firebase and:
*   - if account exists with provided email, route to Login page
*   - if no account exists with provided email, create account and store user info in DB. Upon return, route back to Home page
*/
export const Register = ({saveData}) => {
    const toast = useToast();
    const navigate = useNavigate();
    const { registerNewAccount } = useDataProvider();
    const { register, handleSubmit, formState, watch } = useForm();

    const [emailErrorMsg, setEmailErrorMsg]= useState("Required");
    const [passwordErrorMsg, setPasswordErrorMsg]= useState("Required");
    const [emailsMatch, setEmailsMatch] = useState(true);
    const [passwordsMatch, setPasswordsMatch]= useState(true);

    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const handleShowPassword= () => setShowPassword(!showPassword)
    const handleShowConfirmPassword= () => setShowConfirmPassword(!showConfirmPassword)

    const handleGoogleRegister = async (e) => {
      
        try {
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({ prompt: "select_account" }); // Force account selection prompt
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            
            getUserInfo(user);
            navigate("/");
            // Show success message
            toast({
                title: "Logged in successfully.",
                position: "top",
                status: "success",
                isClosable: true,
            });
        } catch (error) {
            // Handle sign-in error
            console.error("Google Sign-In Error:", error.message);
            toast({
                title: "Failed to sign in with Google.",
                position: "top",
                status: "error",
                isClosable: true,
            });
        }
    };
    const handleRegister = async (data) => {

        try {
            saveData(data);
        } catch (error) {console.log(error);}

        //emails and passwords match
        if (data.email === data.confirmEmail && data.password === data.confirmPassword) {
            /**
             * When registerNewAccount is called and succeeds, Firebase Authentication SDK will automatically 
             * manage the user's session and JWT token. So in most cases we don't need to manually handle JWT tokens on the front end 
             * unless we need to send them to our own server for validation or other processing.
             */
            try {
                console.log("valid registration input");
                const result = await registerNewAccount(data); 
                
                //if result is not blank, means new account created
                if (result.success) {
                    toast ({    
                        addRole: true,
                        title: "Your account was successfully created.",
                        position: "top", 
                        status: "success",
                        isClosable: true,
                    });
                }
                //else, existing account
                else {
                    toast ({    
                        addRole: true,
                        title: "The email provided is associated with an existing account.",
                        position: "top", 
                        status: "info",
                        isClosable: true,
                    });
                }
                navigate("/login");
            } catch (error) {
                console.log(error);
            }
        }        
        else (console.log("passwords or emails do not match"));
    }

    return (
        <><form className='Register' onSubmit={handleSubmit(handleRegister)}> 
            <Flex  mb="5em" alignContent='center' justifyContent='center'>
                <Box border="outset 2px tan" borderRadius="25px"
                 title='register-form-box' id='register-form-box' bg='#000000' 
                 color='#fff' w={{base:"25em", sm:"30em", md:"35em"}} height='100%' m='2rem' p='2rem'> 
                   
                    <VStack>
                        <Text fontSize='20px' fontWeight='bold' mb='1rem'> REGISTER </Text>                        
                        <FormControl id='fnameField' isInvalid={!!formState?.errors?.firstName?.type}>
                            <FormLabel>First Name</FormLabel>
                            <Input 
                                id='firstName'
                                title='register-first-name'
                                {...register("firstName", { required: true, pattern:/(^[a-zA-Z,'-][a-zA-Z\s,'-]{0,20}[a-zA-Z]$)/})}
                            />
                            <FormErrorMessage>Required</FormErrorMessage>
                        </FormControl>
                        <FormControl id='lnameField' isInvalid={!!formState?.errors?.lastName?.type}>
                            <FormLabel>Last Name</FormLabel>
                            <Input 
                                id='lastName'
                                title='register-last-name'
                                {...register("lastName", { required: true, pattern:/(^[a-zA-Z,'-][a-zA-Z\s,'-]{0,20}[a-zA-Z]$)/ })}
                            />
                            <FormErrorMessage>Required</FormErrorMessage>
                        </FormControl>
                        <FormControl id='emailField' isInvalid={!!formState?.errors?.email?.type || !emailsMatch}>
                            <FormLabel >Email Address</FormLabel>
                            <Input 
                                id='email'
                                title='register-email'
                                type='email'
                                {...register("email", { 
                                    required: true,
                                    validate: (val) => {
                                        if (watch("confirmEmail") != val) {
                                            setEmailErrorMsg("Email addresses do not match.");
                                            setEmailsMatch(false);
                                        } 
                                        else {
                                            setEmailErrorMsg("Required");
                                            setEmailsMatch(true);
                                        }
                                    }
                                })}
                            />
                            <FormErrorMessage>{emailErrorMsg}</FormErrorMessage>
                        </FormControl>
                        <FormControl id='confirmEmailField' isInvalid={!!formState?.errors?.confirmEmail?.type || !emailsMatch}>
                        <FormLabel>Confirm Email Address</FormLabel>
                            <Input 
                                id='confirmEmail'
                                title='register-confirm-email'
                                type='confirmEmail'
                                {...register("confirmEmail", { 
                                    required: true,
                                    validate: (val) => {
                                        if (watch("email") != val) {
                                            setEmailErrorMsg("Email addresses do not match.");
                                            setEmailsMatch(false);
                                            
                                        } 
                                        else {
                                            setEmailErrorMsg("Required");
                                            setEmailsMatch(true);
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
                                title='register-phone'
                                {...register("phone")}
                            />
                        </FormControl>
                        
                        <FormControl id='passwordField' isInvalid={!!formState?.errors?.password?.type || !passwordsMatch}>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input 
                                    id="password"
                                    title='register-password'
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", { 
                                        required: true,
                                        validate: (val) => {
                                            if (watch("confirmPassword") != val) {
                                                setPasswordErrorMsg("Passwords do not match.");
                                                setPasswordsMatch(false);
                                            } 
                                            else {
                                                setPasswordErrorMsg("Required");
                                                setPasswordsMatch(true);
                                            } //TODO: error for user , pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/   //eight char, one upper, one lower, one num
                                        } 
                                    })}
                                />
                                <InputRightElement width='4.5rem' h='48px'>
                                    <Box  
                                        title='show-password-button'
                                        bg='white' 
                                        mb="9px"
                                        color="black"
                                        w='3.5rem' 
                                        h='25px' 
                                        fontWeight='bold'
                                        fontSize="11px"
                                        _hover={{ boxShadow: "0 0 5px 1px tan" }}
                                        border="tan 2px outset" 
                                        borderRadius='md' 
                                        align='center'
                                        pt='0.25rem' 
                                        onClick={handleShowPassword} 
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </Box>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>{passwordErrorMsg}</FormErrorMessage>
                        </FormControl>

                        <FormControl id='confirmPasswordField' isInvalid={!!formState?.errors?.confirmPassword?.type || !passwordsMatch}>
                            <FormLabel>Confirm Password</FormLabel>
                            <InputGroup>
                                <Input 
                                    id="confirmPassword"
                                    title='register-confirm-password'
                                    type={showConfirmPassword ? "text" : "password"}
                                    {...register("confirmPassword", { 
                                        required: true,
                                        validate: (val) => {
                                            if (watch("password") != val) {
                                                setPasswordErrorMsg("Passwords do not match.");
                                                setPasswordsMatch(false);
                                            } 
                                            else {
                                                setPasswordErrorMsg("Required");
                                                setPasswordsMatch(true);
                                            }
                                        }
                                    })}
                                />
                                <InputRightElement width='4.5rem' h='48px'>
                                    <Box 
                                        title='show-confirm-password-button'
                                        border="tan 2px outset"
                                        bg='white' 
                                        mb="9px"
                                        color="black"
                                        w='3.5rem' 
                                        h='25px' 
                                        fontWeight='bold'
                                        fontSize="11px"
                                        _hover={{ boxShadow: "0 0 5px 1px tan" }} 
                                        borderRadius='md' 
                                        align='center'
                                        pt='0.25rem' 
                                        onClick={handleShowConfirmPassword} 
                                    >
                                        {showConfirmPassword ? "Hide" : "Show"}
                                    </Box>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage mt="10px" lineHeight="5"textAlign="center" padding="20px" textTransform="uppercase" fontSize="12px" >{passwordErrorMsg}</FormErrorMessage>
                        </FormControl>

                        <Text fontStyle="italic"> 
                            {"Passwords must contain at least 8 characters, one lowercase letter, one uppercase letter, and one number."} 
                        </Text>
                        <Box 
                            title='register-register-button'
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
                            Register
                        </Box>
                    </VStack>
                    <div size="sm" > <GoogleButton size="sm" onClick={handleGoogleRegister} /></div>
                </Box>
            </Flex>
        </form></>
    );
};