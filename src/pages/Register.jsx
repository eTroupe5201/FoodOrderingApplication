import React, {useState, } from "react";
import {Divider, SimpleGrid, Center, Box, Text, Flex, VStack, InputGroup, Input, InputRightElement, FormControl, FormLabel, FormErrorMessage, useToast} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {  set, useForm } from "react-hook-form";
import { useDataProvider } from "../components/dataProvider"
import { auth } from "../utils/firebase"   
import { sendEmailVerification} from "firebase/auth";
import {FcGoogle} from "react-icons/fc";
import { FaTwitter} from "react-icons/fa";
import { AiFillFacebook,  AiFillYahoo} from "react-icons/ai";
import { InstructionsModal } from "../components/InstructionsModal";
import { RegisterYahooUser } from "../components/RegisterYahooUser";
import { RegisterTwitterUser } from "../components/RegisterTwitterUser";
import { RegisterGoogleUser } from "../components/RegisterGoogleUser";
import { RegisterFacebookUser } from "../components/RegisterFacebookUser";
import { RegisterEmailAndPasswordUser } from "../components/RegisterEmailAndPasswordUser";
import logtail from "../logger.js";

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
    const [fromSocialMedia, setFromSocialMedia] = useState(false);
    const [formdata, setformData] = useState(null);
    const [fromOTP, setFromOTP] = useState(false);
    const [registrationState, setRegistrationState] = useState("initial");
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const handleShowPassword= () => setShowPassword(!showPassword)
    const handleShowConfirmPassword= () => setShowConfirmPassword(!showConfirmPassword)
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const [isInstructionsModalOpen, setInstructionsModalOpen] = React.useState(false);
 
    const handleInstructionsModalOpen = () => {
      setInstructionsModalOpen(true);
    };

    const handleInstructionsModalClose = () => {
      setInstructionsModalOpen(false);
    };

    const handleYahooRegister = async () => {
        setFromOTP(false);
        RegisterYahooUser(setFromOTP, setFromSocialMedia, setRegistrationState, toast); // assuming you have these variables defined in your register component
        handleInstructionsModalOpen();
     }

    const handleTwitterRegister = async () => {
        setFromOTP(false);
        RegisterTwitterUser(setFromOTP, setFromSocialMedia, setRegistrationState, toast); // assuming you have these variables defined in your register component
        handleInstructionsModalOpen();
     }

    const handleGoogleRegister = async () => {
        setFromOTP(false);
        RegisterGoogleUser(setFromOTP, setFromSocialMedia, setRegistrationState, toast); // assuming you have these variables defined in your register component
        handleInstructionsModalOpen();
     }

    const handleFacebookRegister = async () => {
        RegisterFacebookUser(setFromOTP, setFromSocialMedia, setRegistrationState, toast); // assuming you have these variables defined in your register component
        handleInstructionsModalOpen();     
    }

    const handleRegister = async (data) => {
        RegisterEmailAndPasswordUser(setFromOTP, saveData, setformData, data, setFromSocialMedia, setRegistrationState, toast); // assuming you have these variables defined in your register component
        handleInstructionsModalOpen();
    }

 


  

  

    const handleResendVerificationEmail = async (event) => {
        try {
            //reload user created with initial authorization attempt 
            const user = auth.currentUser;
            await user.reload(); 

            //will throw an error if resent too soon (approx 1 min from previous attempt)
            await sendEmailVerification(user);

            toast({
                title: "Email has been resent to be verified!",
                description: "Please check your email to verify your account.",
                position: "top",
                status: "success",
                isClosable: true,
            });
        } catch (error) {
            console.error("Error registering account:", error);
            toast({
                title: "An email is already on the way",
                description: "Please click the 'Resend Email' button if you did not receive an email after 1-3 minutes." + error.message,
                position: "top",
                status: "error",
                isClosable: true,
            });
        }
    };

  // Logic for handling whether the user has verified their email
    const handleCheckEmailVerified = async (event) => {
        console.log("checking verification status to store account info"); //console log for testing 
        // Block default form submission behavior
        event.preventDefault();

        const user = auth.currentUser;
        await user.reload(); // Reload user status to obtain the latest email verification status
        console.log("user in handleCheckEmailVerified: ", user)

        
        if (user.emailVerified) {
            logtail.info("Email verified", {fbUser: user.uid, email: user.email});  
            console.log("Email verified:", user.emailVerified);
            try {
              if(fromSocialMedia){
            //  console.log("social media user:", socialMediaUser);
                // Extract necessary user information
        const { email, displayName, phoneNumber } = user;
        const [firstName, lastName] = displayName.split(" ");
        
        const socialMediaUser = {  email: email,
            firstName: firstName,
            lastName: lastName,
            phone: phoneNumber}

        // Call the Cloud Function and pass user data
        const result = await registerNewAccount(socialMediaUser);
        //const result = await registerNewAccount(socialMediaUser);
             if (result.success) {
                toast({
                    title: "Account created",
                    description: "Your account has been created successfully.",
                    position: "top",
                    status: "success",
                    isClosable: true,
                });
                navigate("/login"); 
              }}
              else if(fromOTP){
                const { email, phoneNumber} = user;
                const OTP_user = {  
                    email: email,
                    firstName: "",
                    lastName: "",
                    phone: phoneNumber}

                const result = await registerNewAccount(OTP_user); 
                if (result.success) {
                    toast({
                        title: "Account created",
                        description: "Your account has been created successfully.",
                        position: "top",
                        status: "success",
                        isClosable: true,
                    });
                    navigate("/login"); 
                }else{
                    toast({
                        title: "Registration failed",
                        description: "Please try again.",
                        position: "top",
                        status: "error",
                        isClosable: true,
                    });
                }
                
              }else{
                /*
                We will only call the cloud function to store the user"s personal information without password
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
            } }catch (error) {
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
    and the button will change from register to verified waiting for the user"s email verification
    */
    let buttonContent;
    if (registrationState === "initial") {
        buttonContent = (
            <Box 
                title="register-register-button"
                align="center"
                as="button" 
                pt="0.25rem" 
                mt="0.5rem"
                bg="black" 
                color="white"
                h="40px"
                w="250px"
                fontWeight="bold"
                fontSize="15px"
                _hover={{ boxShadow: "0 0 5px 1px tan" }}
                border="outset 2px tan"
                borderRadius="md"
                _active={{transform: "translateY(2px)", bg:"white",boxShadow: "inset  1px 1px 5px 2px rgba(210, 180, 140, 0.9)",backgroundImage: "linear-gradient(rgb(0 0 0/90%) 0 0)"}}
                type="submit"
                data-test="register"
                > 
                Register
            </Box>
        );
    } else if (registrationState === "waitingForEmailVerification") {
        buttonContent = (
            <>  
            <InstructionsModal isOpen={isInstructionsModalOpen} onClose={handleInstructionsModalClose}/>
            <Box 
                title="register-verified-button"
                align="center"
                as="button" 
                pt="0.25rem" 
                mt="0.5rem"
                bg="white" 
                color="black"
                h="40px"
                w="250px"
                fontWeight="bold"
                fontSize="15px"
                _hover={{ boxShadow: "0 0 5px 1px tan" }}
                border="outset 2px tan"
                borderRadius="md"
                _active={{boxShadow: "inset  1px 1px 5px 2px rgba(210, 180, 140, 0.9)", transform: "translateY(2px)"}}
                onClick={handleCheckEmailVerified}
                type="button" // Distinguished from type=submit, it is just a button event to prevent form submission
                data-test="complete-verification"
                > 
               COMPLETE VERIFICATION
            </Box>
            <Box 
                title="resend-verification-email-button"
                align="center"
                as="button" 
                pt="0.25rem" 
                mt="0.5rem"
                bg="white" 
                color="black"
                h="40px"
                w="250px"
                fontWeight="bold"
                fontSize="15px"
                _hover={{ boxShadow: "0 0 5px 1px tan" }}
                border="outset 2px tan"
                borderRadius="md"
                _active={{boxShadow: "inset  1px 1px 5px 2px rgba(210, 180, 140, 0.9)", transform: "translateY(2px)"}}
                onClick={handleResendVerificationEmail}
                type="button" // Distinguished from type=submit, it is just a button event to prevent form submission
            > 
           RESEND EMAIL
        </Box></>
        );
      

    }

    return (
        <>
        <form className="Register" onSubmit={handleSubmit(handleRegister)}> 
            <Flex  mb="5em" alignContent="center" justifyContent="center">
                <Box border="outset 2px tan" borderRadius="25px"
                 title="register-form-box" id="register-form-box" bg="#000000" 
                 color="#fff" w={{base:"25em", sm:"30em", md:"35em"}} height="100%" m="2rem" p="2rem"> 
                   
                    <VStack>
                        <Text fontSize="20px" fontWeight="bold" mb="1rem"> REGISTER </Text>                        
                        <FormControl id="fnameField" isInvalid={!!formState?.errors?.firstName?.type}>
                            <FormLabel>First Name</FormLabel>
                            <Input 
                                data-test="first-name-input"
                                id="firstName"
                                title="register-first-name"
                                {...register("firstName", { required: true, pattern:/(^[a-zA-Z,"-][a-zA-Z\s,"-]{0,20}[a-zA-Z]$)/})}
                            />
                            <FormErrorMessage>Required</FormErrorMessage>
                        </FormControl>
                        <FormControl id="lnameField" isInvalid={!!formState?.errors?.lastName?.type}>
                            <FormLabel>Last Name</FormLabel>
                            <Input 
                                data-test="last-name-input"
                                id="lastName"
                                title="register-last-name"
                                {...register("lastName", { required: true, pattern:/(^[a-zA-Z,"-][a-zA-Z\s,"-]{0,20}[a-zA-Z]$)/ })}
                            />
                            <FormErrorMessage>Required</FormErrorMessage>
                        </FormControl>
                        <FormControl id="emailField" isInvalid={!!formState?.errors?.email?.type || !emailsMatch}>
                            <FormLabel >Email Address</FormLabel>
                            <Input 
                                data-test="email-input"
                                id="email"
                                title="register-email"
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
                        <FormControl id="confirmEmailField" isInvalid={!!formState?.errors?.confirmEmail?.type || !emailsMatch}>
                        <FormLabel>Confirm Email Address</FormLabel>
                            <Input 
                                data-test="confirm-email-input"
                                id="confirmEmail"
                                title="register-confirm-email"
                                type="confirmEmail"
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
                        <FormControl id="phoneField" >
                            <FormLabel>Phone Number (optional)</FormLabel>
                            <Input 
                                data-test="phone-input"
                                type="tel"
                                title="register-phone"
                                {...register("phone")}
                            />
                        </FormControl>
                        <FormControl id="addressField" >
                            <FormLabel>Address (optional)</FormLabel>
                            <Input
                                data-test="address-input" 
                                type="text"
                                title="register-address"
                                {...register("address")}
                            />
                        </FormControl>
                        
                        <FormControl id="passwordField" isInvalid={!!formState?.errors?.password?.type || !passwordsMatch}>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input 
                                    data-test="password-input"
                                    id="password"
                                    title="register-password"
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
                                <InputRightElement width="4.5rem" h="48px">
                                    <Box  
                                        title="show-password-button"
                                        bg="white" 
                                        mb="9px"
                                        color="black"
                                        w="3.5rem" 
                                        h="25px" 
                                        fontWeight="bold"
                                        fontSize="11px"
                                        _hover={{ boxShadow: "0 0 5px 1px tan" }}
                                        border="tan 2px outset" 
                                        borderRadius="md" 
                                        align="center"
                                        pt="0.25rem" 
                                        onClick={handleShowPassword} 
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </Box>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>{passwordErrorMsg}</FormErrorMessage>
                        </FormControl>

                        <FormControl id="confirmPasswordField" isInvalid={!!formState?.errors?.confirmPassword?.type || !passwordsMatch}>
                            <FormLabel>Confirm Password</FormLabel>
                            <InputGroup>
                                <Input 
                                    data-test="confirm-password-input"
                                    id="confirmPassword"
                                    title="register-confirm-password"
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
                                <InputRightElement width="4.5rem" h="48px">
                                    <Box 
                                        title="show-confirm-password-button"
                                        border="tan 2px outset"
                                        bg="white" 
                                        mb="9px"
                                        color="black"
                                        w="3.5rem" 
                                        h="25px" 
                                        fontWeight="bold"
                                        fontSize="11px"
                                        _hover={{ boxShadow: "0 0 5px 1px tan" }} 
                                        borderRadius="md" 
                                        align="center"
                                        pt="0.25rem" 
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
                        <Divider  margin="20px" orientation="horizontal"/>
                   
                        <Center >
                           <SimpleGrid columns={5}>
                            
                           <Box _active={{ bg: "rgba(255, 255, 255, 0.9)", transform: "translateY(2px)"}} bg="white" padding="5px"borderRadius="10px"_hover={{ boxShadow: "0 0 5px 1px tan" }}  margin="10px"border="3px tan outset"onClick={handleGoogleRegister} ><FcGoogle  size="35px"  /></Box>
                            <Box _active={{ bg: "rgba(255, 255, 255, 0.9)", transform: "translateY(2px)"}} bg="white" padding="5px"borderRadius="10px"_hover={{ boxShadow: "0 0 5px 1px tan" }}  margin="10px"border="3px tan outset" onClick={handleFacebookRegister}><AiFillFacebook size="35px" color="#4267B2" /></Box>
                            <Box _active={{ bg: "rgba(255, 255, 255, 0.9)", transform: "translateY(2px)"}}bg="white" padding="5px"borderRadius="10px"_hover={{ boxShadow: "0 0 5px 1px tan" }}  margin="10px"border="3px tan outset" onClick={handleTwitterRegister}><FaTwitter  size="35px" color="#1DA1F2"  /></Box>
                            <Box _active={{ bg: "rgba(255, 255, 255, 0.9)", transform: "translateY(2px)"}}bg="white" padding="5px"borderRadius="10px"_hover={{ boxShadow: "0 0 5px 1px tan" }}  margin="10px"border="3px tan outset" onClick={handleYahooRegister}>< AiFillYahoo size="35px" color="#1DA1F2"  /></Box>
                           
                           </SimpleGrid> 
                            </Center>
                    </VStack>
                </Box>
            </Flex>
        </form>
        </>
    );
};