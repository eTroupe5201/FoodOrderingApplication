import { Box, Text, useToast, Flex, VStack, InputGroup, Input, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
//import {createTransport} from "nodemailer";


// function useResetPasswordCode(email, resetCode) {
//     const transport = createTransport({
//         host: "sandbox.smtp.mailtrap.io",
//         port: 2525,
//         auth: {
//           user: "60e6194ecc7e65",
//           pass: "e9b9362aaea175",
//         },
//       });

//     try{ 
//         const info = transport.sendMail({
//             to: email,
//             subject: 'Divine Delicacies - Password Reset Code',
//             html: `
//                 <div>
//                 <h1> The reset code you requested is listed below: </h1> </br>
//                 <p> ${resetCode} </p>
//                 </div>
//                 `

//         });
//         console.log("Message sent: %s", info.messageId);
//     } catch (error) {
//         console.error("Error sending email: %s", error);
//     }

//     return; 
// }



/* ForgotPassword page - validate provided email and check if existing in database, send a code to the email, and 
*                       prompt user to input the code. If correct, allow password reset and route back to Login page. 
*                       If incorrect, allow user to 'resend' code
*/
export const ForgotPassword = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const toast = useToast();

    const sendPasswordCode = () => {
        // useResetPasswordCode(email, resetCode);
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = React.useState(false)
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
    const [resetCode, setResetCode] = useState("");
    const [inputCode, setInputCode] = useState("");

    const handleEmail = (event) => {
        setEmail(event.target.value); 
        document.getElementById('email-forgot').style.outlineColor= "black";
    }
    const handlePassword = (event) => { 
        setPassword(event.target.value); 
        document.getElementById('password').style.outlineColor= "black";
    }

    const handleConfirmPassword = (event) => { 
        setConfirmPassword(event.target.value); 
        document.getElementById('confirmPassword').style.outlineColor= "black";
    }

    const handleShowPassword= () => setShowPassword(!showPassword)
    const handleShowConfirmPassword= () => setShowConfirmPassword(!showConfirmPassword)
    const handleInputCode = (event) => { 
        document.getElementById('input-code').style.outlineColor= "black";
        const input = event.target.value;

        if (input.length > 6)   setInputCode(input.slice(0, 6));    
        else                    setInputCode(input); 
    }

    const navigate = useNavigate();
    const navigateToLogin = () => {
        //TODO if success of reset, go back to login page

        navigate('/login');
    }

    const handleForgotPasswordEmail = (event) => { 
        //TODO verify that provided email has an existing account in the system - if not, take them to Signup page 

        const emailInvalid = ((email.length === 0 || !(emailPattern.test(email))));
        //validate all required lines in the form 
        if (emailInvalid)   { document.getElementById('email-forgot').style.outlineColor= "red"; }
       
        if (emailInvalid) {         
            toast ({    
                addRole: true,
                title: "The email address or password entered are invalid. Please try again.",
                position: 'top', 
                status: 'error',
                isClosable: true,
            });
           
        }
        //if all true, form is correctly filled out. Send to server, hide Form and show success message, and reset fields
        else {
            const code = Math.floor((Math.random() * 900000 + 100000));
            setResetCode(code);


            //TODO email code to provided address
            sendPasswordCode();

            document.getElementById('pw-reset-form-box').style.display= "none";
            document.getElementById('email-code-form-box').style.display= "block";
        }
    }

    const handleResetCodeValidation = (event) => { 
        console.log(resetCode);

        if (inputCode != resetCode) {
            document.getElementById('input-code').style.outlineColor= "red";
            document.getElementById('resend-button').style.display= "block";

            toast ({    
                addRole: true,
                title: "The code you entered does not match the code we sent you. Please try again.",
                position: 'top', 
                status: 'error',
                isClosable: true,
            });
        } 
        else {            
            document.getElementById('email-code-form-box').style.display= "none";
            document.getElementById('pw-change-form-box').style.display= "block";
        }
    }

    const handlePasswordChangeSave = (event) => { 
        //TODO actual password validation 
        //one upper, one lower, min 8 chars, one number 
        const passwordInvalid = (password.length === 0);
        const confirmPasswordInvalid = (password.length === 0);
        const passwordsMatch = (password === confirmPassword);

        if (passwordInvalid || confirmPasswordInvalid || !passwordsMatch)   { 
            toast ({    
                addRole: true,
                title: "The passwords are invalid or do not match. Please try again.",
                position: 'top', 
                status: 'error',
                isClosable: true,
            });
            
            document.getElementById('password').style.outlineColor= "red"; 
            document.getElementById('confirmPassword').style.outlineColor= "red"; 
        }
        //password valid and match
        else {
            //TODO overwrite database PW for current set email
            document.getElementById('pw-change-form-box').style.display= "none";
            navigateToLogin();
        }
    }

    const sendEmailCodeForm = (
        <Box title='pw-reset-form-box' id='pw-reset-form-box' bg='#000000' color='#fff' w='35rem' height='100%' m='2rem' p='1.5rem'> 
            <VStack>
                <Text fontSize='30px' fontWeight='bold'> To reset your password, please enter your email address. </Text>
                <Text fontSize='20px' fontWeight='bold' mb='1rem'> We will email you a code to verify that it is you attempting to reset the password. </Text>
                <Input 
                    id='email-forgot'
                    type='email'
                    value={email} 
                    onChange={handleEmail} 
                    placeholder="enter email address"
                />
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
                    onClick={handleForgotPasswordEmail} 
                    > 
                    Send Code
                </Box>
            </VStack>
        </Box>
    );

    const enterEmailCodeForm = (
        <Box title='email-code-form-box' id='email-code-form-box' display='none' bg='#000000' color='#fff' w='35rem' height='100%' m='2rem' p='1.5rem'> 
            <VStack>
                <Text fontSize='30px' fontWeight='bold' mb='1rem'> Enter the 6 digit code that was sent to the email address tied to your account. </Text>
                <Input 
                    id='input-code'
                    type='number'
                    value={inputCode} 
                    onChange={handleInputCode} 
                    placeholder="enter 6 digit code here"
                />
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
                    onClick={handleResetCodeValidation} 
                    > 
                    Verify Code
                </Box>
                <Box 
                    as='button'  
                    id="resend-button"
                    mt='1rem'
                    bg='#fff' 
                    color='#000000'
                    h='40px'
                    w='250px'
                    fontWeight='bold'
                    fontSize='20px'
                    borderRadius='md'
                    display="none"
                    onClick={sendPasswordCode} 
                    > 
                    Resend Code
                </Box>
            </VStack>
        </Box>
    );

    const passwordChangeForm = (
        <Box title='pw-change-form-box' id='pw-change-form-box' display='none' bg='#000000' color='#fff' w='35rem' height='100%' m='2rem' p='1.5rem'> 
            <VStack>
                <Text fontSize='30px' fontWeight='bold' mb='1rem'> Enter your new password. </Text>
                <InputGroup>
                    <Input 
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password} 
                        onChange={handlePassword} 
                        placeholder="enter password"
                    />
                    <InputRightElement width='4.5rem' h='48px'>
                        <Box 
                            as='button' 
                            bg='#A4A1A2' 
                            w='3.5rem' 
                            h='2rem' 
                            borderRadius='md' 
                            onClick={handleShowPassword} 
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </Box>
                    </InputRightElement>
                </InputGroup>
                <InputGroup>
                    <Input 
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword} 
                        onChange={handleConfirmPassword} 
                        placeholder="enter password again"
                    />
                    <InputRightElement width='4.5rem' h='48px'>
                        <Box 
                            as='button' 
                            bg='#A4A1A2' 
                            w='3.5rem' 
                            h='2rem' 
                            borderRadius='md' 
                            onClick={handleShowConfirmPassword} 
                        >
                            {showConfirmPassword ? 'Hide' : 'Show'}
                        </Box>
                    </InputRightElement>
                </InputGroup>
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
                    onClick={handlePasswordChangeSave} 
                    > 
                    Save New Password
                </Box>
            </VStack>
        </Box>
    );

    return (
        <><div className='Login' > 
            <Flex alignContent='center' justifyContent='center'>
                {sendEmailCodeForm}
                {enterEmailCodeForm}
                {passwordChangeForm}
            </Flex>
        </div></>
    );
};

