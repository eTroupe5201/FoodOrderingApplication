import { Box, Container } from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { Outlet } from "react-router-dom";

// the root page will be shown in every pages including navbar and footer
export const Root = () => {
    return (
        <Box>
            <NavBar />
            <Container minH="100vh" p={0}>
                <Outlet /> {/* This will render the current route's component */}
            </Container>
            
            <Footer />
        </Box>
    );
};