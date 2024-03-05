import React, {useState, useEffect} from "react";
import {Divider, SimpleGrid, Center, Box, Text, Flex, VStack, InputGroup, Input, InputRightElement, FormControl, FormLabel, FormErrorMessage, useToast} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {  useForm } from "react-hook-form";
import { useDataProvider } from "../components/dataProvider"
import { auth } from "../utils/firebase" 
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import {FcGoogle} from "react-icons/fc";
import { FaTwitter} from "react-icons/fa";
import { AiFillFacebook,  AiFillYahoo} from "react-icons/ai";
// import { MdPhoneAndroid } from "react-icons/md";
import { getAuth, OAuthProvider, signInWithPopup, GoogleAuthProvider ,FacebookAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";


/* Register page - use React hook Forms for collecting input and validating. Once validated and submitted, send request to Firebase and:
*   - if account exists with provided email, route to Login page
*   - if no account exists with provided email, create account and store user info in DB. Upon return, route back to Home page
*/
export const Register = ({saveData}) => {
    const toast = useToast();
    const navigate = useNavigate();
    const { registerNewAccount } = useDataProvider();
    const { register, handleSubmit, formState, watch } = useForm();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [emailErrorMsg, setEmailErrorMsg]= useState("Required. Enter a valid email address.");
    const [passwordErrorMsg, setPasswordErrorMsg]= useState("Required. See password requirements below.");
    const [emailsMatch, setEmailsMatch] = useState(true);
    const [passwordsMatch, setPasswordsMatch]= useState(true);

    const [fromSocialMedia, setFromSocialMedia] = useState(false);
    const [formdata, setformData] = useState(null);
    const [registrationState, setRegistrationState] = useState("initial");

    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const handleShowPassword= () => setShowPassword(!showPassword)
    const handleShowConfirmPassword= () => setShowConfirmPassword(!showConfirmPassword)
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
 
    useEffect(() => {
        if (registrationState === "waitingForEmailVerification") {
            onOpen();
        }
    }, [registrationState, onOpen]);
    
   
    const handleYahooRegister = async () => {
        setFromSocialMedia(true);
           try{  
           const auth = getAuth();
         
           const provider = new OAuthProvider("yahoo.com");
    
             const result = await signInWithPopup(auth, provider);
             const userForVerification = result.user;
 
               toast({
                   title: "Email has sent to be verified!",
                   description: "Please check your email to verify your account.",
                   position: "top",
                   status: "success",
                   isClosable: true,
               });
                
        await sendEmailVerification(userForVerification);
        setRegistrationState("waitingForEmailVerification");   
        
                 }  catch (error) {
                     console.error("Error registering facebook account:", error);
                     toast({
                         title: "Registration for facebook user failed",
                         description: error.message,
                         position: "top",
                         status: "error",
                         isClosable: true,
                     });
         
             }
     }

    const handleTwitterRegister = async () => {
        setFromSocialMedia(true);
           try{  
           const auth = getAuth();
         
             const provider = new TwitterAuthProvider();
             provider.setCustomParameters({
             "display": "popup"
             });
             const result = await signInWithPopup(auth, provider);
             const userForVerification = result.user;
 
               toast({
                   title: "Email has sent to be verified!",
                   description: "Please check your email to verify your account.",
                   position: "top",
                   status: "success",
                   isClosable: true,
               });
                
        await sendEmailVerification(userForVerification);
        setRegistrationState("waitingForEmailVerification");   
        
                 }  catch (error) {
                     console.error("Error registering twitter account:", error);
                     toast({
                         title: "Registration for twitter user failed",
                         description: error.message,
                         position: "top",
                         status: "error",
                         isClosable: true,
                     });
         
             }
     }
        
    const handleGoogleRegister = async () => {
        setFromSocialMedia(true);
           try{  
           const auth = getAuth();
         
             const provider = new GoogleAuthProvider();
             
             provider.setCustomParameters({ prompt: "select_account" }); // Force account selection prompt
   
             const result = await signInWithPopup(auth, provider);
             const userForVerification = result.user;
 
               toast({
                   title: "Email has sent to be verified!",
                   description: "Please check your email to verify your account.",
                   position: "top",
                   status: "success",
                   isClosable: true,
               });
                
        await sendEmailVerification(userForVerification);
        setRegistrationState("waitingForEmailVerification");      
        
                 }  catch (error) {
                     console.error("Error registering facebook account:", error);
                     toast({
                         title: "Registration for google user failed",
                         description: error.message,
                         position: "top",
                         status: "error",
                         isClosable: true,
                     });
         
             }
     }

    const handleFacebookRegister = async () => {
       setFromSocialMedia(true);
          try{  
          const auth = getAuth();
        
            const provider = new FacebookAuthProvider();
            provider.setCustomParameters({
            "display": "  "
            });
            const result = await signInWithPopup(auth, provider);
            const userForVerification = result.user;

              toast({
                  title: "Email has sent to be verified!",
                  description: "Please check your email to verify your account.",
                  position: "top",
                  status: "success",
                  isClosable: true,
              });
               
       await sendEmailVerification(userForVerification);
       setRegistrationState("waitingForEmailVerification");   
                   
       
                }  catch (error) {
                    console.error("Error registering facebook account:", error);
                    toast({
                        title: "Registration for facebook user failed",
                        description: error.message,
                        position: "top",
                        status: "error",
                        isClosable: true,
                    });
        
            }
    }

 

    const handleRegister = async (data) => {
        setFromSocialMedia(false);
        setformData(data);
        
        try {
            saveData(data);
        } catch (error) {console.log(error);}

        // Verify email and password match
        if (data.email !== data.confirmEmail || data.password !== data.confirmPassword) {
            console.log("passwords or emails do not match"); //console log for testing
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
            console.log("valid registration input"); //console log for testing
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
        console.log("checking verification status to store account info"); //console log for testing 
        // Block default form submission behavior
        event.preventDefault();

        const user = auth.currentUser;
        await user.reload(); // Reload user status to obtain the latest email verification status
        console.log("user in handleCheckEmailVerified: ", user)

      
        if (user.emailVerified) {
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
              }}else{
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
                > 
                Register
            </Box>
        );
    } else if (registrationState === "waitingForEmailVerification") {
        buttonContent = (
            <>    <Modal  transition="3s" motionPreset="scale" onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(-10deg)" />
              <ModalContent padding="20px" border="2px solid tan" fontFamily="'Raleway', sans-serif" borderRadius="25px" bg="black" color="white" >
                <ModalHeader textAlign="center">REGISTRATION INSTRUCTIONS</ModalHeader>
                <ModalCloseButton />
                <ModalBody  fontWeight="bold"  borderRadius="25px" textAlign="center" padding="20px" border="2px solid tan" pb={6}>
                    <p>Kindly review your email and proceed by clicking the verification button.</p>
                   <br></br>
                    <p> Close this window to continue.</p>
                  <br></br>
                    <p> To finalize the verification process, click on the &quoComplete Registration&quo button on the webpage.</p>
                </ModalBody>
                <ModalFooter><Button color="white" bg="black" border="2px solid tan" mr={3} onClick={onClose}>
        Close
      </Button>  </ModalFooter>
        </ModalContent>
        </Modal>
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
                > 
               COMPLETE VERIFICATION
            </Box></>
        );
      

    }

    return (
        <><form className="Register" onSubmit={handleSubmit(handleRegister)}> 
            <Flex  mb="5em" alignContent="center" justifyContent="center">
                <Box border="outset 2px tan" borderRadius="25px"
                 title="register-form-box" id="register-form-box" bg="#000000" 
                 color="#fff" w={{base:"25em", sm:"30em", md:"35em"}} height="100%" m="2rem" p="2rem"> 
                   
                    <VStack>
                        <Text fontSize="20px" fontWeight="bold" mb="1rem"> REGISTER </Text>                        
                        <FormControl id="fnameField" isInvalid={!!formState?.errors?.firstName?.type}>
                            <FormLabel>First Name</FormLabel>
                            <Input 
                                id="firstName"
                                title="register-first-name"
                                {...register("firstName", { required: true, pattern:/(^[a-zA-Z,"-][a-zA-Z\s,"-]{0,20}[a-zA-Z]$)/})}
                            />
                            <FormErrorMessage>Required</FormErrorMessage>
                        </FormControl>
                        <FormControl id="lnameField" isInvalid={!!formState?.errors?.lastName?.type}>
                            <FormLabel>Last Name</FormLabel>
                            <Input 
                                id="lastName"
                                title="register-last-name"
                                {...register("lastName", { required: true, pattern:/(^[a-zA-Z,"-][a-zA-Z\s,"-]{0,20}[a-zA-Z]$)/ })}
                            />
                            <FormErrorMessage>Required</FormErrorMessage>
                        </FormControl>
                        <FormControl id="emailField" isInvalid={!!formState?.errors?.email?.type || !emailsMatch}>
                            <FormLabel >Email Address</FormLabel>
                            <Input 
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
                                type="tel"
                                title="register-phone"
                                {...register("phone")}
                            />
                        </FormControl>
                        <FormControl id="addressField" >
                            <FormLabel>Address (optional)</FormLabel>
                            <Input 
                                type="text"
                                title="register-address"
                                {...register("address")}
                            />
                        </FormControl>
                        
                        <FormControl id="passwordField" isInvalid={!!formState?.errors?.password?.type || !passwordsMatch}>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input 
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
                            {/* <Box _active={{ bg: "rgba(255, 255, 255, 0.9)", transform: "translateY(2px)"}}bg="white" padding="5px"borderRadius="10px"_hover={{ boxShadow: "0 0 5px 1px tan" }} color="black" margin="10px"border="3px tan outset" onClick={handlePhoneLogin} ><MdPhoneAndroid textAlign="center" size={35} /></Box>
                          */}
                           </SimpleGrid> 
                            </Center>
                    </VStack>
                </Box>
            </Flex>
        </form>
        </>
    );
};