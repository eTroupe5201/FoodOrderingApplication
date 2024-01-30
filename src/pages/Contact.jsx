import { Flex, Center, Input, Box, Text, VStack, InputGroup, InputLeftElement, Textarea } from '@chakra-ui/react'
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons'
import { useState } from "react";

//page for Contact Us form
export const Contact = () => {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const handleFirst = (event) => setFirst(event.target.value);
    const handleLast = (event) => setLast(event.target.value);
    const handleEmail = (event) => { 
        validateEmail(event.target.value);
        setEmail(event.target.value);
    }
    const handlePhone = (event) => {
        validatePhone(event.target.value);
        setPhone(event.target.value);
    } 
    const handleMessage = (event) => {
        //validateMessage(event.target.value);
        setMessage(event.target.value);
    }
    const handleSubmit = {
        //check validation for all items 
        //create container for form 
        //send form to server 
        
    }

    return (
    <><div className='contact'> 
  
        <Box bg='#C05621' color='#F7FAFC' p='1.5rem'>
            <Text fontWeight='bold' fontSize='3xl'> CONTACT US </Text>
            <Text pb='1rem'> Send us any questions, comments, or concerns! </Text>
            <VStack align='stretch'>
                <Input 
                    value={first} 
                    onChange={handleFirst} 
                    placeholder="first name"
                    bg='white'
                />
                <Input 
                    value={last} 
                    onChange={handleLast} 
                    placeholder="last name"
                    bg='white'
                />
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <EmailIcon color='gray.300' />
                    </InputLeftElement>
                    <Input 
                        type='email'
                        value={email} 
                        onChange={handleEmail} 
                        placeholder="email address"
                        bg='white'
                    />
                </InputGroup>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <PhoneIcon color='gray.300' />
                    </InputLeftElement>
                    <Input 
                        type='tel'
                        value={phone} 
                        onChange={handlePhone} 
                        placeholder="phone number"
                        bg='white'
                    />
                </InputGroup>
                <Textarea 
                    value={message} 
                    onChange={handleMessage} 
                    placeholder="enter feedback or questions here"
                    bg='white'
                />
            </VStack>
            <Flex alignContent='center' justifyContent='center'> 
                <Center 
                as='button'  
                mt='1rem'
                bg='white' 
                color='#C05621'
                h='35px'
                w='75px'
                fontWeight='bold'
                onChange={handleSubmit} 
                > 
                Submit 
                </Center>
            </Flex>
        </Box>
  
    </div></>
    )
  }
  
  function validateEmail(address) {
    //email 
    //if valid email, return true. else false 
    return false;  
  }

  function validatePhone(number) {
   //phone number
   //if valid phone (number of digits), return true. else false 
    return false; 
  }

  function validateMessage(message) {
    //max 265 chars
    if (length(message) <= 265) {
        return true;
    }
    return false; 
   }
