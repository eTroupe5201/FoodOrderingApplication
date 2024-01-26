import React from 'react';
import {Box, HStack} from '@chakra-ui/react';
import { Image } from '@chakra-ui/react'

export function NavBar() {
    return (
        <><div>            
            <Box as='section' pd='100px'> 
                <Box color="F7FAFC" bg="#C05621" pt='32px' px='32px' pb='300px' w='100vw' > 
                    <HStack spacing='auto'> 
                        <Image boxSize='80px' mr='50px' src='src\assets\FO_logo.png' alt='draft_logo' />

                        <HStack margin='auto' spacing='30px' alignment='trailing'>
                            <Box as='button' borderRadius='md' fontWeight='700' color="#C05621" bg='#FFFAF0' w='120px' h='40px'> 
                                HOME 
                            </Box>
                            <Box as='button' borderRadius='md' fontWeight='700' color="#C05621" bg='#FFFAF0' w='120px' h='40px'> 
                                MENU 
                            </Box>
                            <Box as='button' borderRadius='md' fontWeight='700' color="#C05621" bg='#FFFAF0' w='120px' h='40px'> 
                                CONTACT 
                            </Box>

                        </HStack>

                        <Box as='button' borderRadius='md' ml='50px' fontWeight='700' color='#FFFAF0' bg='#000000' w='140px' h='40px'> 
                                ORDER 
                        </Box>
                    </HStack>
                </Box> 
            </Box>

        </div></>
    );
}
