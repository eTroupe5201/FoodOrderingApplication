import  { useState, useEffect } from "react";
import { Container, Text, Box, Image} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {motion} from "framer-motion";

export function ImageSlider() {
  const images = [
    {
      url: "https://groupprojectdepaul.s3.us-east-2.amazonaws.com/assets/Slider/TableSetting.jpg",
      heading: "Welcome to Divine Delicacies!",
      content: "Indulge Your Senses: A Gastronomic Journey through Our Culinary Creations! From savory starters to delectable desserts, every slide invites you to savor the flavors of Divine Delicacies. Bon appétit!",
      button: "Order Now",
      link: "/login"
    },
    {
      url: "https://groupprojectdepaul.s3.us-east-2.amazonaws.com/assets/Slider/shutterstock_333578117.jpg",
      heading: "Discover Our Exquisite Menu!",
      content: "From tantalizing appetizers to mouthwatering mains and indulgent desserts, each dish at Divine Delicacies is a culinary masterpiece, meticulously crafted to delight your senses. Join us and experience a symphony of flavors that will leave you craving more.",
      button: "Explore Menu",
      link: "/Menu"
    },
    {
      url: "https://groupprojectdepaul.s3.us-east-2.amazonaws.com/assets/Slider/shutterstock_588796445.jpg",
      heading: "Satisfy Your Cravings!",
      content: "Ready to tantalize your taste buds? Place your order now and embark on a culinary journey with us! Whether you are craving savory classics, indulgent treats, or something in between, we have  you covered. Click below to satisfy your cravings and experience a world of flavor delivered straight to your door.",
      button: "Order Here",
      link: "/login"
    },
    // Add more images here
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const imagesLength = images.length;
      setCurrentImageIndex((prevIndex) =>
        prevIndex === imagesLength - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container className="imageContainer"> 
<div className="SliderContent" >
        <Text  marginTop={"3%"} display="flex" color="white" fontSize={{ base: "25px", sm: "35px", md: "45px", lg: "55px", xl:"65px" }} className="SliderHeading">{images[currentImageIndex].heading}</Text>
        <div className="line"></div>
        <div className="SliderOverlay" >
          <Text fontSize={{ base: "11px", sm: "12px", md: "15px", lg: "17px" }} >{images[currentImageIndex].content}</Text>
          <Link  to={images[currentImageIndex].link} >
            <motion.button
            whileHover={{ scale: 1.1 , textShadow: "0px 0px 8px rgb(255, 255, 255)"}}
            ><Text paddingBottom="10px"fontWeight="bold" fontSize={{ base: "9px", sm: "12px", md: "15px", lg: "17px" }} >{images[currentImageIndex].button}</Text></motion.button>
          </Link>
        </div>
      </div>

      {/* Apply size variation to the image */}
      <Box >
        <Image  mr="0"
        boxSize={{ base: "300px", sm: "400px", md: "500px", lg: "800px", xl:"800px"}}
        width={{ base: "100vw", sm: "100vw", md: "100vw", lg: "100vw", xl:"100vw"}}
        src={images[currentImageIndex].url} alt="Slider Image" />
      </Box>
    </Container>
  );
}
