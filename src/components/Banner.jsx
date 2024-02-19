// eslint-disable-next-line no-unused-vars
import React from "react";
import { Heading, Box, Center, Image, Text, SimpleGrid, } from "@chakra-ui/react";

export function Banner() {
    return (
        <Box className="Banner" aria-label="Banner">
            <SimpleGrid columns={3} templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(3, 1fr)" }}>
                <Box h="500" color="white" bg="black" pt="20">
                    <Center>
                        <Image h="100" src="src\assets\FoodLogo.png" alt="logo" />
                    </Center>
                    <Heading fontSize="x-large" fontFamily="'Raleway', sans-serif " pt="7">
                        Delicious Food
                    </Heading>
                    <Text pt="5">
                        Savor the extraordinary at our restaurant, where every dish is a delectable masterpiece. From savory starters
                        to mouthwatering main courses and irresistible desserts, our menu is a celebration of flavor and freshness.
                    </Text>
                </Box>

                <Box h="500" color="white" bg="black" pt="20">
                    <Center>
                        <Image h="100" src="src\assets\OrderLogo.png" alt="logo" />
                    </Center>
                    <Heading fontSize="x-large" fontFamily="'Raleway', sans-serif " pt="7">
                        Easy To Order
                    </Heading>
                    <Text pt="5">
                        Experience the ease of ordering with our restaurant – simplicity at your fingertips. Our user-friendly online
                        platform ensures a seamless and effortless ordering process. Browse our menu, customize your preferences, and
                        complete your order with just a few clicks.
                    </Text>
                </Box>

                <Box h="500" color="white" bg="black" pt="20">
                    <Center>
                        <Image h="100" src="src\assets\deliveryLogo.png" alt="logo" />
                    </Center>
                    <Heading fontSize="x-large" fontFamily="'Raleway', sans-serif " pt="7">
                        Fastest Delivery
                    </Heading>
                    <Text pt="5">
                        At our restaurant, we take pride in offering the fastest delivery service to bring the flavors straight to your
                        doorstep. With our efficient delivery team and state-of-the-art logistics, we prioritize swift and reliable
                        service without compromising the quality of your order.
                    </Text>
                </Box>
            </SimpleGrid>
        </Box>
    );
}

