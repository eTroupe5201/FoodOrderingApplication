import { Box, Text, useToast, Flex, VStack, Input } from "@chakra-ui/react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase" 
import { sendPasswordResetEmail } from "firebase/auth";
import logtail from "../logger";

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
        try {
            saveData(email);
        } catch (error) {console.log(error)} 
        
        //check email field is empty or not
        if (!email) {
            console.log("ForgotPassword - Invalid email - empty string or only whitespace");
            logtail.info("ForgotPassword - Invalid email - empty string or only whitespace");
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
                logtail.log("ForgotPassword - Success - password email sent");
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
                logtail.log("ForgotPassword - " + error.message);
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
            <Box 
                    borderRadius="25px" border="tan 2px outset"
                    title='pw-reset-form-box' id='pw-reset-form-box' 
                     bg='#000000' color='#fff' height='2%' m='2rem' mb="10em"p='1.5rem' w={{base:"25em", sm:"30em"}} >                 <VStack>
            <Text  fontSize="15px"  fontWeight='bold'> To reset your password, please enter your email address. </Text>
                <Text  fontSize="15px"  fontWeight='bold' mb='1rem'> We will email you a code to verify that it is you attempting to reset the password. </Text>                    <Input
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
                        data-test="forgot-password-email-input"
                    />
                    <Box 
                        as='button'  
                        title='forgot-password-button'
                        mt='1rem'
                        bg='black' 
                        color='white'
                        h='40px'
                        w='250px'
                        fontWeight='bold'
                        fontSize='15px'
                        fontFamily="'Raleway', sans-serif"
                        borderRadius='md'
                        border="tan 2px outset"
                        _hover={{ boxShadow: "0 0 5px 1px linen" }}
                        onClick={handleForgotPasswordEmail} 
                        data-test="send-reset-email-button"
                    > 
                        Send Reset Email
                    </Box>
                </VStack>
            </Box>
        </Flex>
    );
};