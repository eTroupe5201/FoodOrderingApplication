// eslint-disable-next-line no-unused-vars
import React from 'react';
import {Box, Image} from '@chakra-ui/react';

export function Banner() {
    return (
    <><div>
        <Box align='center'>
            <Image src='src\assets\banner_stock.jpg' alt='stock_banner' marginTop='100px' maxH='700px' w='100vw'/>
            <Box as='button' borderRadius='md' fontWeight='700' marginTop='150px' color='#FFFAF0' bg='#000000' w='140px' h='40px'> 
                ORDER 
            </Box>
        </Box>
    </div></>
    );
}