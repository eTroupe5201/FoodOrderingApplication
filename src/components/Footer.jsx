import React from 'react';
import {Flex, Box, Text, Image } from '@chakra-ui/react'

export function Footer() {
    return (
        <><div> 
            <Flex mt='150px' justifyContent='center' >
                <Text fontSize={30} > More to come! Thank you for visiting. </Text>
                <Flex pr='32px'>
                    <Box h='200px'>
                        <Image boxSize='80px' ml='50px'  src='src\assets\FO_logo.png' alt='draft_logo'/>
                
                    </Box>
            </Flex>
            </Flex>
        </div></>
    );
}
