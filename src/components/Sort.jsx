import { useNavigate } from "react-router-dom";
import { Box, Center, Heading, Link, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { useDataProvider } from "../components/dataProvider";

const MAX_DESCRIPTION_LENGTH = 70;

export const Sort = () => {
  const navigate = useNavigate();
  const {selectedOption , categories, getItemsByCategory } = useDataProvider();

  // Render items based on the selected sorting option
  const renderItems = (category) => {
    const items = getItemsByCategory(category.id);

    // Sort items based on the selected option
    const sortedItems = items.slice().sort((a, b) => {
      if (selectedOption === "PriceLowToHigh") {
        return a.price - b.price;
      } else if (selectedOption === "PriceHighToLow") {
        return b.price - a.price;
      }
      return 0; // Default sorting order
    });

    return sortedItems.map((item) => (
      // Render each item here
      <Link
        data-test={`sorted-item-id=${item.id}`}

        key={item.id}
        onClick={() => navigate(`/item/${item.id}`)}
        _hover={{ textDecoration: "none" }}
      >
        <Box

          data-test="Sort-item"
          borderRadius="25px"
          p={2}
          height="100%"

          justify="space-between"
          align="center"
          borderWidth="1px"
          borderColor="tan"
          padding="15px"
          _active={{transform: "translateY(2px)", bg:"white",boxShadow: "inset  1px 1px 5px 2px rgba(210, 180, 140, 0.9)",backgroundImage: "linear-gradient(rgb(0 0 0/90%) 0 0)"}}       
          maxWidth={{ base: "100%", md: "100%", lg: "100%" }}
          mb={2}
          _hover={{ boxShadow: "0 0 10px 1px tan" }}
        >
          <Image
            data-test={`sorted-item-image=${item.image}`}
            src={item.image?.src}
            borderRadius="25px"
            width={{ base: "100%", md: "100%", lg: "100%", xl: "100%" }}
            size="100%"
            objectFit="cover"
            mr={3}
          />
          <Heading
            data-test={`sorted-item-label=${item.label}`}
            fontFamily="'Raleway', sans-serif"
            padding="20px"
            as="h3"
            fontSize={{ base: "12px", sm: "13px", md: "14px", lg: "15px", xl: "15px" }}
          >
            {item.label}
          </Heading>
          <Text
            data-test={`sorted-item-description=${item.description}`}
            height="6m"
            maxHeight="6em"
            textOverflow="ellipsis"
            fontFamily="'Raleway', sans-serif"
            fontSize={{ base: "11px", sm: "12px", md: "13px", lg: "14px", xl: "15px" }}
            fontWeight="bold"
          >
            {item.description.length > MAX_DESCRIPTION_LENGTH
              ? `${item.description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
              : item.description}
          </Text>

          <Text data-test={`sorted-item-price=${item.price}`} fontSize={14} fontWeight="bold">
            ${item.price.toFixed(2)}
          </Text>
        </Box>
      </Link>
    ));
  };

  return (
    <Center>
      <Box
        title="menu-grid"
        className="MenuContainer"
        mt="30px"
        maxW="90%"
        justifyContent="center"
        p={5}
      >
        {categories.map((category) => (
          <Box
            data-test={`sorted-item-category-id=${category.id}`}
            key={category.id}
            className="Menu"
            p={5}
            boxShadow="md"
            border="2px tan solid"
            width="100%"
          >
            <Center>
              <Box p={2} borderRadius="md" width="75%" mb={3}>
                <Heading
                  data-test={`sorted-category-title=${category.title}`}
                  as="h2"
                  fontFamily="'Great Vibes', cursive"
                  padding="15px"
                  fontSize={{ base: "30px", md: "40px", lg: "50px" }}
                  mb={1}
                >
                  {category.title}
                </Heading>
                {category.description && (
                  <Text
                    data-test={`sorted-category-title=${category.description}`}
                    padding="15px"
                    fontSize={{ base: "12px", md: "13px", lg: "14px" }}
                    color="white"
                  >
                    {category.description}
                  </Text>
                )}
              </Box>
            </Center>
            <SimpleGrid
              templateColumns={{
                base: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(2, 1fr)",
                xl: "repeat(4, 1fr)",
              }}
              spacing={10}
            >
              {renderItems(category)}
            </SimpleGrid>
          </Box>
        ))}
      </Box>
    </Center>
  );
};
