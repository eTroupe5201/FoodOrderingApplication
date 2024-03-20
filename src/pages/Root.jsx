import { Box, Container } from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";
// import { Footer } from "../components/Footer";
import loadable from "@loadable/component";
import { Outlet } from "react-router-dom";
const Footer = loadable(() => import("../components/Footer"), {resolveComponent: (components) => components.Footer});


// the root page will be shown in every pages including navbar and footer
export const Root = () => {
    return (
        <Box>
            <NavBar />

            <Container minH="65vh" minW="100vw" p={0}>
                <Outlet /> {/* This will render the current route's component */}
            </Container>
            
            <Footer />
        </Box>
    );
};