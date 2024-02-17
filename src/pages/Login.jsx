import { Box, Text, Flex, VStack, InputGroup, Input, InputRightElement, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDataProvider } from "../components/dataProvider"

/* Login page - handle and validate user input, also checking against database for existing account and 
*              correct credentials. 
* Route to Register page if button is clicked
* Route to ForgotPassword page if button is clicked
*/
export const Login = () => {
    const navigate = useNavigate();
    const { sendLoginRequest } = useDataProvider();
    const { register, handleSubmit, formState } = useForm();

    const [showPassword, setShowPassword] = React.useState(false)
    const handleShowPassword= () => setShowPassword(!showPassword)
   
    const handleLogin = async (data) => {
        console.log("login button clicked");

        ////TODO send request to server
        // try {
        //     await sendLoginRequest(data);
            
        //     //TODO if success, what to do?

        //     //navigate('/');
        // }
        // //TODO if failure, prompt invalid messag
        // catch (error) {
            
        
        // console.log(error);
        // };
        
    }

    //TODO if email entered, send with Sign Up page req
    const navigateToRegister = () => {navigate('/register');}
    const navigateToResetPassword = () => {navigate('/forgotpassword');}

    //TODO: once DB checks added, add logic for 'An account registered to this email address does not exist'
    const [emailErrorMsg, setEmailErrorMsg]= useState("Incorrect email address");
    const [passwordErrorMsg, setPasswordErrorMsg]= useState("Incorrect password");

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
                            <FormErrorMessage>{emailErrorMsg}</FormErrorMessage>
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
                            <FormErrorMessage>{passwordErrorMsg}</FormErrorMessage>
                        </FormControl>

                        <Box 
                            as='button'  
                            color='#fff'
                            fontWeight='bold'
                            alignSelf='end'
                            fontSize='20px'
                            onClick={navigateToResetPassword} 
                            > 
                            Forgot Password?
                        </Box>
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
                        <Box 
                            as='button'  
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
                        </Box>
                    </VStack>
                </Box>
            </Flex>
        </form></>
    );
};