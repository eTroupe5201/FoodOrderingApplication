// eslint-disable-next-line no-unused-vars
import React from 'react';
import {Heading,Box, Grid, Center, Image, Text, SimpleGrid, Container, Flex} from '@chakra-ui/react';

//add mobile first designs later
export function Banner() {
    return (
        <Box className="Banner">
        <Container paddingBottom="700"paddingLeft="0" paddingRight="0" paddingTop="800px">
              <SimpleGrid columns={3}>
              
              <Box h='500' color="white" bg="black" pt='20' paddingLeft="200px" paddingRight="50px">
      <Center> <Image h="100" src="src\assets\FoodLogo.png" alt="logo" /></Center>
                 
                 <Heading fontSize="x-large"  fontFamily="'Raleway', sans-serif " pt='7' > Delicious Food </Heading>
                 <Text  pt='5'> Savor the extraordinary at our restaurant, 
      where every dish is a delectable masterpiece. 
      From savory starters to mouthwatering main courses and irresistible desserts,
       our menu is a celebration of flavor and freshness.
</Text> 
               
                </Box >

                <Box h='500'  color="white" bg="black" pt='20'paddingLeft="100px" paddingRight="100px">
      <Center><Image h="100" src="src\assets\OrderLogo.png" alt="logo" /></Center>
      <Heading fontSize="x-large" fontFamily="'Raleway', sans-serif " pt='7' > Easy To Order </Heading>
      <Text  pt='5' >Experience the ease of ordering with our restaurant – 
      simplicity at your fingertips. Our user-friendly online platform 
      ensures a seamless and effortless ordering process. Browse our menu, 
      customize your preferences,
       and complete your order with just a few clicks.</Text>
                </Box>

   
                <Box h='500'  color="white" bg="black" pt='20'paddingLeft="50px" paddingRight="200px">
                <Center><Image h="100" src="src\assets\deliveryLogo.png" alt="logo" /></Center>
            <Heading fontSize="x-large" fontFamily="'Raleway', sans-serif " pt='7' > Fastest Delivery </Heading>
            <Text  pt='5'> At our restaurant, we take pride in offering the fastest 
      delivery service to bring the flavors straight to your doorstep.
       With our efficient delivery team and state-of-the-art logistics, 
       we prioritize swift and reliable 
      service without compromising the quality of your order. </Text> 
                </Box>

              </SimpleGrid>
        </Container>

       
   </Box>
  




 


    );
}

