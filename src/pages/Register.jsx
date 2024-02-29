import React, {useState, useEffect} from "react";
import { Box, Text, Flex, VStack, InputGroup, Input, InputRightElement, FormControl, FormLabel, FormErrorMessage, useToast} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDataProvider } from "../components/dataProvider"
import { auth } from "../utils/firebase" 
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

/* Register page - use React hook Forms for collecting input and validating. Once validated and submitted, send request to Firebase and:
*   - if account exists with provided email, route to Login page
*   - if no account exists with provided email, create account and store user info in DB. Upon return, route back to Home page
*/
export const Register = ({saveData}) => {
    const toast = useToast();
    const navigate = useNavigate();
    const { registerNewAccount } = useDataProvider();
    const { register, handleSubmit, formState, watch } = useForm();

    const [emailErrorMsg, setEmailErrorMsg]= useState("Required. Enter a valid email address.");
    const [passwordErrorMsg, setPasswordErrorMsg]= useState("Required. See password requirements below.");
    const [emailsMatch, setEmailsMatch] = useState(true);
    const [passwordsMatch, setPasswordsMatch]= useState(true);

    const [formdata, setformData] = useState(null);
    const [registrationState, setRegistrationState] = useState("initial");

    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const handleShowPassword= () => setShowPassword(!showPassword)
    const handleShowConfirmPassword= () => setShowConfirmPassword(!showConfirmPassword)
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    const handleRegister = async (data) => {

        setformData(data);

        try {
            saveData(data);
        } catch (error) {console.log(error);}

        // Verify email and password match
        if (data.email !== data.confirmEmail || data.password !== data.confirmPassword) {
            toast({
                title: "Error",
                description: "Emails or passwords do not match.",
                position: "top",
                status: "error",
                isClosable: true,
            });
            return;
        }

        try {
            /**
             * Create users and send verification emails
             * In Firebase, the default validity period for email verification links sent to users is 24 hours. 
             * This means that users have 24 hours after receiving the email to click on the verification link 
             * to complete their email verification process. If the user does not click on the verification link during this period, 
             * the link will expire and the user needs to request a new verification email to complete the verification process.
             */ 
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await sendEmailVerification(userCredential.user);
            toast({
                title: "Email has sent to be verified!",
                description: "Please check your email to verify your account.",
                position: "top",
                status: "success",
                isClosable: true,
            });
            // Update the status to reflect waiting for email verification. 
            // When the user first clicks register button and sends an email, the button will change from register to verified status
            setRegistrationState("waitingForEmailVerification");
        } catch (error) {
            console.error("Error registering account:", error);
            toast({
                title: "Registration failed",
                description: error.message,
                position: "top",
                status: "error",
                isClosable: true,
            });
        }

    }

    // Logic for handling whether the user has verified their email
    const handleCheckEmailVerified = async (event) => {
        // Block default form submission behavior
        event.preventDefault();

        const user = auth.currentUser;
        await user.reload(); // Reload user status to obtain the latest email verification status

        if (user.emailVerified) {
            console.log("Email verified:", user.emailVerified);
            try {
                /*
                We will only call the cloud function to store the user's personal information without password
                and redirect to the login page when our email authentication is passed
                */
                const result = await registerNewAccount(formdata); 
                if (result.success) {
                    toast({
                        title: "Account created",
                        description: "Your account has been created successfully.",
                        position: "top",
                        status: "success",
                        isClosable: true,
                    });
                    navigate("/login"); 
                }
            } catch (error) {
                console.error("Error calling registerNewAccount:", error);
                toast({
                    title: "Registration failed",
                    description: error.message,
                    position: "top",
                    status: "error",
                    isClosable: true,
                });
            }
        } else {
            toast({
                title: "Email not verified",
                description: "Please verify your email before continuing.",
                position: "top",
                status: "warning",
                isClosable: true,
            });
        }
    };

    /*
    The default email authentication is sent for form submission, 
    and the button will change from register to verified waiting for the user's email verification
    */
    let buttonContent;
    if (registrationState === 'initial') {
        buttonContent = (
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
                type="submit"
                > 
                Register
            </Box>
        );
    } else if (registrationState === "waitingForEmailVerification") {
        buttonContent = (
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
                onClick={handleCheckEmailVerified}
                type="button" // Distinguished from type=submit, it is just a button event to prevent form submission
                > 
                Verfied
            </Box>
        );
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
                                {...register("email", { 
                                    required: true,
                                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    validate: (val) => {
                                        if (watch("confirmEmail") != val) {
                                            setEmailErrorMsg("Email addresses do not match.");
                                            setEmailsMatch(false);
                                        } 
                                        else {
                                            setEmailErrorMsg("Required. Enter a valid email address.");
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
                                        pattern: passwordPattern,//eight char, one upper, one lower, one num
                                        validate: (val) => {
                                            if (watch("confirmPassword") != val) {
                                                setPasswordErrorMsg("Passwords do not match.");
                                                setPasswordsMatch(false);
                                            } 
                                            else {
                                                setPasswordErrorMsg("Required. Enter a valid email address.");
                                                setPasswordsMatch(true);
                                            }    
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
                                        pattern: passwordPattern,
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
                        {buttonContent}
                    </VStack>
                </Box>
            </Flex>
        </form></>
    );
};