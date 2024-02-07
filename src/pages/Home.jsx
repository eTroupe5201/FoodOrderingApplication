import { Grid, Container, Center, Link, Box, Text, Image} from "@chakra-ui/react";

import { Banner} from "../components/Banner";

import { DiscoverOurStory} from "../components/DiscoverOurStory";
import { OurTeam} from "../components/OurTeam";
// the HomePage will be our default page after log in
export function Home(){
    return (
    <>
    <Banner />
    <DiscoverOurStory />
    <OurTeam />
    </>

    );
};
//wrap in fragment to return multiple components