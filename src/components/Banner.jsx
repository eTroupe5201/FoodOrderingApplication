// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Heading, Box, Center, Image, Text, SimpleGrid } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export function Banner() {
    return (
        <Box className="Banner" aria-label="Banner"  ////motion.Box
        initial={{y:-250}}
        animate={{y:0}}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
           
        >
             <SimpleGrid columns={3} templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }}>
                <Box padding="20" maxH={{ base: '20em', sm: '50em', md: "70em", lg: "80em", xl: "100em" }} color="white" bg="black">
                    <Center>
                        <Image
                            src="src\assets\FoodLogo.png"
                            alt="logo"
                            w={{ base: '3em', sm: '4em', md: "5em", lg: "6em", xl: "7em" }}
                            maxH={{ base: '3em', sm: '4em', md: "5em", lg: "6em", xl: "7em" }}
                        />
                    </Center>
                    <Heading
                        fontSize={{ base: '15px', sm: '12px', md: "15px", lg: "17px" }}
                        fontFamily="'Raleway', sans-serif "
                        pt="7"
                    >
                        Delicious Food
                    </Heading>
                    
                    <Text
                        pt="5"
                        fontSize={{ base: '12px', sm: '12px', md: "15px", lg: "17px" }}
                    >
                        Savor the extraordinary at our restaurant, where every dish is a delectable masterpiece. From savory starters
                        to mouthwatering main courses and irresistible desserts, our menu is a celebration of flavor and freshness.
                    </Text>
                </Box>

                <Box padding="20" maxH={{ base: '20em', sm: '50em', md: "70em", lg: "80em", xl: "100em" }} color="white" bg="black">
                    <Center>
                        <Image
                            src="src\assets\OrderLogo.png"
                            alt="logo"
                            w={{ base: '3em', sm: '4em', md: "5em", lg: "6em", xl: "7em" }}
                            maxH={{ base: '3em', sm: '4em', md: "5em", lg: "6em", xl: "7em" }}
                        />
                    </Center>
                    <Heading
                        fontSize={{ base: '15px', sm: '12px', md: "15px", lg: "17px" }}
                        fontFamily="'Raleway', sans-serif "
                        pt="7"
                    >
                        Easy To Order
                    </Heading>
                    <Text
                        pt="5"
                        fontSize={{ base: '12px', sm: '12px', md: "15px", lg: "17px" }}
                    >
                        Experience the ease of ordering with our restaurant – simplicity at your fingertips. Our user-friendly online
                        platform ensures a seamless and effortless ordering process. Browse our menu, customize your preferences, and
                        complete your order with just a few clicks.
                    </Text>
                </Box>

                <Box padding="20" maxH={{ base: '20em', sm: '50em', md: "70em", lg: "80em", xl: "100em" }} color="white" bg="black">
                    <Center>
                        <Image
                            src="src\assets\deliveryLogo.png"
                            alt="logo"
                            w={{ base: '3em', sm: '4em', md: "5em", lg: "6em", xl: "7em" }}
                            maxH={{ base: '3em', sm: '4em', md: "5em", lg: "6em", xl: "7em" }}
                        />
                    </Center>
                    <Heading
                        fontSize={{ base: '15px', sm: '12px', md: "15px", lg: "17px" }}
                        fontFamily="'Raleway', sans-serif "
                        pt="7"
                    >
                        Fastest Delivery
                    </Heading>
                    <Text
                        pt="5"
                        fontSize={{ base: '12px', sm: '12px', md: "15px", lg: "17px" }}
                    >
                        At our restaurant, we take pride in offering the fastest delivery service to bring the flavors straight to your
                        doorstep. With our efficient delivery team and state-of-the-art logistics, we prioritize swift and reliable
                        service without compromising the quality of your order.
                    </Text>
                </Box>
            </SimpleGrid>
        </Box> //motion.Box
    );
}

