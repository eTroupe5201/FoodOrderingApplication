import { useState, useEffect } from "react";
import { Container, Text, Box, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

export function ImageSlider() {
  const images = [
    {
      url: "https://d1zh5cyxaugen.cloudfront.net/TableSetting.webp",
      heading: "Welcome to Divine Delicacies!",
      content: "Indulge Your Senses: A Gastronomic Journey through Our Culinary Creations! From savory starters to delectable desserts, every slide invites you to savor the flavors of Divine Delicacies. Bon appétit!",
      button: "Order Now",
      link: "/login"
    },
    {
      url: "https://d1zh5cyxaugen.cloudfront.net/ServingFood.webp",
      heading: "Discover Our Exquisite Menu!",
      content: "From tantalizing appetizers to mouthwatering mains and indulgent desserts, each dish at Divine Delicacies is a culinary masterpiece, meticulously crafted to delight your senses. Join us and experience a symphony of flavors that will leave you craving more.",
      button: "Explore Menu",
      link: "/Menu"
    },
    {
      url: "https://d1zh5cyxaugen.cloudfront.net/FoodLayout.webp",
      heading: "Satisfy Your Cravings!",
      content: "Ready to tantalize your taste buds? Place your order now and embark on a culinary journey with us! Whether you are craving savory classics, indulgent treats, or something in between, we have you covered. Click below to satisfy your cravings and experience a world of flavor delivered straight to your door.",
      button: "Order Here",
      link: "/login"
    },
    // Add more images here
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <Helmet>
        <title>Divine Delicacies - Gourmet Cuisine</title>
        <meta name="description" content="Welcome to Divine Delicacies! Indulge your senses with our gourmet cuisine. Explore our menu and satisfy your cravings today." />
      </Helmet>

      <Container className="imageContainer" paddingX={0} maxWidth="100%">
        <div className="SliderContent">
          <Text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            marginTop={"5%"}
            display="flex"
            color="white"
            fontSize={{ base: "45px", sm: "35px", md: "45px", lg: "55px", xl: "65px" }}
            className="SliderHeading"
          >
            {images[currentImageIndex].heading}
          </Text>
          <div className="line"></div>
          <div className="SliderOverlay">
            <Text fontSize={{ base: "11px", sm: "12px", md: "15px", lg: "17px" }} >
              {images[currentImageIndex].content}
            </Text>
            <Link to={images[currentImageIndex].link}>
              <motion.button
                whileHover={{ scale: 1.1, textShadow: "0px 0px 8px rgb(255, 255, 255)" }}
              >
                <Text paddingBottom="10px" fontWeight="bold" fontSize={{ base: "9px", sm: "12px", md: "15px", lg: "17px" }} >
                  {images[currentImageIndex].button}
                </Text>
              </motion.button>
            </Link>
          </div>
        </div>

        <Box height={{ base: "70vh", sm: "80vh", md: "80vh", lg: "80vh", xl: "80vh" }} overflow="hidden">
          <Image
            rel="preload"
            boxSize="100%"
            maxWidth="100vw"
            src={images[currentImageIndex].url}
            alt="Slider Image"
            objectFit="cover"
          />
        </Box>
      </Container>
    </>
  );
}
