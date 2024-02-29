//import React from "react";
import { Image, HStack, Box, useToast, Text,Button, Flex } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDataProvider } from "../components/dataProvider"
import { useState, useEffect } from "react";
import { TiShoppingCart, TiUser } from "react-icons/ti";
import { useBreakpointValue } from "@chakra-ui/react";
import {MobileNav} from "./MobileNav";
import { useDisclosure } from "@chakra-ui/react";   
import { CartModal } from "../components/CartModal";
import { auth } from "../utils/firebase" 
import { signOut } from "firebase/auth";

export function NavBar() {
    const isSmallScreen = useBreakpointValue({ base: true, sm: true, md: true, lg: false, xl: false }); // Define when to show the icon based on screen size
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, getUserInfo, checkCartNotEmpty, cartChanged, setCartChanged, fetchUserProfile } = useDataProvider();
    const navigate = useNavigate();
    const toast = useToast();
    const [hasCartItems, setHasCartItems] = useState(false);
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchCartStatus = async () => {
            if (user) {
                const isNotEmpty = await checkCartNotEmpty();
                //console.log("Cart not empty:", isNotEmpty);
                setHasCartItems(isNotEmpty);
            } else {
                setHasCartItems(false);
            }
        };
    
        fetchCartStatus();
        // Reset the cardChanged state so that the next change can be detected
        setCartChanged(false);
    }, [user, cartChanged]); //Now this effect depends on two states: user and cartChanged

    
    useEffect(() => {
        const loadUserProfile = async () => {
            const profile = await fetchUserProfile();
            setUserProfile(profile); 
        };

        loadUserProfile();
    }, [user]); 
    
    
        
    const logout = () => {
        signOut(auth).then(() => {
            getUserInfo(null); 
            
            toast({
                title: "Logged out successfully.",
                position: "top",
                status: "success",
                isClosable: true,
            });
        
            navigate("/");
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <nav className="nav">      
{isSmallScreen ? (

            <Link to="/">  
            <Image    
            _hover={{ boxShadow: "0 0 10px 1px tan"}}                     
            w={{ base: "3em", sm: "4em" }}
            maxH={{ base: "3em", sm: "4em"}}
            maxW={{ base: "3em", sm: "4em"}}
            className="photo" src="https://groupprojectdepaul.s3.us-east-2.amazonaws.com/assets/White-Favicon.png" alt="logo" /></Link> 

                ) : (
                    <Link to="/">  <Image
                    _hover={{ boxShadow: "0 0 10px 1px tan"}}
                    w={{  md: "18em" }}
                    maxH={{  md: "11em"}}
                    className="photo" src="https://groupprojectdepaul.s3.us-east-2.amazonaws.com/assets/divine-delicacies2.png" /> </Link> 
                )}

            <ul>
            <li><Link to="/"><Text fontSize={{ base: "0em", sm: "0em", md: "0em", lg: "25px" }}>Home</Text></Link></li>
     
                {/* <li><Link to="/item"> Menu </Link></li> */}
                <li><Link to="/contact"><Text fontSize={{ base: "0em", sm: "0em", md: "0em", lg: "25px" }}> Contact Us</Text> </Link></li>
                <li><Link to="/menu"> <Text fontSize={{ base: "0em", sm: "0em", md: "0em", lg: "25px" }}>Order </Text></Link></li>
                <li > 
                    {user ? (
                        <Box as="button" onClick={logout} >
                            <Text fontSize={{ base: "0em", sm: "0em", md: "0em", lg: "25px" }}> 
                                Logout
                            </Text> 
                        </Box>
                    ) : (
                        <Link to="/login"> <Text fontSize={{ base: "0em", sm: "0em", md: "0em", lg: "25px" }}>Login </Text></Link> 
                    ) }
                </li>
                <HStack spacing="1.5rem">
                    <li > 
                        {user ? (
                            <Flex align="center">
                                <Link to="/profile">
                                    <TiUser />
                                </Link>
                                <Text pl={2} fontSize="xl">{userProfile?.firstName}</Text> 
                            </Flex>
                        ) : (
                            <TiUser style={{visibility: "hidden"}} />
                        ) }
                    </li>
                    <li>
                        {hasCartItems ? (
                          <><Button bg="black" color="white" border="white 2px solid" 
                                                       w={{ base: "50px", sm: "4em" }}
                                                       maxH={{ base: "40px", sm: "4em"}}
                                                       _hover={{ boxShadow: "0 0 10px 1px tan"}}  
                                                       onClick={onOpen} >
                                                      <TiShoppingCart  />
                                                       </Button><CartModal isOpen={isOpen} onClose={onClose} /></> 
                                                     
                        ) : (
                            <TiShoppingCart style={{ opacity: 0.5, cursor: "not-allowed" }} />
                        )}
                    </li>
                    <li>{isSmallScreen && <MobileNav />}</li>
                </HStack>
                {/* <li><Link to="/info"> OurInfo </Link></li> */}
            </ul>
        </nav>
    );
}
//redo this
//can add modal directly to this page, if we want to remove the login page