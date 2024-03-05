import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDataProvider } from "../components/dataProvider";
import { IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { CartModal } from "./CartModal";
import { auth } from "../utils/firebase" 
import { signOut } from "firebase/auth";

export function MobileNav() {
  const { lines } = useDataProvider();
  const hasCartItems = lines.length > 0;
  const { user, getUserInfo } = useDataProvider();
   const navigate = useNavigate();
   const toast = useToast();
   const { isOpen, onOpen, onClose } = useDisclosure();

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
    <Menu color="black">
      <MenuButton
        as={IconButton}
        aria-label="Options"
        color="black"
        border="solid white 2px"
        bg="black"
        _hover={{ boxShadow: "0 0 6px 1px tan" }}
        icon={<HamburgerIcon color="white" />}
      />
      <MenuList border="2px outset tan"bg="black" textAlign="center" fontWeight="bold">
        <MenuItem bg="black" _hover={{ textShadow:"#fff 0px 2px 5px",borderColor: "white 2px" }} as="a" fontSize={{ base: "15px" }}> <Link to="/"> Home </Link> </MenuItem>
        <MenuItem bg="black" _hover={{  textShadow:"#fff 0px 2px 5px", borderColor: "white 2px" }} as="a" fontSize={{ base: "15px" }}> <Link to="/contact"> Contact </Link> </MenuItem>
        <MenuItem bg="black" _hover={{  textShadow:"#fff 0px 2px 5px", borderColor: "white 2px" }} as="a" fontSize={{ base: "15px" }}> <Link to="/menu"> Order </Link> </MenuItem>
        {user ? (
          //TODO: fix temp solution - Link only added here for formatting 
          <MenuItem bg="black" _hover={{ textShadow:"#fff 0px 2px 5px" ,borderColor: "white 2px" }} as="a" onClick={logout} fontSize={{ base: "15px" }}> <Link> Logout </Link> </MenuItem>
        ) : (
          <MenuItem bg="black" _hover={{ textShadow:"#fff 0px 2px 5px" ,borderColor: "white 2px" }} as="a" fontSize={{ base: "15px" }}><Link to="/login">Login</Link>  </MenuItem>  
        ) }

        {hasCartItems ? (
           <MenuItem bg="black" fontWeight="bold" fontSize={{ base: "15px" }} onClick={onOpen} >
            <Text color="white"  _hover={{  borderColor: "white 2px" }} fontSize={{ base: "15px" }}>Cart</Text>
            <CartModal isOpen={isOpen} onClose={onClose} />
        </MenuItem>
        ) : (
          <MenuItem  fontSize={{ base: "15px" }} bg="black">
            <Link to="/cart" style={{ opacity: 0.5, cursor: "not-allowed" }}>
              <Text  _hover={{  borderColor: "white 2px" }} color="white" fontSize={{ base: "0em", sm: "0em" }}>Cart</Text>
            </Link>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}