import {  Heading, Icon, VStack, Text } from "@chakra-ui/react";
import { useDataProvider } from "../components/dataProvider";
import {
    MdOutlineCelebration,
    MdCancel,
    MdHourglassBottom,
} from "react-icons/md";
import React, { useEffect} from "react";

const GratitudeContent = () => {
    const { order, setOrder, clearCartAfterConfirmation, clearOrderAfterConfirmation, generateOrder, handleOrder  } = useDataProvider();

    // 用于初始化PayPal按钮的函数
    // useEffect(() => {
    //     if (!window.paypal || !order?.id || order?.status !== 'pending') {
    //         console.log('PayPal not loaded or order not in pending status.');
    //         return;
    //     }
    
    //     window.paypal.Buttons({
    //         createOrder: (data, actions) => {
    //             return generateOrder().then(orderId => {
    //                 return orderId; // 直接返回订单ID
    //             });
    //         },
    //         onApprove: async (data, actions) => {
    //             // 检查订单状态以避免重复捕获
    //             if (order.status === 'confirmed') {
    //                 console.log('Order already confirmed. Skipping capture.');
    //                 return;
    //             }
                
    //             return actions.order.capture().then(async details => {
                    
    //                 try {
    //                     console.log(`Order captured successfully: ${details.id}`);
    //                     const updatedOrder = await handleOrder(details.id);
    //                     setOrder(updatedOrder); // 确保这里正确地更新了订单状态
    //                     alert("THANKS FOR YOUR ORDER");
    //                 } catch (error) {
    //                     console.error('Error updating order after approval:', error);
    //                 }
    //             });
    //         },
    //         onError: (error) => {
    //             console.error('Payment error:', error);
    //             // 这里可以添加用户友好的错误处理逻辑
    //         }
    //     }).render('#paypal-button');
    // }, [order, window.paypal]); // 依赖项调整为直接依赖order对象和window.paypal

    useEffect(() => {
        if (!window.paypal || !order?.id || order?.status !== 'pending') {
            console.log('PayPal not loaded or order not in pending status.');
            return;
        }

        window.paypal.Buttons({
            createOrder: (data, actions) => {
                return generateOrder().then(orderId => {
                    // 处理错误情况
                    if (orderId.error) {
                        console.error('Error creating PayPal order:', orderId.error);
                        // 可以在这里处理错误，比如展示提示信息给用户
                        return actions.reject(); // 拒绝创建订单
                    }
                    return orderId; // 直接返回订单ID
                });
            },
            onApprove: async (data, actions) => {
                // 检查订单状态以避免重复捕获
                if (order.status === 'confirmed') {
                    console.log('Order already confirmed. Skipping capture.');
                    return;
                }
                
                const updatedOrder = await handleOrder(data.orderID);
                if (updatedOrder.error) {
                    console.error('Error handling PayPal order:', updatedOrder.error);
                    // 可以在这里处理错误，比如展示提示信息给用户
                    return; // 退出函数，不继续执行
                }
                console.log(`Order captured successfully: ${updatedOrder.id}`);
                setOrder(updatedOrder); // 确保这里正确地更新了订单状态
                alert("THANKS FOR YOUR ORDER");
            },
            onError: (error) => {
                console.error('Payment error:', error);
                // 这里可以添加用户友好的错误处理逻辑
            }
        }).render('#paypal-button'); // 确保ID与HTML中的元素匹配
    
    }, [order?.id, order?.status, window.paypal]); // 删除window.firebase因为我们不再直接使用它
    

    if (!order) return null;

    if (order.status === "pending") {
        // console.log("order pending");
        return (
            <>
                <Icon as={MdHourglassBottom} w={24} h={24} color="gray.700" />
                <Heading textAlign="center">Waiting for a confirmation</Heading>
                <Text textAlign="center">
                    Your order has been placed. Please wait for a confirmation from the
                    restraunt.
                </Text>
                <div id="paypal-button">

                </div>
            </>
        );
    }

    if (order.status === "cancelled") {
        console.log("order cancelled");
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

    if (order.status === "confirmed") {
        // console.log("order confirmed");
        //when the status is confirmed, call this function to empty the cart and order, meaning that you have paid successfully!!!
        clearCartAfterConfirmation();
        // clearOrderAfterConfirmation();
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


export const Gratitude = () => {
    return (
        <VStack gap={4} mt={4} mx={4}>
            <GratitudeContent />
        </VStack>
    );
};