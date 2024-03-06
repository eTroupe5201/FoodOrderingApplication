
// import React from "react";

import { Box, Center, Image, Text } from "@chakra-ui/react";

export function DiscoverOurStory() {
    return (
        <Box className="DiscoverOurStory" role="banner" >
            <Box className="overlay" 
              
                marginLeft= {{ base: "20%", sm: "18%", md: "15%", lg: "15%", xl: "20%", "2xl": "20%"}}
                marginTop={{ base: "20%", sm: "25%", md: "20%", lg: "20%", xl: "15%", "2xl": "10%"}}
                width="80%"  >
                <Center>
                    <Text className="overlayCursive" 
                        marginBottom= {{ base: "56%", sm: "54%", md: "40%", lg: "35%", xl: "28%", "2xl": "21%"}}
                        marginLeft= {{base:"50%", sm:"50%", md:"50%", lg:"58%", xl:"60%", "2xl":"64%"}}
                        fontSize={{ base: "45px", sm: "50px", md: "55px", lg: "60px", xl:"65px", "2xl":"80px" }}>
                        Discover
                    </Text>
                    <Text className="overlayHeading" 
                        marginBottom= {{ base: "44%", sm: "44%", md: "32%", lg: "28%", xl: "22%", "2xl": "16%"}}
                        marginLeft= {{base:"60%", sm:"60%", md:"60%", lg:"64%", xl:"65%", "2xl":"70%"}}
                        fontSize={{ base: "16px", sm: "18px", md: "20px", lg: "22px", xl:"24px", "2xl":"26px" }}>
                        OUR STORY
                    </Text>

                    <Text fontSize={{ base: "12px", sm: "14px", md: "16px", lg: "18px" }}>
                        At Divine Delicacies, our story is as rich and flavorful as our dishes. We embarked on a culinary adventure
                        with a simple yet profound vision: to create a haven where food transcends the ordinary, and every dining
                        experience becomes a cherished memory. From the very beginning, our chefs at Divine Delicacies have been
                        dedicated to the craft of culinary magic.
                    </Text>
                </Center>
            </Box>
            {/* <SimpleGrid columns={{ base: 1, md: 2 }} width="100vw">  */}
                <Box height="100%" bg="linen" maxHeight="30em">
                    <Image src="https://d1zh5cyxaugen.cloudfront.net/WelcomeOpen.jpg" alt="logo" width="100%" height="100%" />
                </Box>
                {/* <Box bg="Linen">
                    <Text></Text>
                </Box>  */}
            {/* </SimpleGrid>  */}
        </Box>
    );
}