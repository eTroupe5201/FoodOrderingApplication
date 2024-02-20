import React from 'react';
import { Text } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { useDataProvider } from "../components/dataProvider";
import { IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

export function MobileNav() {
  const { lines } = useDataProvider();
  const hasCartItems = lines.length > 0;

  return (
    <Menu color="black">
      <MenuButton
        as={IconButton}
        aria-label='Options'
        color="black"
        border="solid white 2px"
        bg="black"
        _hover={{ boxShadow: "0 0 6px 1px tan" }}
        icon={<HamburgerIcon color="white" />}
      />
      <MenuList bg="black" textAlign="center" fontWeight="bold">
        <MenuItem bg="black" _hover={{ color: "black", bg: "white", borderColor: "white 2px" }} as='a' href='/' fontSize={{ base: '15px' }}> Home </MenuItem>
        <MenuItem bg="black" _hover={{ color: "black", bg: "white", borderColor: "white 2px" }} as='a' href='/contact' fontSize={{ base: '15px' }}> Contact </MenuItem>
        <MenuItem bg="black" _hover={{ color: "black", bg: "white", borderColor: "white 2px" }} as='a' href='/menu' fontSize={{ base: '15px' }}> Order </MenuItem>
        <MenuItem bg="black" _hover={{ color: "black", bg: "white", borderColor: "white 2px" }} as='a' href='/login' fontSize={{ base: '15px' }}> Login </MenuItem>

        {hasCartItems ? (
          <MenuItem bg="black">
            <Link to="/cart">
              <Text color="white" fontSize={{ base: '15px' }}>Cart</Text>
            </Link>
          </MenuItem>
        ) : (
          <MenuItem bg="black">
            <Link to="/cart" style={{ opacity: 0.5, cursor: "not-allowed" }}>
              <Text color="white" fontSize={{ base: '0em', sm: '0em' }}>Cart</Text>
            </Link>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}
