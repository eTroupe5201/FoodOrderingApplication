import { Link} from "react-router-dom";
import { Center, Box, SimpleGrid, Heading, Image, Text } from "@chakra-ui/react";
const MAX_DESCRIPTION_LENGTH = 70; // Set your desired maximum length
import { useDataProvider } from "../components/dataProvider";

export const Type = () => {

    const { selectedOption, categories, getItemsByCategory } = useDataProvider();
    console.log("Selected option:", selectedOption);

    return (
        <>
            {categories.map((category) => {
                if (category.title === selectedOption) {
                    return (
                        <Center key={category.id}>
                            <Box title="menu-grid" className="MenuContainer" mt="30px" maxW="90%" justifyContent="center" p={5}>
                                <Box className="Menu" key={category.id} p={5} boxShadow="md" border="2px tan solid" width="100%">
                                    <Center>
                                        <Box p={2} borderRadius="md" width="75%" mb={3}>
                                            <Heading  data-test={`Type-Category-Title=${category.title}`} as="h2" fontFamily="'Great Vibes', cursive" padding="15px" fontSize={{ base: "30px", md: "40px", lg: "50px" }} mb={1}>
                                                {category.title}
                                            </Heading>
                                            {category.description && (
                                                <Text padding="15px" fontSize={{ base: "12px", md: "13px", lg: "14px" }} color="white">
                                                    {category.description}
                                                </Text>
                                            )}
                                        </Box>
                                    </Center>

                                    <SimpleGrid templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(2, 1fr)", xl: "repeat(4, 1fr)" }} spacing={10}>
                                        {getItemsByCategory(category.id).map((item) => (
                                            <Link  data-test={`type-link-item-id=${item.id}`} key={item.id} to={`/item/${item.id}`} _hover={{ textDecoration: "none" }}>
                                                <Box  height="100%" colSpan={{ base: 1, sm: 1, xl: 4 }} borderRadius="25px" p={2} justify="space-between" align="center" borderWidth="1px" borderColor="tan" padding="15px" 
                                                _active={{ transform: "translateY(2px)", bg: "white", boxShadow: "inset  1px 1px 5px 2px rgba(210, 180, 140, 0.9)", backgroundImage: "linear-gradient(rgb(0 0 0/90%) 0 0)" }} maxWidth={{ base: "100%", md: "100%", lg: "100%" }} mb={2} _hover={{ boxShadow: "0 0 10px 1px tan" }}>
                                                    <Image  data-test={`type-item-image=${item.image}`}src={item.image?.src} borderRadius="25px" width={{ base: "100%", md: "100%", lg: "100%", xl: "100%" }} size={{ base: "100%" }} objectFit="cover" mr={3} />

                                                    <Heading  data-test={`type-item-label=${item.label}`} fontFamily="'Raleway', sans-serif" padding="20px" as="h3" fontSize={{ base: "12px", sm: "13px", md: "14px", lg: "15px", xl: "15px" }} >
                                                        {item.label}
                                                    </Heading>
                                                    <Text  data-test={`type-item-desription=${item.description}`} height="6m" maxHeight="6em" textOverflow="ellipsis" fontFamily="'Raleway', sans-serif" fontSize={{ base: "11px", sm: "12px", md: "13px", lg: "14px", xl: "15px" }} fontWeight="bold">
                                                        {item.description.length > MAX_DESCRIPTION_LENGTH
                                                            ? `${item.description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
                                                            : item.description}
                                                    </Text>
                                                    <Text data-test={`type-item-price=${item.price}`} fontSize={14} fontWeight="bold">${item.price.toFixed(2)}</Text>
                                                </Box>
                                            </Link>
                                        ))}
                                    </SimpleGrid>
                                </Box>
                            </Box>
                        </Center>
                    );
                } else {
                    return null; // Render nothing if title doesn't match
                }
            })}
        </>
    );
}