import { Box, Flex, Heading, IconButton, VStack, Text, Divider, } from "@chakra-ui/react";
import { GrClose } from "react-icons/gr";
import  { useEffect} from "react";
import { useDataProvider } from "../components/dataProvider"
import { BottomButton } from "../components/BottomButton";
import { useNavigate } from "react-router-dom";
import { calculateOrderSubtotal, calculateOrderTax, calculateOrderTotal } from "../utils/calculations"

//Page for cart management
export const Cart = () => {

    //we change the logic here,we fetch the item data from the database and setlines in cart page, for cancelling item 
    const navigate = useNavigate();
    const { fetchCartItems, removeCartItem, lines, setLines} = useDataProvider();

    useEffect(() => {
        // Define an asynchronous function to retrieve shopping cart items
        const fetchItems = async () => {
          const items = await fetchCartItems();
          // Directly use setLines from middleware to update the status of lines
          setLines(items); // This assumes that setLines is passed from middleware
        };
      
        // Calling asynchronous functions
        fetchItems();
      }, [fetchCartItems, setLines]);

    return (
        /**
         * in Item.jsx, I have used addToCart function to add all values to the lines array
         * when you open the console, you can see all the attributes into that array, which come from the tackle outcome from handleSubmit
         * the sample lines array is below(from chrome): and we will iterate it and retrieve the items we want
         * 0
            instructions “”
            label:  "beef burger"
            price: 15
            quantity: 2
            value: Array(1)
                0: 
                price: 1
                value: "spicy saurce"
                variant: "spicy"
         * 
         */
        <VStack px={4} py={2} mt={4} font-family="'Raleway', sans-serif">
            {lines.map((line, index) => (
                <Flex key={index} justify="space-between" w="100%">
                    <Heading flex={1} fontSize={16} maxW={50}>
                        {/*1* 2* */}
                        {line.quantity}x
                    </Heading>
                    <Box flex={5}>
                        {/* 2* beef burger */}
                        <Heading fontSize={16}>{line.label}</Heading>
                        {line.value?.map((value, valueIndex) => (
                             /* 2* beef burger spicy saurce */
                            <Text key={valueIndex} color="red">{value.value}</Text>
                        ))}
                    </Box>
                    <Box flex={1}>
                        <Heading fontSize={16} textAlign="right">
                            {/* 2* beef burger spicy saurce $16*/}
                            ${line.price.toFixed(2)}
                        </Heading>
                        {line.value?.map((value, valueIndex) => (
                            <Text key={valueIndex} textAlign="right" color="gray.600">
                                {/* 2* beef burger spicy saurce+$1.00 $16*/}
                                +${value.price.toFixed(2)}
                            </Text>
                        ))}
                    </Box>
                    <Flex justify="flex-end" flex={1} maxW={10}>
                        <IconButton
                            size="xs"
                            variant="ghost"
                            onClick={() => removeCartItem(line.id)}
                            icon={<GrClose />}
                            aria-label="Remove from cart"
                            
                        />
                    </Flex>
                </Flex>
            ))}
            {/*The Divider displays a thin horizontal or vertical line, and renders an hr tag.*/}
            <Divider />
            <VStack w="100%">
                <Flex w="100%" justify="space-between" color="gray.600">
                    <Text fontSize={12}>Sub-Total</Text>
                    <Text fontSize={12}>${calculateOrderSubtotal(lines).toFixed(2)}</Text>
                </Flex>
                <Flex w="100%" justify="space-between" color="gray.600">
                    <Text fontSize={12}>Taxes (10%)</Text>
                    <Text fontSize={12}>${calculateOrderTax(lines, 10).toFixed(2)}</Text>
                </Flex>
                <Flex w="100%" justify="space-between">
                    <Heading fontSize={16}>Total</Heading>
                    <Heading fontSize={16}>
                        ${calculateOrderTotal(lines, 10).toFixed(2)}
                    </Heading>
                </Flex>
            </VStack>
            <BottomButton
                label="Go to checkout"
                onClick={() => navigate("/checkout")}
                total={calculateOrderTotal(lines, 10).toFixed(2)}
            />
        </VStack>
    );
};