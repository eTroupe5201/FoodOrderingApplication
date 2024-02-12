import React, { useState, useEffect } from 'react';
import { Container, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export function ImageSlider() {
  const images = [
    {
      url: 'src/assets/Restuarant.jpg',
      heading: 'Welcome to Divine Delicacies!',
      content: 'Indulge Your Senses: A Gastronomic Journey through Our Culinary Creations! From savory starters to delectable desserts, every slide invites you to savor the flavors of Divine Delicacies. Bon appétit!"',
      button: 'Order Now',
      link: '/login'
    },
    {
      url: 'src/assets/table.jpg',
      heading: 'Discover Our Exquisite Menu!',
      content: 'From tantalizing appetizers to mouthwatering mains and indulgent desserts, each dish at Divine Delicacies is a culinary masterpiece, meticulously crafted to delight your senses. Join us and experience a symphony of flavors that will leave you craving more."',
      button: 'Explore Menu',
      link: '/Menu'
    },
    {
      url: 'src/assets/food-shot.jpg',
      heading: 'Satisfy Your Cravings!',
      content: "Ready to tantalize your taste buds? Place your order now and embark on a culinary journey with us! Whether you're craving savory classics, indulgent treats, or something in between, we've got you covered. Click below to satisfy your cravings and experience a world of flavor delivered straight to your door.",
      button: 'Order Here',
      link: '/login'
    },
    // Add more images here
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container className="imageContainer"> 

    <div className="SliderContent">
     <Text className="SliderHeading">{images[currentImageIndex].heading}</Text>
       <div className="line"></div>
       <div className="SliderOverlay">
      <Text >{images[currentImageIndex].content}</Text>
        <Link to={images[currentImageIndex].link}>
          <button className="SliderButton">{images[currentImageIndex].button}</button> </Link>
          </div>
    </div>

    <img className="SliderImage" src={images[currentImageIndex].url} alt="Slider Image" />
     
    </Container>
  );
}




