/* global google */
import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScriptNext, DirectionsRenderer, Marker, InfoWindow } from '@react-google-maps/api';
import { useDataProvider } from "../components/dataProvider";
import { Flex, Box, Heading, Text, Button, Center, HStack, Image } from '@chakra-ui/react';
import { useLocation } from "react-router-dom"

export const Info = () => {
    const { order, restaurantInfo, fetchItemImageById } = useDataProvider();
    const [directions, setDirections] = useState(null);
    const [mapsLoaded, setMapsLoaded] = useState(false);
    const [center, setCenter] = useState(null); // 设置初始中心点为null
    const [showInfoWindow, setShowInfoWindow] = useState(false); // 新状态来控制InfoWindow的显示
    const [infoWindowPosition, setInfoWindowPosition] = useState(null);
    const [travelTime, setTravelTime] = useState("");
    const [itemImagesSrc, setItemImagesSrc] = useState({});
    const location = useLocation();

    const getLatLng = (address) => {
        return new Promise((resolve, reject) => {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address }, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    resolve(results[0].geometry.location);
                } else {
                    reject("Geocode was not successful for the following reason: " + status);
                }
            });
        });
    };

    // 当路径变化时，重新加载脚本
    useEffect(() => {
        setMapsLoaded(false); // 重新设置 mapsLoaded 为 false，等待脚本加载
    }, [location.pathname]);


    useEffect(() => {
        const fetchDirections = async () => {

            if (!window.google || !window.google.maps || !mapsLoaded) {
                console.error("Google Maps API script not loaded yet.");
                return;
            }

            if (mapsLoaded) {
                try {
                    const originLatLng = await getLatLng(order.address);
                    const destinationLatLng = await getLatLng(restaurantInfo.address);

                    const directionsService = new google.maps.DirectionsService();
                    directionsService.route({
                        origin: originLatLng,
                        destination: destinationLatLng,
                        travelMode: google.maps.TravelMode.DRIVING,
                    }, (result, status) => {
                        if (status === google.maps.DirectionsStatus.OK) {
                            setDirections(result);
                            setCenter(result.routes[0].overview_path[0]); // 设定地图中心为起点
                            setShowInfoWindow(true); // 获取路线后显示InfoWindow
                            setInfoWindowPosition(result.routes[0].legs[0].end_location); // 设置InfoWindow的位置
                            setTravelTime(result.routes[0].legs[0].duration.text); // 设置旅行时间
                        } else {
                            console.error(`Directions request failed due to ${status}`);
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            }
        };

        if (!mapsLoaded) {
            // No action is taken here, we are waiting for LoadScript to set mapsLoaded to true
            return;
        }
        fetchDirections();
    }, [order.address, restaurantInfo.address, mapsLoaded]); // When mapsLoaded changes, rerun the effect

    useEffect(() => {
        const fetchAllItemImages = async () => {

            /**
             * 遍历订单中的每一项，对每一项调用fetchItemImageById函数获取图片URL。
             * fetchItemImageById返回一个promise，这个promise解析后的结果是一个形如{ [item.id]: src }的对象，
             * 其中item.id是订单项的ID，src是图片的URL
             */
            const imagePromises = order?.lines?.map(item =>
                fetchItemImageById(item.id).then(src => ({ [item.id]: src }))
            ) || [];
    
            //等待所有的图片URL promise解析完成。imagePromises是一个包含了所有fetchItemImageById调用结果（promise）的数组
            const imagesSrcArray = await Promise.all(imagePromises);

            /**
             * 这段代码将所有解析后的对象合并为一个单一的对象。reduce方法以一个空对象{}作为初始值，
             * 然后逐个将imagesSrcArray中的每个对象合并到累加器acc中
             * 
             * {
                "1": "https://example.com/image1.jpg",
                "2": "https://example.com/image2.jpg",
                "3": "https://example.com/image3.jpg"
                }
             */
            const imagesSrc = imagesSrcArray.reduce((acc, current) => ({ ...acc, ...current }), {});
            
            setItemImagesSrc(imagesSrc);
        };

        if (order?.lines) {
            fetchAllItemImages();
        }
    }, [order?.lines]);

    const googleMapsApiKey = import.meta.env.VITE_REACT_APP_API_KEY;

    return (

        <Flex marginLeft={-19} direction={["column", "row"]} align="stretch" justify="center" p={[4, 6]} gap={10} wrap="wrap">
            {/* Map Container */}
            <LoadScriptNext
                googleMapsApiKey={googleMapsApiKey}
                onLoad={() => setMapsLoaded(true)} 
                onUnmount={() => setMapsLoaded(false)}
            >
                <GoogleMap
                    mapContainerStyle={{ width: "35%", height: "350px" }} 
                    center={center}
                    zoom={15}
                >
                    {directions && <DirectionsRenderer directions={directions} />}
                    {directions && (
                        <>
                            <Marker position={directions.routes[0].legs[0].start_location} />
                            <Marker position={directions.routes[0].legs[0].end_location} />
                            {showInfoWindow && (
                                <InfoWindow position={infoWindowPosition} onCloseClick={() => setShowInfoWindow(false)}>
                                    <div>
                                        <h4>Estimated Driving Time</h4>
                                        <p>{travelTime}</p>
                                    </div>
                                </InfoWindow>
                            )}
                        </>
                    )}
                </GoogleMap>
            </LoadScriptNext>

            {/* Order Details Box */}
            <Box title='order-detailed-history-box' id='order-detailed-history-box' fontFamily="'Raleway', sans-serif" bg='#000000' color='#fff' width={["100%", "60%"]} w={{base:"20em", sm:"25em", md:"30em"}} maxHeight='350px' p='1.5rem' borderRadius='md' overflowY='auto'> 
                    <Heading fontSize='25px' pb='1rem' fontFamily="'Raleway', sans-serif" > Order Confirmation </Heading>
                    <Text> Confirmation Number / Order ID: {order.id}</Text>
                    <Text mt='10px'> Order Date/Time: {order.pickupTime}</Text>
                    <Text mt='10px'> Address: {order.address}</Text>
                    <Text mt='10px' mb='30px'> Placed by: {order.firstName} {order.lastName}</Text>
                    {order?.lines?.map((item) => (
                        <HStack key={item.id} mt='10px' justifyContent='center' fontWeight='bold'>
                            {itemImagesSrc[item.id] && (
                                <Image src={itemImagesSrc[item.id]} borderRadius='full' boxSize='50px' objectFit='cover' alt='Item image' />
                            )}
                            <Text w='50px'> {item.quantity} </Text>
                            <Text w='300px'> {item.label} </Text>
                            <Text w='50px'> ${item.price} </Text>
                        </HStack>
                    ))}
                    <HStack mt='15px' justifyContent='center'fontWeight='bold'>
                        <Text w='350px' align='right'> Total (tax: 10%): </Text>
                        <Text align='right'> ${order.total} </Text>
                    </HStack>
                    <Text mt='15px' fontWeight='bold'> Order Comments: </Text>
                    <Text > {order.comments} </Text>
                </Box>

        </Flex>
        
    );
};
