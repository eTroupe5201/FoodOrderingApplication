import React from 'react';
import {Heading,Box, Grid, Center, Image, Text, SimpleGrid, Container, Flex} from '@chakra-ui/react';

//add mobile first designs later
export function OurTeam() {
    return (
      <section className="wave">
        <Box className="OurTeam"  position= "block">

          <SimpleGrid columns={4} pb='150px' templateColumns={{base:'repeat(1, 1fr)', sm:'repeat(2, 1fr)',lg:'repeat(4, 1fr)' }}> 
            <Box className="OurTeamBox">
              <Center> <Image className="round-picture" src="src\assets\chef1.jpg" alt="logo" /></Center>
              <Text className="team-text">Head Chef John</Text>
              <Text>Chef Jason's culinary philosophy revolves around simplicity, quality ingredients, and letting the flavors speak for themselves. He believes in using locally-sourced, seasonal produce to create dishes that are as fresh as they are delicious.</Text>
            </Box>
            <Box className="OurTeamBox" >
              <Center> <Image className="round-picture" src="src\assets\chef2.jpg" alt="logo" /></Center>
              <Text className="team-text">Chef Jacob</Text>
              <Text>Chef Jacob is a classically trained chef with a passion for creating innovative dishes. He has a flair for combining traditional techniques with modern flavors to create dishes that are as beautiful as they are delicious.</Text>
            </Box>
            <Box className="OurTeamBox" >
              <Center> <Image className="round-picture" src="src\assets\server1.jpg" alt="logo" /></Center>
              <Text className="team-text">Server James</Text>
              <Text>James is a dedicated server who is passionate about providing exceptional service. He believes in creating a warm, welcoming atmosphere for guests and ensuring that every dining experience is memorable.</Text>
            </Box>
            <Box className="OurTeamBox">
              <Center> <Image className="round-picture" src="src\assets\team.jpg" alt="logo" /></Center>
              <Text className="team-text">Our Team</Text>
              <Text>Our team is committed to providing an exceptional dining experience for every guest. From the kitchen to the dining room, we work together to create a warm, welcoming atmosphere and ensure that every guest feels at home.</Text>
            </Box>
          </SimpleGrid>
        </Box>
      </section> 
  );
};

