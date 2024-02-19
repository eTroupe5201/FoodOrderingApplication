import { Box, Heading, Icon, VStack, Text } from "@chakra-ui/react";
import { useDataProvider } from "../components/dataProvider";
import {
    MdOutlineCelebration,
    MdCancel,
    MdHourglassBottom,
} from "react-icons/md";

const GratitudeContent = () => {
    const { order, clearCartAfterConfirmation } = useDataProvider();

    if (!order) return null;

    if (order.status === "pending") {
        return (
            <>
                <Icon as={MdHourglassBottom} w={24} h={24} color="gray.700" />
                <Heading textAlign="center">Waiting for a confirmation</Heading>
                <Text textAlign="center">
                    Your order has been placed. Please wait for a confirmation from the
                    restraunt.
                </Text>
            </>
        );
    }

    if (order.status === "cancelled") {
        return (
            <>
                <Icon as={MdCancel} w={24} h={24} color="gray.700" />
                <Heading textAlign="center">Order Cancelled</Heading>
                <Text textAlign="center">
                    Your order has been cancelled. Please contact the restraunt for more
                    information.
                </Text>
            </>
        );
    }

    if (order.status === 'confirmed') {

        //when the status is confirmed, call this function to empty the cart, meaning that you have paid successfully!!!
        clearCartAfterConfirmation();

        //as long as not the status of cancelled or pending, will render confirmed page
        return (
            <>
                <Icon as={MdOutlineCelebration} w={24} h={24} color="gray.700" />
                <Heading textAlign="center">Order Confirmed</Heading>
                <Text textAlign="center">
                    See you soon! Your order has been confirmed and will be ready for pickup
                </Text>
            </>
        );
        
    }
    
};


//Page for logging in or registering 
export const Gratitude = () => {
    return (
        <VStack gap={4} mt={4} mx={4}>
            <GratitudeContent />
        </VStack>
    );
};