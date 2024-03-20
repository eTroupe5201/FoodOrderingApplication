import { Link, useNavigate } from "react-router-dom";
import { Box, Flex, Heading, IconButton, VStack, Text, Divider } from "@chakra-ui/react";
import { GrClose } from "react-icons/gr";
import { useDataProvider } from "../components/dataProvider";
// import { BottomButton } from "../components/BottomButton";
import { calculateOrderSubtotal, calculateOrderTax, calculateOrderTotal } from "../utils/calculations";
import { Button, Modal, ModalContent, ModalOverlay, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { useEffect } from "react";
export const CartModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { fetchCartItems, removeCartItem, lines, setLines} = useDataProvider();

    useEffect(() => {
        // Define an asynchronous function to retrieve shopping cart items
        const fetchItems = async () => {
          try {
            const items = await fetchCartItems();
            // Directly use setLines from middleware to update the status of lines
            setLines(items); // This assumes that setLines is passed from middleware
          } catch (error) {
            console.log(error.message);
          }
        };
      
        // Calling asynchronous functions
        fetchItems();
      }, [fetchCartItems,setLines]);

    // const close = () => {
    //     this.close();
    // }

    return (
        <div data-testid="cart-modal">
        <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInRight">
            <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(-10deg)' />
            <ModalContent
                position="fixed"
                background="black"
                color="white"
                top="0"
                right="0"
                bottom="0"
                ml="0"
                mt="0"
                height="100svh" // Make the modal full height
                width={{ base: "100%", md: "50%", lg: "50%", xl: "50%" }}
                boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
                borderRadius="0"
                justifyContent="center" // Center content vertically
                padding="1rem"
            >
                <ModalHeader title="cart-modal-header">Shopping Cart</ModalHeader>
                <ModalCloseButton
                    color="white"
                    background="black"
                    border="white solid 1px"
                    _hover={{ boxShadow: "0 0 10px 1px tan" }}
                    title="cart-modal-close-button"
                />
                <ModalBody>

                <VStack title="cart-modal-lines" px={4} py={2} mt={4} fontFamily="'Raleway', sans-serif">
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
                        <Divider />
                        <VStack title="cart-modal-costs" w="100%">
                            <Flex w="100%" justify="space-between" color="white">
                                <Text fontSize={12}>Sub-Total</Text>
                                <Text fontSize={12}>${calculateOrderSubtotal(lines).toFixed(2)}</Text>
                            </Flex>
                            <Flex w="100%" justify="space-between" color="white">
                                <Text fontSize={12}>Taxes (10%)</Text>
                                <Text fontSize={12}>${calculateOrderTax(lines, 13).toFixed(2)}</Text>
                            </Flex>
                            <Flex w="100%" justify="space-between">
                                <Heading fontSize={16}>Total</Heading>
                                <Heading fontSize={16}>
                                    ${calculateOrderTotal(lines, 10).toFixed(2)}
                                </Heading>
                            </Flex>
                        </VStack>
                    </VStack>
                </ModalBody>
                <ModalFooter title="cart-modal-footer">
                    <Link to="/menu">
                        <Button
                            title="continue-button"
                            mr={3}
                            color="white"
                            background="black"
                            border="white solid 1px"
                            _hover={{ boxShadow: "0 0 10px 1px tan" }}
                            onClick={onClose}
                        >
                            Continue Shopping
                        </Button>
                    </Link>
                    <Link to="/checkout">
                        <Button
                            color="white"
                            background="black"
                            border="white solid 1px"

                            _hover={{ boxShadow: "0 0 10px 1px tan" }}
                            onClick={() => {
                                navigate("/checkout");
                                onClose();
                            }}
                            total={calculateOrderTotal(lines, 10).toFixed(2)}
                        >
                            Checkout
                        </Button>
                    </Link>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </div>
    );
};
