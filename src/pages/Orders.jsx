import { HStack, Center, Box, Heading, Text, Button, SimpleGrid, AlertDialog, AlertDialogOverlay, AlertDialogHeader, AlertDialogContent, AlertDialogBody, AlertDialogFooter, useDisclosure} from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import { useDataProvider } from "../components/dataProvider"
import { useNavigate } from "react-router-dom"
import { TiPlus } from "react-icons/ti";
import React from "react";

/* This page contains historical order information, allowing the guest to replace the order.
*/
export const Orders = () => {
    const { id } = useParams();
    const { getOrderById, orderHistory, checkCartNotEmpty, addToCart,clearCartAfterConfirmation} = useDataProvider();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const navigate = useNavigate();
    const currOrder = getOrderById(id || "");

    const handleReplaceOrder = async () => {
        onClose();
        //for each item in currOrder, do addToCart
        currOrder?.lines?.forEach((item) => {
            console.log(item);
            addToCart(item);
        });

        return;
    }

    return (        
        <Center mb='10rem'>
        <SimpleGrid columns={2} templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" , lg: "repeat(2, 1fr)" , xl: "repeat(2, 1fr)" }}>

        <Center mt='4rem'>
                <Box title='order-summary-box' id='order-summary-box' fontFamily="'Raleway', sans-serif" bg='#000000' color='#fff' w={{base:"20em", sm:"25em", md:"30em"}} height='100%' m='2rem' p='1.5rem' borderRadius='md'> 
                    <Heading fontSize='25px' pb='1rem' fontFamily="'Raleway', sans-serif" > Order History </Heading>
                        <HStack fontWeight="bold">
                            <Text w='60px'> Details </Text>
                            <Text w='200px'> Date/Time </Text>
                            <Text w='100px'> # of Items </Text>
                            <Text w='80px' > Total </Text>
                        </HStack>
                        {orderHistory?.map((order) => (
                            <HStack key={order.id} mt="15px" fontWeight={(currOrder.id===order.id)? ("bold") : ("")}>
                                <Button  
                                    w='30px' 
                                    onClick={()=>{navigate(`/orders/${order.id}`)}} 
                                    _hover={{ textDecoration: "none" }}
                                    mr='20px'
                                > 
                                    <Center > <TiPlus /> </Center>
                                </Button>
                                <Text w='200px'> {(order.pickupTime).toDate().toLocaleString()} </Text>
                                <Center w='100px'> {order.lines.length} </Center>
                                <Text w='80px' > ${order.total} </Text>
                            </HStack>
                        ))}
                </Box>
            </Center>

                <Box title='order-detailed-history-box' id='order-detailed-history-box' fontFamily="'Raleway', sans-serif" bg='#000000' color='#fff' w={{base:"20em", sm:"25em", md:"30em"}} height='100%' m='2rem' p='1.5rem' borderRadius='md'> 
                    <Heading fontSize='25px' pb='1rem' fontFamily="'Raleway', sans-serif" > Order Confirmation </Heading>
                    <Text> Confirmation Number / Order ID: {currOrder.id}</Text>
                    <Text mt='10px'> Order Date/Time: {(currOrder.pickupTime).toDate().toLocaleString()}</Text>
                    <Text mt='10px' mb='30px'> Placed by: {currOrder.firstName} {currOrder.lastName}</Text>
                    {currOrder?.lines?.map((item) => (
                        <HStack key={item.id} mt='10px' justifyContent='center' fontWeight='bold'>
                            <Text w='50px'> {item.quantity} </Text>
                            <Text w='300px'> {item.label} </Text>
                            <Text w='50px'> ${item.price} </Text>
                        </HStack>
                    ))}
                    <HStack mt='15px' justifyContent='center'fontWeight='bold'>
                        <Text w='350px' align='right'> Total: </Text>
                        <Text align='right'> ${currOrder.total} </Text>
                    </HStack>
                    <Text mt='15px' fontWeight='bold'> Order Comments: </Text>
                    <Text > {currOrder.comments} </Text>
                    <Center mt='30px' >
                        <Button as='button' fontWeight='bold' onClick={checkCartNotEmpty ? (onOpen) : (handleReplaceOrder())}> Copy Order </Button>
                    </Center>
                </Box>    
        </SimpleGrid>

        <AlertDialog
             isOpen={isOpen}
             leastDestructiveRef={cancelRef}
             onClose={onClose}
           >
             <AlertDialogOverlay>
               <AlertDialogContent>
                 <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                   Copy Prior Order
                 </AlertDialogHeader>
     
                 <AlertDialogBody>
                   You have items in your cart already. Copying this previous order will delete your existing cart. Do you want to move forward with deleting the existing cart so you can copy this order?
                 </AlertDialogBody>
     
                 <AlertDialogFooter>
                   <Button ref={cancelRef} onClick={onClose}>
                     Cancel
                   </Button>
                   <Button 
                    colorScheme='red'
                    ml={3} 
                    onClick={() => {
                        clearCartAfterConfirmation(); 
                        handleReplaceOrder();
                    }} 
                    >
                     Copy Order
                   </Button>
                 </AlertDialogFooter>
               </AlertDialogContent>
             </AlertDialogOverlay>
           </AlertDialog>
         
        </Center>
    );
}