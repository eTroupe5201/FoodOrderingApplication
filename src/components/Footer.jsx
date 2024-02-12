// eslint-disable-next-line no-unused-vars
import React from 'react';
import {Center,Container,Heading, SimpleGrid, Box,  Image, Text, Grid, Flex} from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import {BsTelephonePlusFill} from 'react-icons/bs'; //added react-icons 

export function Footer() {
    return (
        <Footer>
        <Box className="Footer"  bg = 'black' color="white" paddingBottom={10}>
            <Container maxW="container.xl">
                <SimpleGrid columns={4}>
    
                    <Box><Heading  fontFamily="'Raleway', sans-serif " mb={5} mt={10}>About Us</Heading>
                    
                    <Center><Image height="10"src="src\assets\White-Favicon.png"></Image></Center>
            
                    <Text mt={5}>
                        Discover culinary excellence at Delcious Delicacies. We're passionate about crafting 
                        extraordinary flavors and providing a memorable dining experience. From our kitchen to
                        your table, savor the essence of exceptional cuisine with us. Welcome to Delicious Delicacies, 
                        where every bite tells our story.</Text>
                    </Box>

                    <Box><Heading fontFamily="'Raleway', sans-serif "mb={5} mt={10}>Useful Links</Heading>
                    <Grid>
                        <Link to="/">Home</Link>
                        <Link to="/menu">Menu</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                        <Link to="/contact">Contact</Link>
                        <Link to="/about">About</Link>
                    </Grid>
                    <Text mt={5}></Text>
                    </Box>
                    <Box><Heading fontFamily="'Raleway', sans-serif " mb={5} mt={10}>Follow Us</Heading>
                    <Grid>
                        <Link to="/">Facebook</Link>
                        <Link to="/">Instagram</Link>
                        <Link to="/">Twitter</Link>
                        <Link to="/">Youtube</Link>
                        <Link to="/">TikTok</Link>
                    </Grid>
                    </Box>
                    <Box><Heading fontFamily="'Raleway', sans-serif " mb={5} mt={10}>Contact Us</Heading>
                    <Grid >
                        <Text paddingBottom={1} pt={2}>1234 Depaul Drive</Text>
                        <Text paddingBottom={5} >Chicago, IL 32801</Text>
                        <Text paddingBottom={5}> <BsTelephonePlusFill/>Phone: 407-555-5555</Text>
                        <Text>Email: DelicousDelicacies@gmail.com</Text>
                    </Grid>
                    </Box>
                    
                
                </SimpleGrid> 
                </Container>
        </Box>
        </Footer>
    );
}
