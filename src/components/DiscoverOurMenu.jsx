import React from 'react';
import { Box, Center, Image, Text, SimpleGrid } from '@chakra-ui/react';

// add mobile first designs later
export function DiscoverOurMenu() {
    return (
        <Box className="DiscoverOurStory" margin="0" display="Flex">
            <Box className="overlay" FlexShrink={3} >
                <Center>
                    <Text className="overlayCursive" initial={{x: -100}} animate={{x:0}} transition={{duration:"2", delay:"1"}} >
                        Discover
                    </Text>
                    <Text className="overlayHeading" >
                        OUR STORY
                    </Text>

                    <Text >
                    Indulge in a culinary adventure with our meticulously curated menu,
                     expertly crafted to delight even the most discerning palates. From 
                     enticing appetizers to mouthwatering mains and decadent desserts, 
                     each dish is thoughtfully prepared using only the freshest, highest
                      quality ingredients. Whether you&lsquo;re craving a taste of tradition or 
                      seeking bold, innovative flavors, our diverse selection offers something 
                      to satisfy every craving. Join us and embark on a gastronomic journey that promises
                       to excite, inspire, and leave you craving for more.
                    </Text>
                </Center>
            </Box>
            <SimpleGrid columns={2}>
                <Box>
                    <Center>
                        <Image h="100%" src="src\assets\slide_5.jpg" alt="logo" />
                    </Center>
                </Box>
                <Box bg="Linen" width={{ base: '100%', md: '50%', lg: '40%' }}>
                    <Text></Text>
                </Box>
            </SimpleGrid>
        </Box>
    );
}