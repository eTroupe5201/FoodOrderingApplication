import React, {useState} from "react";
import { Box, Text, Flex, VStack, InputGroup, Input, InputRightElement, FormControl, FormLabel, FormErrorMessage, useToast} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDataProvider } from "../components/dataProvider"


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

    const handleRegister = async (data) => {

        // try {
        //     saveData(data);
        // } catch (error) {} //console.log("This is a test call - will throw error in dev/prod")};

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
                            <FormErrorMessage>{passwordErrorMsg}</FormErrorMessage>
                        </FormControl>

                        <Text mt="10px" lineHeight="5"textAlign="center" padding="20px" textTransform="uppercase" fontSize="12px" fontStyle="italic"> 
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
                </Box>
            </Flex>
        </form></>
    );
};