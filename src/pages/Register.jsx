import React, {useState} from "react";
import { Box, Text, useToast, Flex, VStack, InputGroup, Input, InputRightElement } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useDataProvider } from "../components/dataProvider"


//Page for signing in 
export const Register = () => {
    const toast = useToast();
    const navigate = useNavigate();

    // const {lines, register } = useDataProvider();
    const navigateToHome = () => {
        navigate('/');
    };

    //TODO: implement dataProvider logic
    //TODO: comment out current and delete once above works
    // const onSubmit = async (data) => {}
    //     await register (data);
    //     navigate('/');
    // }

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = React.useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

    const handleFname = (event) => { 
        setFname(event.target.value); 
        document.getElementById('fname').style.outlineColor= "black";
    }
    const handleLname = (event) => { 
        setLname(event.target.value); 
        document.getElementById('lname').style.outlineColor= "black";
    }
    const handleEmail = (event) => { 
        setEmail(event.target.value);
        document.getElementById('email').style.outlineColor= "black";
    }
    const handleConfirmEmail = (event) => { 
        setConfirmEmail(event.target.value); 
        document.getElementById('confirmEmail').style.outlineColor= "black";
    }
    const handlePhone = (event) => { setPhone(event.target.value); }
    const handlePassword = (event) => { 
        setPassword (event.target.value); 
        document.getElementById('password').style.outlineColor= "black";
    }
    const handleConfirmPassword = (event) => { 
        setConfirmPassword (event.target.value); 
        document.getElementById('confirmPassword').style.outlineColor= "black";
    }
    const handleShowPassword= () => setShowPassword(!showPassword)
    const handleShowConfirmPassword= () => setShowConfirmPassword(!showConfirmPassword)
   
    const handleRegister = (event) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        const fnameInvalid = (fname.length === 0);
        const lnameInvalid = (lname.length === 0);
        const emailInvalid = ((email.length === 0 || !(emailPattern.test(email))));
        const confirmEmailInvalid = ((email.length === 0 || !(emailPattern.test(email))));
        const emailsMatch = (email === confirmEmail);
        //TODO: add actual password validation 
        //one upper, one lower, min 8 chars, one number 
        const passwordInvalid = (password.length === 0);
        const confirmPasswordInvalid = (password.length === 0);
        const passwordsMatch = (password === confirmPassword);

        //validate all required lines in the form 
        if (fnameInvalid)   { document.getElementById('fname').style.outlineColor= "red"; }
        if (lnameInvalid)   { document.getElementById('lname').style.outlineColor= "red"; }
        if (emailInvalid || confirmEmailInvalid || !emailsMatch)   { 
            document.getElementById('email').style.outlineColor= "red"; 
            document.getElementById('confirmEmail').style.outlineColor= "red";
        }
        else {
            document.getElementById('email').style.outlineColor= "black"; 
            document.getElementById('confirmEmail').style.outlineColor= "black";
        }
        if (passwordInvalid || confirmPasswordInvalid || !passwordsMatch)   { 
            document.getElementById('password').style.outlineColor= "red"; 
            document.getElementById('confirmPassword').style.outlineColor= "red"; 
        }
        else {
            document.getElementById('password').style.outlineColor= "black"; 
            document.getElementById('confirmPassword').style.outlineColor= "black"; 
        }

        //if any base items are incorrectly filled out, show error Toast 
        if (fnameInvalid || lnameInvalid || emailInvalid) { /*passwordInvalid) {  */      
            toast ({    
                addRole: true,
                title: "ITEMS IN RED ARE WRONG. Please try again.",
                position: 'top', 
                status: 'error',
                isClosable: true,
            });
        }
        else if (!emailsMatch) {
            toast ({    
                addRole: true,
                title: "The email addresses do not match. Please try again.",
                position: 'top', 
                status: 'error',
                isClosable: true,
            });
        }
        else if (!passwordsMatch) {
            toast ({    
                addRole: true,
                title: "The passwords do not match. Please try again.",
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

            navigateToHome();
        }
    }

    const passwordReqMessage = ("Passwords must contain:\nMinimum of 8 characters\nAt least one lowercase letter\nAt least one uppercase letter\nAt least one number");

    return (
        <><div className='Register' > 
            <Flex alignContent='center' justifyContent='center'>
                <Box title='register-form-box' id='regjster-form-box' bg='#000000' color='#fff' w='35rem' height='100%' m='2rem' p='1.5rem'> 
                    <VStack>
                        <Text fontSize='30px' fontWeight='bold' mb='1rem'> Register for an Account </Text>
                        <Input 
                            id='fname'
                            value={fname} 
                            onChange={handleFname} 
                            placeholder="first name (required)"
                        />
                        <Input 
                            id='lname'
                            value={lname} 
                            onChange={handleLname} 
                            placeholder="last name (required)"
                        />
                        <Input 
                            id='email'
                            type='email'
                            value={email} 
                            onChange={handleEmail} 
                            placeholder="enter email address"
                            mt='1rem'
                        />
                        <Input 
                            id='confirmEmail'
                            type='confirmEmail'
                            value={confirmEmail} 
                            onChange={handleConfirmEmail} 
                            placeholder="confirm email address"
                        />
                        <Input 
                            type='tel'
                            value={phone} 
                            onChange={handlePhone} 
                            placeholder="phone number (optional)"
                        />
                        <InputGroup mt='1rem'>
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
                                placeholder="confirm password"
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
                        <Text whiteSpace="pre-line"> {passwordReqMessage} </Text>
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
                            onClick={handleRegister} 
                            > 
                            Register
                        </Box>
                    </VStack>
                </Box>
            </Flex>
        </div></>
    );
};