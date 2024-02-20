// // eslint-disable-next-line no-unused-vars
// import React from "react";
// import { Image, HStack, Box, Text, useToast} from "@chakra-ui/react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDataProvider } from "../components/dataProvider"
// import { useState, useEffect } from "react";
// import { TiShoppingCart, TiUser } from "react-icons/ti";
// import { useBreakpointValue } from "@chakra-ui/react";
// import {MobileNav} from "./MobileNav";

// import { CartModal } from "../components/CartModal";
// import {
//   IconButton,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure,
// } from "@chakra-ui/react";

//     export function NavBar() {
//     const isSmallScreen = useBreakpointValue({ base: true, sm: true, md: true, lg: false, xl: false }); // Define when to show the icon based on screen size
//     const hidden = useBreakpointValue({ base: false, sm: false, md: false, lg: true}); // Define when to show the icon based on screen size
//     const { lines } = useDataProvider();
  
//     const { isOpen, onOpen, onClose } = useDisclosure();

//     const { user, checkCartNotEmpty, getUserInfo, cartChanged, setCartChanged } = useDataProvider();
//     const navigate = useNavigate();
//     const toast = useToast();
//     const [hasCartItems, setHasCartItems] = useState(false);

//     useEffect(() => {
//         const fetchCartStatus = async () => {
//             if (user) {
//                 const isNotEmpty = await checkCartNotEmpty();
//                 console.log("Cart not empty:", isNotEmpty);
//                 setHasCartItems(isNotEmpty);
//             } else {
//                 setHasCartItems(false);
//             }
//         };
    
//         fetchCartStatus();
//         // Reset the cardChanged state so that the next change can be detected
//         setCartChanged(false);
//     }, [user, cartChanged]); //Now this effect depends on two states: user and cartChanged

//     const logout = () => {
//         getUserInfo(null); 
//         toast({
//             title: "Logged out successfully.",
//             position: "top",
//             status: "success",
//             isClosable: true,
//         });
    
//         navigate("/");
//     }


//     return (
//         <nav className="nav"  >

//         {isSmallScreen ? (

//             <Link to="/">  
//             <Image    
//             _hover={{ boxShadow: "0 0 10px 1px tan"}}                     
//             w={{ base: "50px", sm: "4em" }}
//             maxH={{ base: "40px", sm: "4em"}}
//             className="photo" src="src\assets\White-Favicon.png" alt="logo" /></Link> 

//                 ) : (
//                     <Link to="/">  <Image
//                     _hover={{ boxShadow: "0 0 10px 1px tan"}}
//                     w={{  md: "18em" }}
//                     maxH={{  md: "11em"}}
//                     className="photo" src="src\assets\divine-delicacies2.png" alt="logo" /> </Link> 
//                 )}


//         <ul >

//         <li><Link to="/"><Text fontSize={{ base: "0em", sm: "0em", md: "0em", lg: "25px" }}>Home</Text></Link></li>
//            <li> <Link to="/contact"><Text fontSize={{ base: "0em", sm: "0em", md: "0em", lg: "25px" }}>Contact Us</Text></Link></li>
//                 <li><Link to="/menu"><Text fontSize={{ base: "0em", sm: "0em", md: "0em", lg: "25px" }}>Order</Text></Link></li>
//                 <li><Link to="/login"><Text fontSize={{ base: "0em", sm: "0em", md: "0em", lg: "25px" }}>Login</Text></Link></li>
//                 <li>{isSmallScreen && <MobileNav />}</li>
     
//                <li > 
//                     {user ? (
//                         <Box pt="0.25rem" as="button" onClick={logout} > Logout </Box> && checkSize
//                     ) : (
//                         <Link to="/login"> Login </Link> && checkSize
//                     ) }
//                 </li>
//                 <HStack spacing="1.5rem">
//                     <li > 
//                         {user ? (
//                             <Link to="/profile"> <TiUser/> </Link>&& checkSize
//                         ) : (
//                             <TiUser style={{visibility: "hidden"}} /> && checkSize
//                         ) }
//                     </li>
//                     {/* <li>
//                         {hasCartItems ? (
//                              <><Button bg="black" color="white" border="white 2px solid" 
//                              w={{ base: "50px", sm: "4em" }}
//                              maxH={{ base: "40px", sm: "4em"}}
//                              _hover={{ boxShadow: "0 0 10px 1px linen"}}  
//                              onClick={onOpen} >
//                             <TiShoppingCart  />
//                              </Button><CartModal isOpen={isOpen} onClose={onClose} /></>     */}
//                              <li>
//    {hasCartItems ? (
//       <Link to="/cart"> <TiShoppingCart /> </Link>
//                         ) : (
//                            <TiShoppingCart style={{ opacity: 0.5, cursor: "not-allowed" }} />         )}
//                     </li>
//                 </HStack>
//                 {/* <li><Link to="/info"> OurInfo </Link></li> */}
//             </ul>
//         </nav>
//     );
// }
// //redo this
// //can add modal directly to this page, if we want to remove the login page
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Image, HStack, Box, useToast, Text,Button} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDataProvider } from "../components/dataProvider"
import { useState, useEffect } from "react";
import { TiShoppingCart, TiUser } from "react-icons/ti";
import { useBreakpointValue } from "@chakra-ui/react";
import {MobileNav} from "./MobileNav";

import { CartModal } from "../components/CartModal";
import {
//   IconButton,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

export function NavBar() {
    const isSmallScreen = useBreakpointValue({ base: true, sm: true, md: true, lg: false, xl: false }); // Define when to show the icon based on screen size
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, checkCartNotEmpty, getUserInfo, cartChanged, setCartChanged } = useDataProvider();
    const navigate = useNavigate();
    const toast = useToast();
    const [hasCartItems, setHasCartItems] = useState(false);

    useEffect(() => {
        const fetchCartStatus = async () => {
            if (user) {
                const isNotEmpty = await checkCartNotEmpty();
                console.log("Cart not empty:", isNotEmpty);
                setHasCartItems(isNotEmpty);
            } else {
                setHasCartItems(false);
            }
        };
    
        fetchCartStatus();
        // Reset the cardChanged state so that the next change can be detected
        setCartChanged(false);
    }, [user, cartChanged]); //Now this effect depends on two states: user and cartChanged

    const logout = () => {
        getUserInfo(null); 
    
        toast({
            title: "Logged out successfully.",
            position: "top",
            status: "success",
            isClosable: true,
        });
    
        navigate("/");
    }


    return (
        <nav className="nav">      
{isSmallScreen ? (

            <Link to="/">  
            <Image    
            _hover={{ boxShadow: "0 0 10px 1px tan"}}                     
            w={{ base: "50px", sm: "4em" }}
            maxH={{ base: "40px", sm: "4em"}}
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
                        <Box  pt="0.25rem" as="button" onClick={logout} ><Text fontSize={{ base: "0em", sm: "0em", md: "0em", lg: "25px" }}> Logout</Text> </Box>
                    ) : (
                        <Link to="/login"> <Text fontSize={{ base: "0em", sm: "0em", md: "0em", lg: "25px" }}>Login </Text></Link> 
                    ) }
                </li>
                <HStack spacing="1.5rem">
                    <li > 
                        {user ? (
                            <Link to="/profile"> <TiUser  /> </Link>
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