import React from 'react';
import {Heading,Box, Grid, Center, Image, Text, SimpleGrid, Container, Flex} from '@chakra-ui/react';

//add mobile first designs later
export function DiscoverOurStory() {
    return (
        <Container margin="0">
          
            
          <Box className="overlay"> <Center>  
            <Text className="overlayCursive" >Discover</Text>
            <Text className="overlayHeading" >OUR STORY</Text>
          
                <Text> 
                    At Divine Delicacies, our story is as rich and flavorful as our
                    dishes. We embarked on a culinary adventure with a simple yet profound
                    vision: to create a haven where food transcends the ordinary, and
                    every dining experience becomes a cherished memory. From the very
                    beginning, our chefs at Divine Delicacies have been dedicated to the
                    craft of culinary magic.
                </Text>
            </Center></Box>
            <SimpleGrid columns={2}>
        <Box><Center> <Image h="100%" src="src\assets\slide_5.jpg" alt="logo" /></Center></Box>
        <Box bg="Linen"><Text></Text></Box>
        </SimpleGrid>
      
</Container>
    );
};
/* Our menu is a symphony of flavors, carefully
                    composed to offer a sensory journey that delights the taste buds.
                    Each dish is an ode to creativity, authenticity, and the finest
                    ingredients. Our commitment to excellence extends beyond the kitchen.
                    We believe that every meal should be a celebration, and every dining
                    experience should be a joyous occasion. Our team is dedicated to
                    providing exceptional service, ensuring that every guest feels welcome
                    and cherished. We invite you to join us on a culinary journey that
                    will tantalize your senses and leave you craving for more. Welcome to
                    Divine Delicacies, where every meal is a celebration of life, love,
                    and the joy of good food. */
