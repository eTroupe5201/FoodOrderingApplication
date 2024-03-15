///* eslint-disable no-unused-vars */
///* eslint-disable react/jsx-key */
import React from "react";
import { Helmet } from "react-helmet";
import { Center, Box, SimpleGrid, Heading, Image, Link, Text } from "@chakra-ui/react";
import { useDataProvider } from "../components/dataProvider";
import { useNavigate } from "react-router-dom";
const MAX_DESCRIPTION_LENGTH = 70; // Set your desired maximum length
import { FilterNavigation } from "../components/FilterNavigation";
import { Sort } from "../components/Sort";
import { Type } from "../components/Type";
import { DietaryNeeds } from "../components/DietaryNeeds";
import { Search } from "../components/Search";

// the HomePage will be our default page after log in
export const Menu = () => {
    const navigate = useNavigate();
    const { selectedFilter,categories, getItemsByCategory, user } = useDataProvider();
   
    return (
        <> 
        
       <FilterNavigation   />
         {selectedFilter === "Search" && <Search />} 
         {selectedFilter === "Sort" && <Sort/> }    
         {selectedFilter === "Type" && <Type/>}
         {selectedFilter === "Dietary" && <DietaryNeeds/>}
         {(selectedFilter === "") && 
         ( <Center> 
            <Box data-test="MENU" title="menu-grid" className="MenuContainer" mt="30px" maxW="90%"
             justifyContent="center" p={5}>
                {categories.map((category) => ( 

                <Box data-test={`menu-items=${category.id}`} className="Menu" key={category.id} p={5} boxShadow="md"  border="2px tan solid" width="100%">
                   <Center> <Box p={2}  borderRadius="md"width="75%" mb={3}>
                        <Heading data-test={`map-item=${category.title}`} as="h2" fontFamily="'Great Vibes', cursive" padding="15px" 
                        fontSize={{ base: "30px", md: "40px", lg: "50px" }} mb={1} >
                            {category.title}
                        </Heading>
                        {category.description && (
                            <Text padding="15px"fontSize={{ base: "12px", md: "13px", lg: "14px" }} 
                            color="white">
                                {category.description}
                            </Text>
                        )}
                    </Box></Center>
                    
                    {/* <Image src={category.image?.src} objectFit="cover" w="full" h="200px" mb={3} /> */}
                     <SimpleGrid
                       templateColumns={{base:"repeat(1, 1fr)", sm:"repeat(2, 1fr)", md:"repeat(2, 1fr)" , lg:"repeat(2, 1fr)" , xl:"repeat(4, 1fr)"}} spacing={10}>  
                    {getItemsByCategory(category.id).map((item) => (
                  
                        <Link key={item.id} data-test={`items-link=${item.id}`} onClick={() => {
                                console.log(user); // 打印当前的user对象
                                navigate(`/item/${item.id}`);
                        }} _hover={{ textDecoration: "none" }}>
                                                      
                            <Box 
                            colSpan={{base: 1, sm:1,  xl: 4}}
                            borderRadius="25px"  p={2}
                            justify="space-between"
                            align="center"
                            borderWidth="1px"
                            borderColor="tan"
                            border-radius="25px"
                            padding="15px"
                            _active={{transform: "translateY(2px)", bg:"white",boxShadow: "inset  1px 1px 5px 2px rgba(210, 180, 140, 0.9)",backgroundImage: "linear-gradient(rgb(0 0 0/90%) 0 0)"}}
                            maxWidth={{ base: "100%", md: "100%", lg: "100%" }}
                            height="100%"
                             mb={2}
                             _hover={{ boxShadow: "0 0 10px 1px tan"}} >
                                <Image alt="menu-image" data-test={`item-image=${item.image}`} src={item.image?.src} borderRadius="25px" 
                                width={{base:"100%", md:"100%", lg:"100%", xl:"100%"}}
                                size={{base:"100%"}} 
                                objectFit="cover" mr={3} />
                                
                                    <Heading  data-test={`item-label=${item.label}`}  fontFamily="'Raleway', sans-serif" padding="20px" as="h3"
                                     fontSize={{ base: "12px", sm: "13px", md:"14px", lg: "15px", xl: "15px" }} >
                                        {item.label}
                                    </Heading>
                                    <Text data-test={`item-description=${item.description}`} height="6m" maxHeight="6em" textOverflow="ellipsis" fontFamily="'Raleway', sans-serif"
                                      fontSize={{ base: "11px", sm: "12px", md:"13px", lg: "14px", xl: "15px" }} 
                                         fontWeight="bold"> {item.description.length > MAX_DESCRIPTION_LENGTH
                                            ? `${item.description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
                                            : item.description} </Text>
                   
                                {/* <Text padding="15px" fontSize={{ base: "12px", md: "13px", lg: "14px" }} >{item.description}</Text>
                                 */}
                                <Text fontSize={14} fontWeight="bold" data-test={`menu-items=${item.price}`}>${item.price.toFixed(2)}</Text>
                                </Box>
                          
                         
                        </Link> 
                        
                    ))}</SimpleGrid>
                </Box>
            ))}  
       
        </Box> </Center>)}
        </>
    );
    
};

