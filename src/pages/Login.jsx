import {Stack, Box, Text, Flex, VStack, InputGroup, Input, InputRightElement, FormControl, FormLabel, FormErrorMessage, Center, useToast } from "@chakra-ui/react";
 import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth } from "../utils/firebase" 
// import {GoogleButton} from "react-google-button"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDataProvider } from "../components/dataProvider"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import {FacebookLoginButton, TwitterLoginButton, GoogleLoginButton, YahooLoginButton} from "react-social-login-buttons"; //npm i react-social-login-buttons
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, signInWithPopup, GoogleAuthProvider ,FacebookAuthProvider, TwitterAuthProvider, OAuthProvider} from "firebase/auth";
import { MdPhoneAndroid } from "react-icons/md";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";
import logtail from "../logger.js";

/* Login page - handle and validate user input, also checking against database for existing account and 
*              correct credentials. 
* Route to Register page if button is clicked
* Route to ForgotPassword page if button is clicked
*/
export const Login = ({saveData}) => {
   
    // const {setUserAccount} = useDataProvider();
    const toast = useToast();
    const navigate = useNavigate();
    const { getUserInfo , isUserInDatabase } = useDataProvider();
    const { register, handleSubmit, formState } = useForm();

    const [showPassword, setShowPassword] = React.useState(false)
    const handleShowPassword= () => setShowPassword(!showPassword)
   
    const navigateToRegister = () => {navigate("/register");}
    const navigateToResetPassword = () => {navigate("/forgotpassword");}
    
    const [isAuthenticationModalOpen, setIsAuthenticationModalOpen] = useState(false);
    const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
    const [phone, setPhone] = useState("");
    const [otp, setOTP] = useState(["", "", "", "", "","" ]);

    const [isVerificationCompleted, setIsVerificationCompleted] = useState(false);

useEffect(() => {
    if (!isVerificationModalOpen && isVerificationCompleted) {
   //     setOTP(["", "", "", "", "", ""]); // Reset OTP state
        setIsVerificationCompleted(false);
    }
}, [isVerificationModalOpen, isVerificationCompleted]);


const handleSubmitVerification = () => {
    verifyOTP();
    setIsVerificationCompleted(true);
    handleCloseVerificationModal();
};
    const handleOpenAuthenticationModal = () => {
      setIsAuthenticationModalOpen(true);
    };
  
    const handleCloseAuthenticationModal = () => {
      setIsAuthenticationModalOpen(false);
    //  setOTP(["", "", "", "", "", ""]); // Reset OTP state
       };
    
      const handleCloseVerificationModal = () => {
        setIsVerificationModalOpen(false);
      };

 
  const generateRecaptcha = () => {
    return new RecaptchaVerifier("recaptcha-container", {
      "size": "visible",
      "type": "image",
        "theme": "dark",
        "callback": () => {
            toast({
                title: "reCAPTCHA solved, allow signInWithPhoneNumber.",
                position: "top",
                status: "success",
                isClosable: true,
            });
            console.log("reCAPTCHA solved, allow signInWithPhoneNumber.");
            sendOTP();
        }
    }, auth);
  }
 
  const sendOTP = () => {
    logtail.info(`[PHONE:${phone}] Sending OTP to this number`);
  
    const appVerifier = generateRecaptcha();
    // Send OTP to the provided phone number
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then(confirmResult => {
        logtail.info(`[PHONE:${phone}] OTP sent successfully`);
        setIsAuthenticationModalOpen(false);
        setIsVerificationModalOpen(true);

        window.confirmationResult = confirmResult;
      }).catch(error => {
        // Handle error
        logtail.error(`[PHONE:${phone}] ${error.message}`);
      });
  }

  const verifyOTP = () => {
    console.log(otp.join(""));
    window.confirmationResult.confirm(otp.join(""))
      .then(result => {
        // OTP verification successful
        const user = result.user;
        if(user.emailVerified){
            getUserInfo(user);
               // Show success message and navigate to homepage
               toast({
                title: "OTP Login Successful.",
                position: "top",
                status: "success",
                isClosable: true,
            });
        
            navigate("/");
           
        }else{
                toast({
                    title: "User not registered. Please register or Verify email.",
                    position: "top",
                    status: "error",
                    isClosable: true,
                });
            }
}
        // Handle successful authentication
      ).catch(error => {
        // OTP verification failed
        logtail.error(error.message);
        // Handle failed authentication
      });
  }
  


    const handleYahooLogin = async () => {
        const auth = getAuth();
        const provider = new OAuthProvider("yahoo.com");
        
        try {

            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const inDatabase = await isUserInDatabase(user);
           
            //added extra check, users were logging in even when not in the database for social media users
           if(!inDatabase){
            auth.signOut(); //sign user out if not in database
            toast({
                title: "User not registered. Please register or Verify email.",
                position: "top",
                status: "error",
                isClosable: true,
             
            });

        }else{
     
            if(user.emailVerified){
            getUserInfo(user);
               // Show success message and navigate to homepage
               toast({
                title: "Yahoo Login Successful.",
                position: "top",
                status: "success",
                isClosable: true,
            });
        
            navigate("/");
           
        }else{
                toast({
                    title: "User not registered. Please register or Verify email.",
                    position: "top",
                    status: "error",
                    isClosable: true,
                });
            }
}
        } catch (error) {
            logtail.log(error.message);
        }
    }

    const handleFacebookLogin = async () => {
        const auth = getAuth();
        const provider = new FacebookAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
           
         //extra check made facebook fail
            if(user.emailVerified){
            getUserInfo(user);
               // Show success message and navigate to homepage
               toast({
                title: "Facebook Login Successful.",
                position: "top",
                status: "success",
                isClosable: true,
            });
            navigate("/");
           
        }else{
                toast({
                    title: "User not registered. Please register or Verify email.",
                    position: "top",
                    status: "error",
                    isClosable: true,
                });
            }

           
        } catch (error) {
            toast({
                title: "Account exists with different credentials. Use a different login method.",
                position: "top",
                status: "error",
                isClosable: true,
            });
        }
    }
    const handleTwitterLogin = async () => {
        const auth = getAuth();
        const provider = new TwitterAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
  
            if(user.emailVerified){
            getUserInfo(user);
               // Show success message and navigate to homepage
               toast({
                title: "Twitter Login Successful.",
                position: "top",
                status: "success",
                isClosable: true,
            });
            navigate("/");
           
        }else{
                toast({
                    title: "User not registered. Please register or Verify email.",
                    position: "top",
                    status: "error",
                    isClosable: true,
                });
            }
         
        } catch (error) {
            toast({
                title: "Account exists with different credentials. Use a different login method.",
                position: "top",
                status: "error",
                isClosable: true,
            });
        }
    }
    const handleGoogleLogin = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const inDatabase = await isUserInDatabase(user);
           
            //added extra check to verify that the user was in the database and not just authenticated
            //it went through without this check even when user was not in the database
            //checks if email is in the database
           if(!inDatabase){
            auth.signOut(); //sign user out if not in database
            toast({
                title: "User not registered. Please register or Verify email.",
                position: "top",
                status: "error",
                isClosable: true,
             
            });

        }else{
            if(user.emailVerified){
            getUserInfo(user);
               // Show success message and navigate to homepage
               toast({
                title: "Google Login Successful.",
                position: "top",
                status: "success",
                isClosable: true,
            });
            navigate("/");
        
        }else{
                toast({
                    title: "Logged in failed. Please verify your email before logging in.",
                    position: "top",
                    status: "error",
                    isClosable: true,
                });
            }
        }
        } catch (error) {
            logtail.log(error.message);
        }
    }


    const handleLogin = async (data) => {
        try {
            saveData(data);
        } catch (error) {console.log(error.message);}

        try {
            /**
             * Logging in with Firebase Authentication automatically handles the generation and management of JWT tokens. 
             * When the signInWithEmailAndPassword function is called, this function automatically handles token generation and management, 
             * and saves the user session on the client after successful login.
             */
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);

            // Login successful, Firebase automatically handles the session and token
            const userVerfied = userCredential.user;


            /**
             * Email authentication is required in order to log in, as the call to the createUserWithEmailAndPassword function 
             * will directly store the user's registration information in firebase authentication. 
             * Therefore, the. emailVerified field is very important to prevent someone from logging out without authentication 
             * after registering, and the next time they log in directly, they can successfully log in, which will be the outrageous situation.
             */
            if (userVerfied.emailVerified) {
                getUserInfo(userVerfied);
                // It is possible to obtain a token, but usually not required
                //const token = await userCredential.user.getIdToken();
    
                // Show success message and navigate to homepage
                toast({
                    title: "Logged in successfully.",
                    position: "top",
                    status: "success",
                    isClosable: true,
                });
                logtail.info(`[USER:${userVerfied.uid}] Login - successful`);
                navigate("/");

            }else{
                toast({
                    title: "Logged in failed. Please verify your email before logging in.",
                    position: "top",
                    status: "error",
                    isClosable: true,
                });
            }
            
        } catch (error) {
            // Login failed with error message
            toast({
                title: "Invalid login credentials.", //error.message, custom message for user friendliness
                position: "top",
                status: "error", 
                isClosable: true,
            });
            console.log(error.message);
        }
    };

 
        
    return ( 
    
        <>    
        
        <div><Modal isOpen={isAuthenticationModalOpen} onClose={handleCloseAuthenticationModal}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(-10deg)" />
        <ModalContent border="3px outset tan" marginTop="10%" bg="black" color="white"   fontFamily="'Raleway', sans-serif ">
          <ModalHeader textAlign="center">One-Time Password Authentication</ModalHeader>
          <ModalCloseButton />
          <ModalBody   pb={6}>
            <FormControl  > 
              <FormLabel fontFamily= "'Times New Roman', Times, serif" marginTop="2%"  textAlign="center"> Please Enter Phone Number</FormLabel>
             
           <Input  fontFamily= "'Times New Roman', Times, serif"
           marginTop="2%" bg="white" color="black" varient="outlined"
                country={"us"}
                onChange={(e) => setPhone("+1" + e.target.value)}
                 />
               
                  <Button _hover={{ transform: "translateY(-2px)"}} 
                  _active={{transform: "translateY(2px)"}}
                   border="3px outset tan" alignContent="left"
                    mb="8%" marginTop="10%" color="white" bg="black" marginLeft="70%" onClick={sendOTP}>Send OTP</Button>
                
                 <div id="recaptcha-container"></div>
               
            </FormControl>
            
          </ModalBody>
          <ModalFooter>
           
          </ModalFooter>
        </ModalContent>
      </Modal></div>

      <div>
    <Modal size="xl" isOpen={isVerificationModalOpen} onClose={handleCloseVerificationModal}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(-10deg)" />
        <ModalContent bg="black" borderRadius="25px" border="2.5px outset tan" color="white" fontFamily="Raleway, sans sarif"   >
          <ModalHeader  textAlign="center">One-Time Password Verification</ModalHeader>
          <ModalCloseButton />
          <ModalBody   pb={6}>
            <FormControl   >
          <FormLabel textAlign="center" marginTop="2%" fontWeight="bold">Please Enter One Time Password</FormLabel>
          {/* <Input border="2px outset tan"marginTop="5%" fontWeight="bold" value={otp}
              onChange={(e) => setOtp(e.target.value)}
           varient="outlined" placeholder="Enter OTP" /> */}
            
            <Flex direction="row"  >
    {otp.map((digit, index) => (
        <Input
            key={index}
            type="text"
            color="black"
            bg="white"
            value={digit}
            maxLength={1}
            width="100px"
            height="5em"
            margin="5px"
            padding="0"
            fontWeight="bold"
            fontSize="12px"
            fontFamily="Arial, sans-serif" // Alternative font: Arial"
            border="2.5px outset tan"
            marginTop="5%"
           
            onChange={(e) => {
                const value = e.target.value;
                console.log(value);
                setOTP((prevOTP) => {
                    const newOTP = [...prevOTP];
                    newOTP[index] = value;
                    return newOTP;
                });
                if (value && index < otp.length - 1) {
                    const nextInput = document.querySelector(`#otp-input-${index + 1}`);
                    if (nextInput) {
                        nextInput.focus();
                    }
                } else if (!value && index > 0) {
                    const prevInput = document.querySelector(`#otp-input-${index - 1}`);
                    if (prevInput) {
                        prevInput.focus();
                    }
                }
            }}
            id={`otp-input-${index}`}
        />
    ))}
</Flex>
                
          <Button marginTop="10%"
           _hover={{ transform: "translateY(-2px)"}} 
           _active={{transform: "translateY(2px)"}}
            border="2px outset tan" 
            marginLeft="70%"
             color="white" bg="black"
             
             onClick={handleSubmitVerification } >SUBMIT</Button>
          </FormControl>
          </ModalBody>
          <ModalFooter>
           
          </ModalFooter>
        </ModalContent>
      </Modal></div>
        <Center>
            <Box w={{base:"25em", sm:"30em", md:"35em"}}height="100%"  borderRadius="25px" bg="black" color="white" mt={{base:"7%", sm:"15%", md:"15%", lg:"12%", xl:"8%"}} mb={{base:"40%", sm:"35%", md:"20%", lg:"15%", xl:"10%"}}>
     <Tabs  borderRadius="25px" className="tab" border="tan 2px outset"  isFitted variant="enclosed" >
    <TabList >
        <Tab borderRightLeftRadius="25px" borderRightRadius="25px" borderTopLeftRadius="25px" _selected={{color:"white", transform: "translateY(-2px)", border:"outset 2px tan"}} color="tan" >SIGN IN</Tab>
        <Tab  borderBottomLeftRadius="25px" borderTopRightRadius="25px" borderTopLeftRadius="25px" _selected={{color:"white", transform: "translateY(-2px)", border:"outset 2px tan"}} color="tan">WITH SOCIAL MEDIA </Tab>
    </TabList>
    <TabPanels>
        <TabPanel height="35em"><form className="Login" title="login-form-box" onSubmit={handleSubmit(handleLogin)}> 
            <Flex alignContent="center" justifyContent="center">
                    <VStack>
                        <Text fontSize={{ base: "20px", md: "25px"}} 
                            fontWeight="bold" 
                            mb="1rem"> SIGN IN </Text>
                        
                        <FormControl id="emailField" isInvalid={!!formState?.errors?.email?.type}>
                            <FormLabel>Email Address</FormLabel>
                            <Input 
                                data-test="email-input"   
                                title="login-email"
                                id="email"
                                border="tan 2px outset"
                                {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/})}
                            />

                            <FormErrorMessage title="emailError">{"Email address is invalid or does not have an account associated with it"}</FormErrorMessage>

                        </FormControl>

                        <FormControl id="passwordField" isInvalid={!!formState?.errors?.password?.type}>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input 
                                    data-test="password-input"
                                    title="login-password"
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    border="tan 2px outset"
                                    w={{base:"20em", sm:"26em", md:"27em"}}
                                    {...register("password", { required: true, pattern: /(.|\s)*\S(.|\s)/})} //checks for whitespace
                                />
                                <InputRightElement width="4.5rem" h="48px">
                                    <Box  
                                        title="login-show-password-button"
                                        bg="#white" 
                                        color="black"
                                        w="3.5rem" 
                                        h="25px" 
                                        fontWeight="bold"
                                        fontSize="11px"
                                        borderRadius="md" 
                                        border="tan 2px outset"
                                        _hover={{ boxShadow: "0 0 5px 1px linen",transform: "translateY(-1px)" }}
                                        mb="9px"
                                        align="center"
                                        pt="0.25rem" 
                                        onClick={handleShowPassword} 
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </Box>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>{"Incorrect password"}</FormErrorMessage>
                        </FormControl>
                    
                        <Center 
                            title="login-forgot-password"
                            color="#fff"
                            fontWeight="bold"
                            alignSelf="end"
                            fontSize="11px"
                            h="40px"
                            w="50%"
                            margin="2%"
                            border="tan 2px outset"
                            _hover={{ boxShadow: "0 0 5px 1px linen",transform: "translateY(-2px)" }}
                            onClick={navigateToResetPassword} 
                            data-test="forgot-password"
                            > 
                            Forgot Password?
                        </Center>
                          
                        <Box 
                            title="login-login-button"
                            as="button"  
                            mt="10%"
                            _hover={{ boxShadow: "0 0 5px 1px linen",transform: "translateY(-2px)" }}
                            color="white"
                            h="40px"
                            w="70%"
                            fontWeight="bold"
                            fontSize="12px"
                            border="tan 2px outset"
                            bg="black"
                            borderRadius="md"
                            _active={{transform: "translateY(2px)", bg:"white",boxShadow: "inset  1px 1px 5px 2px rgba(210, 180, 140, 0.9)",backgroundImage: "linear-gradient(rgb(0 0 0/90%) 0 0)"}}
                            data-test="submit"
                            > 
                            CONTINUE
                        </Box>
                        <Center 
                            _hover={{ boxShadow: "0 0 5px 1px linen" , transform: "translateY(-2px)"}} //when hovered over button will glow and move upward
                            border="tan 2px outset"
                            title="login-register-button"
                            mt="0.5rem"
                            color="white"
                            h="40px"
                            w="70%"
                            fontWeight="bold"
                            fontSize="12px"
                            borderRadius="md"
                            bg="black"
                            _active={{transform: "translateY(2px)", bg:"white",boxShadow: "inset  1px 1px 5px 2px rgba(210, 180, 140, 0.9)",backgroundImage: "linear-gradient(rgb(0 0 0/90%) 0 0)"}}
                            onClick={navigateToRegister} 
                            data-test="register-button"
                            > 
                            REGISTER
                        </Center>  
                    </VStack>
             
            </Flex>
        </form>
        
       </TabPanel>
                                <TabPanel height="35em">
                                <Flex alignContent="center" justifyContent="center">
                            <VStack mt="6em" >
                             <Box width="100%" _hover={{ transform: "translateY(-2px)"}} _active={{transform: "translateY(2px)"}} data-test="google-login-button"   onClick={handleGoogleLogin} ><GoogleLoginButton  /></Box>
                              <Box data-test="OTP-Button" width="95%" borderRadius="3px" background= "linear-gradient(to right, tan, white, tan)" height="50px" _hover={{ transform: "translateY(-2px)" }} _active={{ transform: "translateY(2px)" }} onClick={handleOpenAuthenticationModal} as="button" display="flex" paddingLeft="5px" alignItems="center"  fontSize="18px" color="black"> <MdPhoneAndroid color="white" size={33} style={{ marginRight: "1em" }} /> <p>Login With Phone</p></Box>
                             <Box data-test="Facebook-login-button"  width="100%" _hover={{ transform: "translateY(-2px)"}} _active={{transform: "translateY(2px)"}}   onClick={handleFacebookLogin}><FacebookLoginButton  /></Box>
                             <Box data-test="Yahoo-login-button" width="100%" _hover={{ transform: "translateY(-2px)"}} _active={{transform: "translateY(2px)"}}   onClick={handleYahooLogin} ><YahooLoginButton  /></Box>
                                   <Box data-test="Twitter-login-button" width="100%" _hover={{ transform: "translateY(-2px)"}}_active={{transform: "translateY(2px)"}} onClick={handleTwitterLogin}><TwitterLoginButton    /></Box>
                          
                                    </VStack>
                               </Flex> </TabPanel>
                            </TabPanels>
                            </Tabs></Box></Center>
                            
                         
                         
                            </> 
                             );
};  
                            
