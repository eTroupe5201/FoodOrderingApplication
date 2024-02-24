//TODO: User profile page
import { VStack, HStack, Center, Box, Heading, Text, useToast, SimpleGrid} from "@chakra-ui/react";
import  { useEffect,  useState } from "react";
import { useDataProvider } from "../components/dataProvider"
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase" 
import { sendPasswordResetEmail, signOut} from "firebase/auth";
import "../styles.css";

/* This page contains basic user data, with routes or buttons to reset password, edit other user info, 
*  and view prior order history. 
*  
*  TODO: view order history 
*/
export const Profile = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const { user, fetchUserProfile, getUserInfo } = useDataProvider();
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const loadUserProfile = async () => {
            const profile = await fetchUserProfile();
            setUserProfile(profile); 
        };

        loadUserProfile();
    }, [user, fetchUserProfile]); 

    const handleChangePasswordemail = async () => {
        //if not empty, we will call this firebase function directly and then we can go to our email box to rest the password
        sendPasswordResetEmail(auth, userProfile?.email)
        .then(() => {
            console.log("Success - password email sent");
            toast({
                title: "Password reset email sent.",
                description: "You have been logged out. Check your email for the password reset instructions.",
                status: "success",
                position: "top",
                duration: 9000,
                isClosable: true,
            });

            logout();
        })
        .catch((error) => {
            console.log(error);
            toast({
                title: "An error occurred.",
                description: error.message, 
                status: "error",
                position: "top",
                duration: 9000,
                isClosable: true,
            });
        });
    };

    const handleEditProfile = async () => {
        navigate("/editprofile");
    };
    
    const logout = () => {
        signOut(auth).then(() => {
            getUserInfo(null); 
            navigate("/login");
        }).catch((error) => {
            console.log(error);
        })
    };

    return (
        <div><Center position="relative" fontFamily="'Raleway', sans-serif">
            <SimpleGrid mt='4rem' columns={2} templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" , lg: "repeat(2, 1fr)" , xl: "repeat(2, 1fr)" }}>
                <VStack mt='-2rem' pb='3rem'>
                    <Box title='profile-info-box' id='profile-info-box' bg='#000000' color='#fff' w={{base:"25em", sm:"30em", md:"35em"}} height='100%' m='2rem' p='1.5rem' borderRadius='md'> 
                        <Heading fontSize='25px' pb='1rem' fontFamily="'Raleway', sans-serif" fontWeight='bold'> Profile Info </Heading>
                        <HStack mt='0.5rem'>
                            <Text fontWeight='bold'> First Name: </Text>
                            <Text title='profile-first-name' w='object-fit'> {userProfile?.firstName} </Text>
                        </HStack>
                        <HStack mt='0.5rem'>
                            <Text fontWeight='bold'> Last Name: </Text>
                            <Text title='profile-first-name' w='object-fit'> {userProfile?.lastName} </Text>
                        </HStack>
                        <HStack mt='0.5rem'>
                            <Text fontWeight='bold'> Email Address: </Text>
                            <Text title='profile-first-name' w='object-fit'> {userProfile?.email} </Text>
                        </HStack>
                        <HStack mt='0.5rem'>
                            <Text fontWeight='bold'> Phone Number: </Text>
                            <Text title='profile-first-name' w='object-fit'> {userProfile?.phone} </Text>
                        </HStack>
                        
                        <Center>
                            <Box 
                                as='button'  
                                title='edit-profile-button'
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
                                onClick={handleEditProfile} 
                            > 
                                    Edit Profile
                            </Box>
                        </Center>
                    </Box>
                    <Box title='reset-pw-box' id='reset-pw-box' bg='#000000' color='#fff' w={{base:"25em", sm:"30em", md:"35em"}} height='100%' p='1.5rem' borderRadius='md'> 
                        <Text fontWeight='bold'>To reset your password, click the button below. You will be logged out and an email will be sent to the above address with instructions. </Text>
                        <Center>
                            <Box 
                                as='button'  
                                title='reset-password-button'
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
                                onClick={handleChangePasswordemail} 
                            > 
                                    Reset Password
                            </Box>
                        </Center>
                    </Box>
                        {/* include Dietary notes - pulls to comments section of order every time */}
                        {/* <HStack>
                            <Text fontWeight='bold'> Standard Notes: </Text>
                            <Text border="outset 2px tan" title='profile-first-name' w='object-fit'> {userProfile?.standardNotes} </Text>
                        </HStack> */}
                    
                </VStack>

                <Center mb='8rem'>
                    <Box title='order-history-box' id='order-history-box' bg='#000000' color='#fff' w={{base:"25em", sm:"30em", md:"35em"}} height='100%' m='2rem' p='1.5rem' borderRadius='md'> 
                        <Text> Order History Goes Here</Text>
                    </Box>
                </Center>
            </SimpleGrid>
        </Center></div>
    );
}