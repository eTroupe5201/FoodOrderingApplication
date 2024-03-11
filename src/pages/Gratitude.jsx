import {  Heading, Icon, VStack, Text, Button } from "@chakra-ui/react";
import { useDataProvider } from "../components/dataProvider";
import {
    MdOutlineCelebration,
    MdCancel,
    MdHourglassBottom,
} from "react-icons/md";
import  { useEffect} from "react";
import { useNavigate } from "react-router-dom";

const GratitudeContent = () => {
    const { order, setOrder, setPickupOrderStatus, clearCartAfterConfirmation, generateOrder, handleOrder, findAndAssignDeliveryPerson, setCartChanged  } = useDataProvider();
    const navigate = useNavigate();

    useEffect(() => {
        if (!window.paypal || !order?.id || order?.status !== "pending") {
            console.log("PayPal not loaded or order not in pending status.");
            return;
        }

        window.paypal.Buttons({
            createOrder: (data, actions) => {
                return generateOrder().then(orderId => {
                    // handle error situation
                    if (orderId.error) {
                        console.error("Error creating PayPal order:", orderId.error);
                        // can handle errors here, such as displaying prompt information to the user
                        return actions.reject(); // Refuse to create order
                    }
                    return orderId; // Directly return the order ID
                });
            },
            onApprove: async (data, actions) => {
                // Check order status to avoid duplicate capture
                if (order.status === "confirmed") {
                    console.log("Order already confirmed. Skipping capture.");
                    return;
                }
                
                const updatedOrder = await handleOrder(data.orderID);
                if (updatedOrder.error) {
                    console.error("Error handling PayPal order:", updatedOrder.error);
                    return; // exit the function
                }
                console.log(`Order captured successfully: ${updatedOrder.id}`);
                setOrder(updatedOrder); // make sure call setOrder promptly
                alert("THANKS FOR YOUR ORDER");
            },
            // onError: (error) => {
            //     // Use optional chain operators to securely access the error property
            //     console.error('Payment error:', error?.message || error);

            //     // User friendly error handling logic can be added here
            //     alert(`Payment failed: ${error?.message || 'Unknown error'}`);
            // }
        }).render("#paypal-button"); // Ensure that the ID matches the elements in the HTML

        // Cleanup function
        return () => {
            // Check if the PayPal buttons exist and if so, remove them
            try {
                const paypalButtonContainer = document.getElementById("paypal-button");
                if (paypalButtonContainer) {
                paypalButtonContainer.innerHTML = "";
                }
            } catch (error) {error.message}
        };
    
    }, [order?.id, order?.status, window.paypal]); 
    
    if (!order) { return null; }

    const handleClick = async () => {
        if (order.receiveMethod === "delivery") {
            const response = await findAndAssignDeliveryPerson();

            navigate("/info", {
                state: {
                    deliveryPersonFirstName: response.deliveryPersonFirstName,
                    deliveryPersonLastName: response.deliveryPersonLastName,
                    estimatedDeliveryTime: response.estimatedDeliveryTime,
                },
            });
        }
        else if (order.receiveMethod === "pickup") {
            navigate("/info");
        }
    };

    const handlePayAtRestaurant = async () => {
        if (order.status === "confirmed") {
            console.log("Order already confirmed. Skipping capture.");
            return;
        }        

        const updatedOrder = await setPickupOrderStatus();

        if (updatedOrder.error) {
            console.error("Error with setPickupOrderStatus:", updatedOrder.error);
            return; // exit the function
        }

        console.log(`Order captured successfully: ${updatedOrder.id}`);
        setOrder(updatedOrder); // make sure call setOrder promptly
    };

    if (order.status === "pending") {
        if (order.receiveMethod === "delivery") {
            //require advance payment via PayPal 
            return (
                <>
                    <Icon as={MdHourglassBottom} w={24} h={24} color="gray.700" />
                    <Heading textAlign="center">Waiting for a confirmation</Heading>
                    <Text textAlign="center">
                        Your order has been placed. Please go to pay the bill.
                    </Text>
                    <div id="paypal-button" style={{ width: "80%", maxWidth: "300px", height: "auto", display: "block", margin: "0 auto" }}></div>
                </>
            );
        }
        else if (order.receiveMethod === "pickup") {
            //allow Paypal or paying at the restaurant upon arrival
            return (
                <>
                    <Icon as={MdHourglassBottom} w={24} h={24} color="gray.700" />
                    <Heading textAlign="center">Waiting for a confirmation</Heading>
                    <Text textAlign="center">
                        Your order has been placed. Please select your form of payment to confirm your order.
                    </Text>
                    <Button 
                        id="pay-at-restaurant-button" 
                        width= "80%"
                        maxWidth= "300px" 
                        height= "50px" 
                        margin= "0 auto"
                        border="3px outset tan" 
                        color="white" 
                        bg="black"
                        _hover={{ color:"black", bg:"white" }}
                        onClick = {handlePayAtRestaurant}
                        >
                        Pay at Restaurant
                    </Button>  
                    <div id="paypal-button" style={{ width: "80%", maxWidth: "300px", height: "auto", display: "block", margin: "0 auto" }}></div>
                </>
            );
        }
    }

    if (order.status === "cancelled") {
        console.log("order cancelled");
        return (
            <>
                <Icon as={MdCancel} w={24} h={24} color="gray.700" />
                <Heading textAlign="center">Order Cancelled</Heading>
                <Text textAlign="center">
                    Your order has been cancelled. Please contact the restaurant for more
                    information.
                </Text>
            </>
        );
    }

    if (order.status === "confirmed") {
        clearCartAfterConfirmation();
        setCartChanged(true);

        // clearOrderAfterConfirmation(); // don't need to clear up the order. Not in line with business logic, a user can have multiple orders
        //as long as not the status of cancelled or pending, will render confirmed page

        let confirmMsg;

        if (order.receiveMethod === "delivery")     {
            confirmMsg = "See you soon! Your order has been confirmed and will be delivered as soon as possible.";
        }
        else if (order.receiveMethod === "pickup")  {
            confirmMsg = "See you soon! Your order has been confirmed and and will be ready for pickup shortly.";
        }

        return (
            <>
                <Icon as={MdOutlineCelebration} w={24} h={24} color="gray.700" />
                <Heading textAlign="center">Order Confirmed</Heading>
                <Text textAlign="center"> {confirmMsg} </Text>
                <Button
                    colorScheme="blue"
                    onClick={handleClick}
                >
                    View Your Info
                </Button>
            </>
        );
    }
};

export const Gratitude = () => {
    return (
        <VStack title="gratitude-content-stack" gap={4} mt={4} mx={4}>
            <GratitudeContent/>
        </VStack>
    );
};