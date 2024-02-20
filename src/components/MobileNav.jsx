import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDataProvider } from "../components/dataProvider";
import { IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
 import { useDisclosure } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import { useToast } from "@chakra-ui/react";
import { CartModal } from "./CartModal";

export function MobileNav() {
  const { lines } = useDataProvider();
  const hasCartItems = lines.length > 0;
//   const { user, getUserInfo } = useDataProvider();
//   const navigate = useNavigate();
//   const toast = useToast();
   const { isOpen, onOpen, onClose } = useDisclosure();
//   const logout = () => {
//     getUserInfo(null); 

//     toast({
//         title: "Logged out successfully.",
//         position: "top",
//         status: "success",
//         isClosable: true,
//     });

//     navigate("/");
// }
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
      <MenuList bg="black" textAlign="center" fontWeight="bold">
        <MenuItem bg="black" _hover={{ color: "black", bg: "white", borderColor: "white 2px" }} as="a" href="/" fontSize={{ base: "15px" }}> Home </MenuItem>
        <MenuItem bg="black" _hover={{ color: "black", bg: "white", borderColor: "white 2px" }} as="a" href="/contact" fontSize={{ base: "15px" }}> Contact </MenuItem>
        <MenuItem bg="black" _hover={{ color: "black", bg: "white", borderColor: "white 2px" }} as="a" href="/menu" fontSize={{ base: "15px" }}> Order </MenuItem>
        <MenuItem bg="black" _hover={{ color: "black", bg: "white", borderColor: "white 2px" }} as="a" href="/login" fontSize={{ base: "15px" }}> Login </MenuItem>

        {/* {user ? (                 
        <MenuItem bg="black" onClick={logout}_hover={{ color: "black", bg: "white", borderColor: "white 2px" }}  as="button"fontSize={{ base: "15px" }}> Logout </MenuItem>

    ) : (
      <MenuItem bg="black" _hover={{ color: "black", bg: "white", borderColor: "white 2px" }} as="a" href="/login" fontSize={{ base: "15px" }}> Login </MenuItem>

    ) } */}
        
        {hasCartItems ? (
           <MenuItem bg="black" _hover={{ color: "black", bg: "white", borderColor: "white 2px" }} fontSize={{ base: "15px" }} onClick={onOpen} >
            <Text color="white" fontSize={{ base: "15px" }}>Cart</Text>
            <CartModal isOpen={isOpen} onClose={onClose} />
        </MenuItem>
        ) : (
          <MenuItem  _hover={{ color: "black", bg: "white", borderColor: "white 2px" }} fontSize={{ base: "15px" }} bg="black">
            <Link to="/cart" style={{ opacity: 0.5, cursor: "not-allowed" }}>
              <Text color="white" fontSize={{ base: "0em", sm: "0em" }}>Cart</Text>
            </Link>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}
