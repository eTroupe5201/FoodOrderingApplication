// eslint-disable-next-line no-unused-vars
import React from "react"
import {Center,Container,Heading, SimpleGrid, Box,  Image, Text, Grid} from "@chakra-ui/react"
import { Link } from "react-router-dom"


export function Footer() {
    return (
     
        <Box  role="navigation" className="Footer"  bg = "black"  paddingBottom={10}>
           <section className="wave"></section>  
            <Container> 
                <SimpleGrid  bg = "black" color="white"columns={4} templateColumns={{base:"repeat(1, 1fr)", sm:"repeat(2, 1fr)",lg:"repeat(4, 1fr)" }}>
    
                    <Box colSpan={{base: 1, md:4,  xl: 4}}>
                        <Heading fontSize={{ base: "15px", md: "20px", lg: "30px" }}  fontFamily="'Raleway', sans-serif " mb={5} mt={10}>About Us</Heading>
                    
                    <Center><Image width={{base:"50px"}} alt= "Favicon" height={{base:"50px"}}src="https://d1zh5cyxaugen.cloudfront.net/assets/WhiteFavicon.png"></Image></Center>
            
                    <Text fontSize={{ base: "12px",md: "15px", lg: "18px"}} mt={5}>
                        Discover culinary excellence at Devine Delicacies. We are passionate about crafting 
                        extraordinary flavors and providing a memorable dining experience. From our kitchen to
                        your table, savor the essence of exceptional cuisine with us. Welcome to Delicious Delicacies, 
                        where every bite tells our story.</Text>
                    </Box>

                    <Box colSpan={{base: 1,  md:4,  xl: 4}}>
                        <Heading fontSize={{ base: "15px", md: "20px", lg: "30px" }}
                        fontFamily="'Raleway', sans-serif "mb={5} mt={10}>Useful Links</Heading>
                    
                    <Grid fontSize={{ base: "12px",md: "15px", lg: "18px" }}>
                <ul>
                <li><Link to="/"><Text>Home</Text></Link></li>
                <li><Link to="/contact"><Text >Contact Us</Text></Link></li>
                <li><Link to="/menu"><Text >Order</Text></Link></li>
                <li><Link to="/login"><Text >Login</Text></Link></li>
                {/* <li><Link to="/contact"><Text>Contact</Text></Link></li> */}
                {/* <li><Link to="/info"><Text>About</Text></Link></li> */}
                </ul>
                 
                    </Grid>
                    <Text mt={5}></Text>
                    </Box>
                    <Box colSpan={{base: 1,  md:4,  xl: 4}}>
                    <Heading fontSize={{ base: "15px", md: "20px", lg: "30px" }}fontFamily="'Raleway', sans-serif " mb={5} mt={10}>Follow Us</Heading>
                    <Grid fontSize={{ base: "12px",md: "15px", lg: "18px"}}>
                 <ul>
                <li><Link to="/"><Text >Facebook</Text></Link></li>
                <li><Link to="/"><Text >Instagram</Text></Link></li>
                <li><Link to="/"><Text >Twitter</Text></Link></li>
                <li><Link to="/"><Text >Youtube</Text></Link></li>
                <li><Link to="/"><Text >TikTok</Text></Link></li>
       </ul>
                    </Grid>
                    </Box>
                    <Box colSpan={{base: 1, md:4,  xl: 4}}>
                        <Heading fontSize={{ base: "15px", md: "20px", lg: "30px" }}fontFamily="'Raleway', sans-serif " mb={5} mt={10}>Contact Us</Heading>
                    <Grid fontSize={{ base: "12px",md: "15px", lg: "18px"}}>
                        <Text paddingBottom={1} pt={2}>1234 Depaul Drive</Text>
                        <Text paddingBottom={5} >Chicago, IL 32801</Text>
                        <Text paddingBottom={5}> Phone: 407-555-5555</Text>
                        <Text>Email: DevineDelicacies@gmail.com</Text>
                    </Grid>
                    </Box>
                    
                
                </SimpleGrid> 
                </Container>
        </Box>
      
    );
}
