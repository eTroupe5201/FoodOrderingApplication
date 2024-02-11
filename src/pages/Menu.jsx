/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Flex, Heading, Image, Link, Text, Grid } from "@chakra-ui/react";
import { useDataProvider } from "../components/dataProvider";
import { useNavigate } from "react-router-dom";

// the HomePage will be our default page after log in
export const Menu = () => {
    const navigate = useNavigate();
    const { categories, getItemsByCategory } = useDataProvider();

    return (
        <Grid templateColumns="repeat(2, minmax(400px, 1fr))" gap={6} alignItems="flex-start">
            {categories.map((category) => (
                <Box key={category.id} p={5} boxShadow="md" >
                    <Box p={2} color="gray.700" bg="orange.100" borderRadius="md" mb={3} _hover={{ bg: "orange.300" }}>
                        <Heading as="h2" fontSize="20px" mb={1} >
                            {category.title}
                        </Heading>
                        {category.description && (
                            <Text fontSize="14px" color="gray.600">
                                {category.description}
                            </Text>
                        )}
                    </Box>
                    
                    <Image src={category.image?.src} objectFit="cover" w="full" h="200px" mb={3} />
                    
                    {getItemsByCategory(category.id).map((item) => (
                        <Link key={item.id} onClick={() => navigate(`/item/${item.id}`)} _hover={{ textDecoration: "none" }}>
                            <Flex
                                p={2}
                                justify="space-between"
                                align="center"
                                borderWidth="1px"
                                borderColor="gray.200"
                                mb={2}
                                _hover={{ backgroundColor: "gray.100" }}
                            >
                                <Image src={item.image?.src} boxSize="50px" objectFit="cover" mr={3} />
                                <Box flex="1">
                                    <Heading as="h3" fontSize="14px" color="gray.800">
                                        {item.label}
                                    </Heading>
                                    <Text fontSize={12}>{item.description}</Text>
                                </Box>
                                <Text fontSize={14} fontWeight="bold">${item.price.toFixed(2)}</Text>
                            </Flex>
                        </Link>
                    ))}
                </Box>
            ))}
        </Grid>
    );
    
};


//(Spare item): accordion design style, suitable for iOS/Android mobile devices

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