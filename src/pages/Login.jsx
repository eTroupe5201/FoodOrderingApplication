import { Box } from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";

//Page for logging in or registering 
export const Login = () => {

    //added NavBar until Login page is fully configured (so we can navigate back to other pages)
    return (
        <Box>
            <NavBar />
            <p>Login Page</p>
        </Box>
    );
};