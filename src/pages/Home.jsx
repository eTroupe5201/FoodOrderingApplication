import { Box } from "@chakra-ui/react";
import { Banner } from "../components/Banner";

// the HomePage will be our default page after log in
export const Home = () => {
    return (
        <Box>
            <Banner />
            <p>Menu Page</p>
        </Box>
    );
};