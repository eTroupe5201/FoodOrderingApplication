import { Box, Text, useToast, Flex, VStack, InputGroup, Input, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

//Page for logging in or registering 
export const Login = () => {
    const toast = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = React.useState(false)
    const [password2, setPassword2] = useState("");
    const [show2, setShow2] = React.useState(false)
    const [resetCode, setResetCode] = useState("");

    const resetFields = () => {
        setEmail("");
        setPassword("");
        setShow(false);
        setPassword2("");
        setShow2(false);
        setResetCode("");
    };

    const handleEmail = (event) => {
        setEmail(event.target.value); 
        document.getElementById('email').style.outlineColor= "black";
    }
    const handlePassword = (event) => { 
        setPassword(event.target.value); 
        document.getElementById('password').style.outlineColor= "black";
    }

    const handlePassword2 = (event) => { 
        setPassword2(event.target.value); 
        document.getElementById('password2').style.outlineColor= "black";
    }

    const handleShowPassword= () => setShow(!show)
    const handleShowPassword2= () => setShow2(!show2)
    const handleResetCode = (event) => { setResetCode(event.target.value); }

    const handleLogin = (event) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        const emailInvalid = ((email.length === 0 || !(emailPattern.test(email))));
        const passwordInvalid = (password.length === 0);

        //validate all required lines in the form 
        if (emailInvalid)   { document.getElementById('email').style.outlineColor= "red"; }
        if (passwordInvalid) {document.getElementById('password').style.outlineColor= "red"; }

        //if any items are incorrectly filled out, show error Toast 
        if (emailInvalid || passwordInvalid) {         
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
            //TODO send request to server
            //TODO if success, what to do?
            //TODO if failure, prompt invalid message
        }
    }

    const navigate = useNavigate();
    const navigateToRegister = () => {
        //TODO go to Sign Up page
        //TODO if email entered, send with Sign Up page req

        navigate('/register');
    }

    const handleForgotPwEmail = (event) => { 
        //TODO verify that provided email has an existing account in the system - if not, take them to Signup page 
        //TODO generate 6 digit reset code (email)
        //TODO email code to provided address

        document.getElementById('pw-reset-form-box').style.display= "none";
        document.getElementById('email-code-form-box').style.display= "block";
    }

    const handleResetCodeValidation = (event) => { 
        //TODO check that provided code matches state code

        document.getElementById('email-code-form-box').style.display= "none";
        document.getElementById('pw-change-form-box').style.display= "block";
    }

    const handlePasswordChangeSave = (event) => { 
        //TODO verify passwords match and meet standards
        //TODO overwrite database PW for current set email
        document.getElementById('pw-change-form-box').style.display= "none";
        document.getElementById('login-form-box').style.display= "block";
        resetFields();
    }

    const baseLoginOrRegisterForm = (
        <Box  w={{base:"25em", sm:"30em", md:"35em"}} title='login-form-box' id='login-form-box' bg='#000000' color='#fff' height='100%' m='2rem' p='1.5rem' > 
            <VStack >
                <Text   fontSize={{ base: "20px", md: "25px"}} 
                fontWeight='bold' 
                mb='1rem'> SIGN IN </Text>
                <Input 
                    id='email'
                    type='email'
                    value={email} 
                    onChange={handleEmail} 
                    placeholder="enter email address"
                    border="tan 2px outset"
              
                />
                <InputGroup>
                    <Input 
                        id="password"
                        type={show ? 'text' : 'password'}
                        value={password} 
                        onChange={handlePassword} 
                        placeholder="enter password"
                        border="tan 2px outset"
                        w={{base:"20em", sm:"26em", md:"27em"}}
                        
                        
                    />
                    <InputRightElement width='4.5rem' h='48px'>
                        <Box 
                        
                            as='button' 
                            bg='white' 
                            color="black"
                            w='3.5rem' 
                            h='25px' 
                            fontWeight='bold'
                            fontSize="11px"
                            borderRadius='md' 
                            border="tan 2px outset"
                            _hover={{ boxShadow: "0 0 5px 1px tan" }}
                            onClick={handleShowPassword} 
                            mb="9px"
                        >
                            {show ? 'Hide' : 'Show'}
                        </Box>
                    </InputRightElement>
                </InputGroup>
                <Box 
                    as='button'  
                    color='#fff'
                    fontWeight='bold'
                    alignSelf='end'
                    fontSize="11px"
                    h='40px'
                    w='50%'
                    margin="2%"
                    border="tan 2px outset"
                    _hover={{ boxShadow: "0 0 5px 1px linen" }}
                    onClick={emailPromptForReset} 
                    > 
                    Forgot Password?
                </Box>
                <Box 
                    as='button'  
                 
                    mt="10%"
                    _hover={{ boxShadow: "0 0 5px 1px linen" }}
                    color='white'
                    h='40px'
                    w='70%'
                    fontWeight='bold'
                    fontSize="12px"
                    border="tan 2px outset"
                    borderRadius='md'
                    background="black"
                    onClick={handleLogin} 
                    > 
                    CONTINUE
                </Box>
                <Box 
                      _hover={{ boxShadow: "0 0 5px 1px linen" }}
                         border="tan 2px outset"
                    as='button'  
                    mt='0.5rem'
                    
                    color='white'
                    h='40px'
                    w='70%'
                    fontWeight='bold'
                    fontSize="12px"
                    borderRadius='md'
                    background="black"
                    onClick={navigateToRegister} 
                    > 
                    REGISTER
                </Box>
            </VStack>
        </Box>
    );

    const sendEmailCodeForm = (
        <Box 
        borderRadius="25px" border="tan 2px outset"
         title='pw-reset-form-box' id='pw-reset-form-box' 
         display='none' bg='#000000' color='#fff' height='2%' m='2rem' mb="10em"p='1.5rem' w={{base:"25em", sm:"30em"}} > 
            <VStack>
                <Text  fontSize="15px"  fontWeight='bold'> To reset your password, please enter your email address. </Text>
                <Text  fontSize="15px"  fontWeight='bold' mb='1rem'> We will email you a code to verify that it is you attempting to reset the password. </Text>
                <Input 
                    id='email'
                    type='email'
                    value={email} 
                    onChange={handleEmail} 
                    placeholder="enter email address"
                    
                />
                <Box 
                    as='button'  
                    mt='1rem'
                    bg='black' 
                    color='white'
                    h='40px'
                    w='250px'
                    fontWeight='bold'
                    fontSize="15px"
                    borderRadius='md'
                    border="tan 2px outset"
                    _hover={{ boxShadow: "0 0 5px 1px linen" }}
                    onClick={handleForgotPwEmail} 
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
                    id='reset-code'
                    value={resetCode} 
                    onChange={handleResetCode} 
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
                        type={show ? 'text' : 'password'}
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
                            {show ? 'Hide' : 'Show'}
                        </Box>
                    </InputRightElement>
                </InputGroup>
                <InputGroup>
                    <Input 
                        id="password2"
                        type={show2 ? 'text' : 'password'}
                        value={password2} 
                        onChange={handlePassword2} 
                        placeholder="enter password again"
                    />
                    <InputRightElement width='4.5rem' h='48px'>
                        <Box 
                            as='button' 
                            bg='#A4A1A2' 
                            w='3.5rem' 
                            h='2rem' 
                            borderRadius='md' 
                            onClick={handleShowPassword2} 
                        >
                            {show2 ? 'Hide' : 'Show'}
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
                {baseLoginOrRegisterForm}
                {sendEmailCodeForm}
                {enterEmailCodeForm}
                {passwordChangeForm}
            </Flex>
        </div></>
    );
};

function emailPromptForReset () {
    document.getElementById('login-form-box').style.display= "none";
    document.getElementById('pw-reset-form-box').style.display= "block";
}