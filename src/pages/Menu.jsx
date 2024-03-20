import { Box, Center, Heading, Image, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { useDataProvider } from "../components/dataProvider";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FilterNavigation } from "../components/FilterNavigation";
import { Sort } from "../components/Sort";
import { Type } from "../components/Type";
import { DietaryNeeds } from "../components/DietaryNeeds";
import { Search } from "../components/Search";

const MAX_DESCRIPTION_LENGTH = 70;
const itemImageWidth = "260px";
const itemImageHeight = "173px";

export const Menu = () => {
    const navigate = useNavigate();
    const { selectedFilter, categories, getItemsByCategory, user } = useDataProvider();

    return (
        <Box maxW="100%" mx="auto">
            <Helmet>
                <meta
                    name="Description"
                    content="Welcome to our food ordering application. Browse through our menu and place your order online. Enjoy delicious meals delivered right to your doorstep."
                />
            </Helmet>

            <FilterNavigation />
            {selectedFilter === "Search" && <Search />}
            {selectedFilter === "Sort" && <Sort />}
            {selectedFilter === "Type" && <Type />}
            {selectedFilter === "Dietary" && <DietaryNeeds />}
            {(selectedFilter === "") && (
                <Center>
                    <Box alignItems="center" textAlign="center" mt="30px" maxW="90%" p={5}>
                        {categories.map((category) => (
                            <Box key={category.id} p={5} boxShadow="md" border="2px tan outset" color="white" bg="black" borderRadius="25px" width="100%">
                                <Center>
                                    <Box p={2} borderRadius="md" width="75%" mb={3}>
                                        <Heading as="h2" fontFamily="'Great Vibes', cursive" padding="15px" fontSize={{ base: "30px", md: "40px", lg: "50px" }} mb={1}>
                                            {category.title}
                                        </Heading>
                                        {category.description && (
                                            <Text padding="15px" fontSize={{ base: "12px", md: "13px", lg: "14px" }} color="white">
                                                {category.description}
                                            </Text>
                                        )}
                                    </Box>
                                </Center>
                                <SimpleGrid
                                    templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }}
                                    spacing={10}>
                                    {getItemsByCategory(category.id).map((item) => (
                                        <Link key={item.id} href={`/item/${item.id}`} onClick={(e) => {
                                            e.preventDefault();
                                            navigate(`/item/${item.id}`);
                                        }} _hover={{ textDecoration: "none" }}>
                                            <Box borderRadius="25px"  borderWidth="1px" borderColor="tan" padding="15px"
                                                _active={{ transform: "translateY(2px)", bg: "white", boxShadow: "inset 1px 1px 5px 2px rgba(210, 180, 140, 0.9)" }}
                                                _hover={{ boxShadow: "0 0 10px 1px tan" }}>
                                                <Center>
                                                    <Image ml="10px" alt="menu-photo" src={item.image?.src} borderRadius="25px" width={itemImageWidth} height={itemImageHeight} objectFit="cover" mr={3} />
                                                </Center>
                                                <Heading as="h3" fontFamily="'Raleway', sans-serif" padding="20px" fontSize={{ base: "12px", sm: "13px", md: "14px", lg: "15px", xl: "15px" }} >
                                                    {item.label}
                                                </Heading>
                                                <Text height="6em" maxHeight="6em" overflow="hidden" textOverflow="ellipsis" fontFamily="'Raleway', sans-serif" fontSize={{ base: "11px", sm: "12px", md: "13px", lg: "14px", xl: "15px" }} fontWeight="bold">
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
                        ))}
                    </Box>
                </Center>)}
        </Box>
    );
};
