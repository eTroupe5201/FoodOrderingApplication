import { Client } from "@googlemaps/google-maps-services-js";
// import { getSecret } from 'firebase-functions/secrets';
// import { googleMapsKey } from "../index.mjs";

const client = new Client({});

export async function calculateDistanceTime(origin, destination, apiKey) {
    try {
        const originLatLng = await getLatLng(origin, apiKey);
        const destinationLatLng = await getLatLng(destination, apiKey);
        const response = await client.distancematrix({
            params: {               
                origins: [originLatLng],
                destinations: [destinationLatLng],
                // key:apiKey,
                key: "AIzaSyDgOCsuwJO92811r4PgXSl7n_7-Nxhm0ic", // 使用Firebase Functions Secrets
                mode: "driving",
            },
        });
        const results = response.data.rows[0].elements;
        const element = results[0];
        if (element.status === "OK") {
            const durationInMinutes = Math.ceil(element.duration.value / 60); // 将秒转换为分钟，并向上取整
            return {
                distance: element.distance.value, // 距离，单位：米
                duration: durationInMinutes, // 预计行程时间，包含额外的5分钟，单位：分钟
            };
        } else {
            throw new Error('Failed to get distance');
        }
    } catch (error) {
        console.error('Distance Matrix request failed', error);
        throw error;
    }
}

export async function getLatLng(address, apiKey) {
    try {
        const response = await client.geocode({
            params: {
                address: address,
                // key:apiKey,
                key: "AIzaSyDgOCsuwJO92811r4PgXSl7n_7-Nxhm0ic", // 使用Firebase Functions Secrets
            },
        });
        if (response.data.status === "OK") {
            return response.data.results[0].geometry.location; // 返回经纬度对象
        } else {
            throw new Error('Geocode was not successful for the following reason: ' + response.data.status);
        }
    } catch (error) {
        console.error('Geocode request failed', error);
        throw error;
    }
}