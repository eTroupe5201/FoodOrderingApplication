import { Box, Text, Flex, VStack, InputGroup, Input, InputRightElement, FormControl, FormLabel, FormErrorMessage, Center, useToast } from "@chakra-ui/react";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDataProvider } from "../components/dataProvider"
import { auth } from "../utils/firebase" 
import { signInWithEmailAndPassword } from "firebase/auth";


/* Login page - handle and validate user input, also checking against database for existing account and 
*              correct credentials. 
* Route to Register page if button is clicked
* Route to ForgotPassword page if button is clicked
*/
export const Login = () => {
    const toast = useToast();
    const navigate = useNavigate();
    // const { sendLoginRequest } = useDataProvider();
    const { register, handleSubmit, formState } = useForm();

    const [showPassword, setShowPassword] = React.useState(false)
    const handleShowPassword= () => setShowPassword(!showPassword)

    //used to show validation error after the form was submitted
    // const [wrongPassword, setWrongPassword] = useState(false);
    // const [noAccount, setNoAccount] = useState(false);

    const navigateToRegister = () => {navigate('/register');}
    const navigateToResetPassword = () => {navigate('/forgotpassword');}

    const handleLogin = async (data) => {
        try {
            /**
             * Logging in with Firebase Authentication automatically handles the generation and management of JWT tokens. 
             * When the signInWithEmailAndPassword function is called, this function automatically handles token generation and management, 
             * and saves the user session on the client after successful login.
             */
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
    
            // Login successful, Firebase automatically handles the session and token
            console.log("Logged in user:", userCredential.user);

            // It is possible to obtain a token, but usually not required
            // const token = await userCredential.user.getIdToken();

            // Show success message and navigate to homepage
            toast({
                title: "Logged in successfully.",
                position: 'top',
                status: 'success',
                isClosable: true,
            });
            navigate("/");
        } catch (error) {
            // Login failed with error message
            toast({
                title: error.message,
                position: 'top',
                status: 'error',
                isClosable: true,
            });
        }
        // try {
        //     const result = await sendLoginRequest(data);
            
        //     if (result == "incorrect password") {
        //         setWrongPassword(true);
        //     }
        //     else if (result=="no existing account") {
        //         setNoAccount(true);
        //     }
        //     else {
        //         navigate('/');
        //     }
        // }
        // //if failure, prompt invalid messag
        // catch (error) {
        //     console.log(error);
        // };
    };

    return (
        <><form className='Login' onSubmit={handleSubmit(handleLogin)}> 
            <Flex alignContent='center' justifyContent='center'>
                <Box title='login-form-box' id='login-form-box' bg='#000000' color='#fff' w='35rem' height='100%' m='2rem' p='1.5rem'> 
                    <VStack>
                        <Text fontSize='30px' fontWeight='bold' mb='1rem'> Log In or Register </Text>
                        
                        <FormControl id='emailField' isInvalid={!!formState?.errors?.email?.type}>
                            <FormLabel>Email Address</FormLabel>
                            <Input 
                                id='email'
                                {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/})}
                            />
                            <FormErrorMessage>{"Email address is invalid or does not have an account associated with it"}</FormErrorMessage>
                        </FormControl>

                        <FormControl id='passwordField' isInvalid={!!formState?.errors?.password?.type}>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input 
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    {...register("password", { required: true})}
                                />
                                <InputRightElement width='4.5rem' h='48px'>
                                    <Box  
                                        bg='#A4A1A2' 
                                        w='3.5rem' 
                                        h='2rem' 
                                        borderRadius='md' 
                                        align='center'
                                        pt='0.25rem' 
                                        onClick={handleShowPassword} 
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </Box>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>{"Incorrect password"}</FormErrorMessage>
                        </FormControl>

                        <Center 
                            color='#fff'
                            fontWeight='bold'
                            alignSelf='end'
                            fontSize='20px'
                            onClick={navigateToResetPassword} 
                            > 
                            Forgot Password?
                        </Center>
                        <Box 
                            as='button'  
                            mt='1rem'
                            bg='#fff' 
                            color='#000000'
                            h='40px'
                            w='250px'
                            fontWeight='bold'
                            fontSize='20px'
                            borderRadius='md'
                            > 
                            Log In to Your Account
                        </Box>
                        <Center 
                            title='registerButton'
                            mt='0.5rem'
                            bg='#fff' 
                            color='#000000'
                            h='40px'
                            w='250px'
                            fontWeight='bold'
                            fontSize='20px'
                            borderRadius='md'
                            onClick={navigateToRegister} 
                            > 
                            Register for an Account
                        </Center>
                    </VStack>
                </Box>
            </Flex>
        </form></>
    );
};