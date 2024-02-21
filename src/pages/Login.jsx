import { Box, Text, Flex, VStack, InputGroup, Input, InputRightElement, FormControl, FormLabel, FormErrorMessage, Center, useToast } from "@chakra-ui/react";
 import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth } from "../utils/firebase" 
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDataProvider } from "../components/dataProvider"

/* Login page - handle and validate user input, also checking against database for existing account and 
*              correct credentials. 
* Route to Register page if button is clicked
* Route to ForgotPassword page if button is clicked
*/
export const Login = ({saveData}) => {
    // const {setUserAccount} = useDataProvider();
    const toast = useToast();
    const navigate = useNavigate();
    const { getUserInfo } = useDataProvider();
    const { register, handleSubmit, formState } = useForm();

    const [showPassword, setShowPassword] = React.useState(false)
    const handleShowPassword= () => setShowPassword(!showPassword)

    const navigateToRegister = () => {navigate("/register");}
    const navigateToResetPassword = () => {navigate("/forgotpassword");}

    const handleLogin = async (data) => {
        try {
            saveData(data);
        } catch (error) {console.log(error);}

        try {
            console.log(data);
            /**
             * Logging in with Firebase Authentication automatically handles the generation and management of JWT tokens. 
             * When the signInWithEmailAndPassword function is called, this function automatically handles token generation and management, 
             * and saves the user session on the client after successful login.
             */
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
    
            // Login successful, Firebase automatically handles the session and token
            console.log("Logged in user:", userCredential.user);

            getUserInfo(userCredential.user);

            // It is possible to obtain a token, but usually not required
            //const token = await userCredential.user.getIdToken();
            //console.log(token);

            // Show success message and navigate to homepage
            toast({
                title: "Logged in successfully.",
                position: "top",
                status: "success",
                isClosable: true,
            });
            navigate("/");
        } catch (error) {
            // Login failed with error message
            toast({
                title: "Invalid login credentials.", //error.message, custom message for user friendliness
                position: "top",
                status: "error", 
                isClosable: true,
            });
            console.log("Failed login");
        }
    };


    return (
        <><form className='Login' title='Login' onSubmit={handleSubmit(handleLogin)}> 
            <Flex alignContent='center' justifyContent='center'>
                <Box title='login-form-box' id='login-form-box' bg='#000000' color='#fff' w={{base:"25em", sm:"30em", md:"35em"}} height='100%' m='2rem' p='1.5rem'> 
                    <VStack>
                        <Text fontSize={{ base: "20px", md: "25px"}} 
                            fontWeight='bold' 
                            mb='1rem'> SIGN IN </Text>
                        
                        <FormControl id='emailField' isInvalid={!!formState?.errors?.email?.type}>
                            <FormLabel>Email Address</FormLabel>
                            <Input 
                                title='login-email'
                                id='email'
                                border="tan 2px outset"
                                {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/})}
                            />
                            <FormErrorMessage title='emailError'>{"Email is invalid or does not have an account associated with it"}</FormErrorMessage>
                        </FormControl>

                        <FormControl id='passwordField' isInvalid={!!formState?.errors?.password?.type}>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input 
                                    title='login-password'
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    border="tan 2px outset"
                                    w={{base:"20em", sm:"26em", md:"27em"}}
                                    {...register("password", { required: true, pattern: /(.|\s)*\S(.|\s)/})} //checks for whitespace
                                />
                                <InputRightElement width='4.5rem' h='48px'>
                                    <Box  
                                        title='login-show-password-button'
                                        bg='#white' 
                                        color='black'
                                        w='3.5rem' 
                                        h='25px' 
                                        fontWeight='bold'
                                        fontSize="11px"
                                        borderRadius='md' 
                                        border="tan 2px outset"
                                        _hover={{ boxShadow: "0 0 5px 1px tan" }}
                                        mb="9px"
                                        align='center'
                                        pt='0.25rem' 
                                        onClick={handleShowPassword} 
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </Box>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>{"Incorrect password"}</FormErrorMessage>
                        </FormControl>

                        <Center 
                            title='login-forgot-password'
                            color='#fff'
                            fontWeight='bold'
                            alignSelf='end'
                            fontSize="11px"
                            h='40px'
                            w='50%'
                            margin="2%"
                            border="tan 2px outset"
                            _hover={{ boxShadow: "0 0 5px 1px linen" }}
                            onClick={navigateToResetPassword} 
                            > 
                            Forgot Password?
                        </Center>
                        <Box 
                            title='login-login-button'
                            as='button'  
                            mt="10%"
                            _hover={{ boxShadow: "0 0 5px 1px linen" }}
                            color='white'
                            h='40px'
                            w='70%'
                            fontWeight='bold'
                            fontSize="12px"
                            border="tan 2px outset"
                            bg='black'
                            borderRadius='md'
                            > 
                            CONTINUE
                        </Box>
                        <Center 
                            _hover={{ boxShadow: "0 0 5px 1px linen" }}
                            border="tan 2px outset"
                            title='login-register-button'
                            mt='0.5rem'
                            color='white'
                            h='40px'
                            w='70%'
                            fontWeight='bold'
                            fontSize='12px'
                            borderRadius='md'
                            bg='black'
                            onClick={navigateToRegister} 
                            > 
                            REGISTER
                        </Center>
                    </VStack>
                </Box>
            </Flex>
        </form></>
    );
};