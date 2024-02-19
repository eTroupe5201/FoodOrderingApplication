import { Box, Text, useToast, Flex, VStack, Input } from "@chakra-ui/react";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase" 
import { sendPasswordResetEmail } from "firebase/auth";


/* Firebase Authentication provides a function to reset a user's password, which  
*  involves sending a password reset link to the user's registered email address.
*/
export const ForgotPassword = ({saveData}) => {
    const [email, setEmail] = useState("");
    const toast = useToast();
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleForgotPasswordEmail = async () => {
        // try {
        //     saveData(data);
        // } catch (error) {} //console.log("This is a test call - will throw error in dev/prod")};

        //check email field is empty or not
        if (!email || email.trim().length) {
            console.log("invalid email - empty string or only whitespace");
            toast({
                title: "Please enter your email address.",
                status: "warning",
                position: "top",
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        
        //if not empty, we will call this firebase function directly and then we can go to our email box to rest the password
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log("Success - password email sent");
                toast({
                    title: "Password reset email sent.",
                    description: "Check your email for the password reset instructions.",
                    status: "success",
                    position: "top",
                    duration: 9000,
                    isClosable: true,
                });
                navigate("/login");
            })
            .catch((error) => {
                console.log("invalid email - not a valid format");
                toast({
                    title: "An error occurred.",
                    description: "Invalid email address", //error.message, custom message for user friendliness
                    status: "error",
                    position: "top",
                    duration: 9000,
                    isClosable: true,
                });
            });
    };

    return (
        <Flex alignContent='center' justifyContent='center'>
            <Box title='pw-reset-form-box' id='pw-reset-form-box' bg='#000000' color='#fff' w='35rem' height='100%' m='2rem' p='1.5rem'> 
                <VStack>
                    <Text fontFamily="'Raleway', sans-serif" fontSize='30px' fontWeight='bold'> To reset your password, please enter your email address. </Text>
                    <Input
                        id='email-forgot'
                        title='forgot-password-email'
                        type='email'
                        value={email} 
                        onChange={handleEmailChange} 
                        fontFamily="'Raleway', sans-serif"
                        fontWeight='bold'
                        fontSize='20px'
                        bg= '#fff'
                        color='#000000'
                        height='3rem'
                        placeholder="enter email address"
                    />
                    <Box 
                        as='button'  
                        title='forgot-password-button'
                        mt='1rem'
                        bg='#fff' 
                        color='#000000'
                        h='40px'
                        w='250px'
                        fontWeight='bold'
                        fontSize='20px'
                        fontFamily="'Raleway', sans-serif"
                        borderRadius='md'
                        onClick={handleForgotPasswordEmail} 
                    > 
                        Send Reset Email
                    </Box>
                </VStack>
            </Box>
        </Flex>
    );
};