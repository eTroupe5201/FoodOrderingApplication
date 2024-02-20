import { Box } from "@chakra-ui/react";
import { useDataProvider } from "../components/dataProvider";
//Page for logging in or registering 
export const Info = () => {
    const { restaurantInfo } = useDataProvider();
    return (
        <Box title='info-box'>
            <p>Info Page</p>
            <p>Restaurant Name: {restaurantInfo.name ? restaurantInfo.name : null}</p>
        </Box>
    );
};