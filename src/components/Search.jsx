import React from "react";
import { Link } from "react-router-dom";
import { Center, Box, SimpleGrid, Heading, Image, Text } from "@chakra-ui/react";
const MAX_DESCRIPTION_LENGTH = 70; // Set your desired maximum length
import { useDataProvider } from "../components/dataProvider";

export const Search = () => {

    const { searchedItem, categories, getItemsByCategory , updateSelectedFilter, updateSelectedOption} = useDataProvider();
    updateSelectedOption("");
    if(searchedItem === ""){
        updateSelectedFilter("");
    }
    

    console.log("searchedItem in search", searchedItem);

    // Filter items based on the search searchedItem
    const filteredItems = categories.flatMap((category) =>
        getItemsByCategory(category.id).filter((item) => {
            const lowerCaseSearchedItem = searchedItem.toLowerCase();
            const lowerCaseTitle = item.title ? item.title.toLowerCase() : "";
            const lowerCaseDietaryNeeds = item.dietaryNeeds ? item.dietaryNeeds.toLowerCase() : "";
            const lowerCaseDescription = item.description ? item.description.toLowerCase() : "";
            return (
                lowerCaseTitle.includes(lowerCaseSearchedItem) ||
                lowerCaseDietaryNeeds.includes(lowerCaseSearchedItem) ||
                lowerCaseDescription.includes(lowerCaseSearchedItem)
            );
        })
    );

    return (
        
        <Center>
            <Box title="menu-grid" className="MenuContainer" mt="30px" maxW="90%" justifyContent="center" p={5}>

                <Box className="Menu" p={5} boxShadow="md" border="2px tan solid" width="100%">
                    <Center>
                        <Box p={2} borderRadius="md" width="75%" mb={3}>
                            <Heading as="h2" fontFamily="'Great Vibes', cursive" padding="15px" fontSize={{ base: "30px", md: "40px", lg: "50px" }} mb={1}>
                                Search Results
                            </Heading>

                        </Box>
                    </Center>

                    {filteredItems.length === 0 && ( // Check if no items are found after filtering
                        <Text>No results found for  &quot;{searchedItem}&quot;</Text>
                    )}

                    <SimpleGrid templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(2, 1fr)", xl: "repeat(4, 1fr)" }} spacing={10}>
                        {filteredItems.map((item) => (
                            <Link key={item.id} to={`/item/${item.id}`} _hover={{ textDecoration: "none" }}>
                                <Box colSpan={{ base: 1, sm: 1, xl: 4 }} borderRadius="25px" p={2} justify="space-between" align="center" borderWidth="1px" borderColor="tan" padding="15px" _
                                    _active={{transform: "translateY(2px)", bg:"white",boxShadow: "inset  1px 1px 5px 2px rgba(210, 180, 140, 0.9)",backgroundImage: "linear-gradient(rgb(0 0 0/90%) 0 0)"}}
                       
                                 maxWidth={{ base: "100%", md: "100%", lg: "100%" }} mb={2} _hover={{ boxShadow: "0 0 10px 1px tan" }}>
                                    <Image src={item.image?.src} borderRadius="25px" width={{ base: "100%", md: "100%", lg: "100%", xl: "100%" }} size={{ base: "100%" }} objectFit="cover" mr={3} />

                                    <Heading fontFamily="'Raleway', sans-serif" padding="20px" as="h3" fontSize={{ base: "12px", sm: "13px", md: "14px", lg: "15px", xl: "15px" }} >
                                        {item.label}
                                    </Heading>
                                    <Text height="6m" maxHeight="6em" textOverflow="ellipsis" fontFamily="'Raleway', sans-serif" fontSize={{ base: "11px", sm: "12px", md: "13px", lg: "14px", xl: "15px" }} fontWeight="bold">
                                        {item.description.length > MAX_DESCRIPTION_LENGTH
                                            ? `${item.description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
                                            : item.description}
                                    </Text>
                                    <Text fontSize={14} fontWeight="bold">${item.price.toFixed(2)}</Text>
                                </Box>
                            </Link>
                        ))}
                    </SimpleGrid>

                </Box>

            </Box>
        </Center>
    );
}
