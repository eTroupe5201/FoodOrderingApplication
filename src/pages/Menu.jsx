///* eslint-disable no-unused-vars */
///* eslint-disable react/jsx-key */
import { Center, Box, SimpleGrid, Heading, Image, Link, Text } from "@chakra-ui/react";
import { useDataProvider } from "../components/dataProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const MAX_DESCRIPTION_LENGTH = 70; // Set your desired maximum length
import { FilterNavigation } from "../components/FilterNavigation";
import { useSortProvider } from "../components/sortProvider";
import { Sort } from "../components/Sort";
import { Type } from "../components/Type";
import { DietaryNeeds } from "../components/DietaryNeeds";
import { SearchBar } from "../components/SearchBar";

// the HomePage will be our default page after log in
export const Menu = () => {
    const navigate = useNavigate();
    const { categories, getItemsByCategory, user } = useDataProvider();
    const { selectedFilter} = useSortProvider();
  
    return (
        <> 
       <FilterNavigation  />
         {selectedFilter === "Search" && <SearchBar/>}
         {selectedFilter === "Sort" && <Sort/> }    
         {selectedFilter === "Type" && <Type/>}
         {selectedFilter === "Dietary" && <DietaryNeeds/>}
         {selectedFilter === "" &&  
         ( <Center> 
            <Box title="menu-grid" className="MenuContainer" mt="30px" maxW="90%"
             justifyContent="center" p={5}>
                {categories.map((category) => ( 

                <Box  className="Menu" key={category.id} p={5} boxShadow="md"  border="2px tan solid" width="100%">
                   <Center> <Box p={2}  borderRadius="md"width="75%" mb={3}>
                        <Heading as="h2" fontFamily="'Great Vibes', cursive" padding="15px" 
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
                   
            
                        // <Link key={item.id} onClick={() => 
                        //     navigate(`/item/${item.id}`)
                        // } _hover={{ textDecoration: "none" }}>
                        <Link key={item.id} onClick={() => {
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
                             mb={2}
                             _hover={{ boxShadow: "0 0 10px 1px tan"}} >
                                <Image src={item.image?.src} borderRadius="25px" 
                                width={{base:"100%", md:"100%", lg:"100%", xl:"100%"}}
                                size={{base:"100%"}} 
                                objectFit="cover" mr={3} />
                                
                                    <Heading    fontFamily="'Raleway', sans-serif" padding="20px" as="h3"
                                     fontSize={{ base: "12px", sm: "13px", md:"14px", lg: "15px", xl: "15px" }} >
                                        {item.label}
                                    </Heading>
                                    <Text height="6m" maxHeight="6em" textOverflow="ellipsis" fontFamily="'Raleway', sans-serif"
                                      fontSize={{ base: "11px", sm: "12px", md:"13px", lg: "14px", xl: "15px" }} 
                                         fontWeight="bold"> {item.description.length > MAX_DESCRIPTION_LENGTH
                                            ? `${item.description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
                                            : item.description} </Text>
                   
                                {/* <Text padding="15px" fontSize={{ base: "12px", md: "13px", lg: "14px" }} >{item.description}</Text>
                                 */}
                                <Text fontSize={14} fontWeight="bold">${item.price.toFixed(2)}</Text>
                                </Box>
                          
                         
                        </Link> 
                        
                    ))}</SimpleGrid>
                </Box>
            ))}  
       
        </Box> </Center>)}
        </>
    );
    
};


//(Spare item): accordion design style, suitable for iOS/Android mobile devices
//import { Accordion, AccordionButton, AccordionItem, AccordionPanel,Center, Box, SimpleGrid, Heading, Image, Link, Text } from "@chakra-ui/react";

    // return (

    //     /**
    //      * The accordion component allows users to click on the title to expand and collapse the content area. 
    //      * When clicking on the AccordionButton, the associated AccordionPanel will expand or collapse, displaying or hiding its content. 
    //      * By default, the setting of defaultIndex={[0]} means that the first accordion item (with index 0) will expand by default when loaded. 
    //      * The allowMultiple property allows users to expand multiple accordion items simultaneously. If this attribute is not present, 
    //      * expanding a new accordion item will automatically collapse the previously expanded item.
    //      */

    //     //In JavaScript_ It is a placeholder that indicates not caring about the value of the element being iterated, while index is the index of the element being iterated.
    //     //Here, I passed an array containing all possible indexes through defaultIndex, which tells the<Accordion>component to expand the accordion items corresponding to these indexes by default.
    //     <Accordion defaultIndex={categories.map((_, index) => index)} allowMultiple>
    //         {categories.map((category) => (
    //             <AccordionItem key={category.id}>
    //                 <AccordionButton bg="orange.100" color="gray.700" _hover={{ bg: "orange.300", color: "white" }}>
    //                     <Box as="span" flex="1" textAlign="left">
    //                         <Heading as="h2" size="lg" my={2}>
    //                             {category.title}
    //                         </Heading>
    //                         {category.description && (
    //                             <Text color="gray.700" mb={4}>
    //                                 {category.description}
    //                             </Text>
    //                         )}
    //                     </Box>
    //                 </AccordionButton>
    //                 <AccordionPanel pb={4}>
                                
    //                     <Image
    //                         src={category.image?.src}
    //                         objectFit="cover"
    //                         w="100%"
    //                         maxH="200px"
    //                         loading="lazy"
    //                     />

    //                     {getItemsByCategory(category.id).map((item) => (
    //                         <Link
    //                             key={item.id}
    //                             onClick={() => navigate(`/item/${item.id}`)}
    //                             _hover={{ textDecoration: "none" }}
    //                         >
    //                             <Flex
    //                                 px={4}
    //                                 py={2}
    //                                 justify="space-between"
    //                                 borderBottom="1px solid"
    //                                 borderColor="gray.100"
    //                                 _hover={{ backgroundColor: "gray.100" }}
    //                             >
    //                                 <Flex gap={2}>
    //                                     <Image
    //                                         width="40px"
    //                                         height="40px"
    //                                         objectFit="cover"
    //                                         src={item.image?.src}
    //                                     />
    //                                     <Box>
    //                                         <Heading as="h3" fontSize="14px" color="gray.800">
    //                                             {item.label}
    //                                         </Heading>
    //                                         <Text>{item.description}</Text>
    //                                     </Box>
    //                                 </Flex>
    //                                 <Text>${item.price.toFixed(2)}</Text>
    //                             </Flex>
    //                         </Link>
    //                     ))}
    //                 </AccordionPanel>
    //             </AccordionItem>
    //         ))}
    //     </Accordion>
    // );