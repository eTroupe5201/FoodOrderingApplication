import { Banner} from "../components/Banner";
import { ImageSlider} from "../components/ImageSlider";
import { DiscoverOurStory} from "../components/DiscoverOurStory";
import { OurTeam} from "../components/OurTeam";
import { motion } from "framer-motion";
import React from 'react';

export function Home(){

 return (
    <>
    <ImageSlider />

    <Banner />
   
    <DiscoverOurStory />
    <OurTeam />
   
</>
    );
}
//wrap in fragment to return multiple components