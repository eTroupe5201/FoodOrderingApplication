import React from 'react';
import {Heading,Box, Grid, Center, Image, Text, SimpleGrid, Container, Flex} from '@chakra-ui/react';

//add mobile first designs later
export function OurTeam() {
    return (
      <section className="wave">
        <Box className="OurTeam">
          <Box className="OverlayPicture"></Box>
          <Box className="MiddlePicture"></Box>
          <Box className="WhiteWave"></Box>
          <SimpleGrid columns={4} pb='150px'> 
            <Box >
              <Center> <Image className="round-picture" src="src\assets\chef1.jpg" alt="logo" /></Center>
            </Box>
            <Box >
              <Center> <Image className="round-picture" src="src\assets\chef2.jpg" alt="logo" /></Center>
            </Box>
            <Box >
              <Center> <Image className="round-picture" src="src\assets\server1.jpg" alt="logo" /></Center>
            </Box>
            <Box >
              <Center> <Image className="round-picture" src="src\assets\team.jpg" alt="logo" /></Center>
            </Box>
          </SimpleGrid>
        </Box>
      </section> 
  );
};

