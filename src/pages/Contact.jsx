import { Flex, Box, Text, VStack, Input, Textarea, SimpleGrid, Center, FormControl, FormLabel, FormErrorMessage} from "@chakra-ui/react"
import { useDataProvider } from "../components/dataProvider";
import { useForm } from "react-hook-form";

//page for Contact Us form
export const Contact = () => {
    const { storeContactUsForm } = useDataProvider();
    const { register, handleSubmit, formState, reset} = useForm();

    const handleSendForm = async (data) => {  
        await storeContactUsForm(data);
        hideFormShowAlert(); 
        reset();
    }

    const contactUsMessage = "All of our hard work here at Divine Delicacies is done with extreme care, " + 
    "so that you, as our guest, can savor the extraordinary. We value your opinions and want to listen " + 
    "when you have feedback or questions for us.\n\n If you need immediate assistance, please call our host " + 
    "desk at 407-555-5555.\n\n Otherwise, please fill out the form on the right-hand side, and we will respond " +
    "as soon as possible.\n\n We look forward to hearing from you!";

    const formSubmittedAlert = "Your message has successfully been submitted.\n\n" +
    "Do you have something else to tell us? Click the button below to send us another message!";


    return (
    <><form className='Contact' onSubmit={handleSubmit(handleSendForm)} > 
        <SimpleGrid columns={2} templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" , lg: "repeat(2, 1fr)" , xl: "repeat(2, 1fr)" }}>
            <Center>
                <Box color= '#000000' ml='2rem' mr='2rem' p='1.5rem'>
                    <Text 
                        title="header" 
                        fontSize={{ base: "22px", md: "29px", lg: "58px" }} 
                        mb='1rem'
                    > 
                        Welcome to Divine Delicacies! 
                    </Text>
                    <Text 
                        title='contact-message' 
                        fontSize={{ base: "12px", md: "15px", lg: "20px" }}  
                        maxW='43rem' 
                        whiteSpace="pre-line"
                    > 
                        {contactUsMessage}
                    </Text>
                </Box>
            </Center>

            <Center>
                <VStack title='form-submitted' id='form-submitted' textAlign='center' display="none" bg='#000000' color='#fff' maxW='30rem' h="70%" mr='2rem' p='1.5rem'>
                    <Text 
                        fontSize={{ base: "12px", md: "17px", lg: "30px" }} 
                        fontWeight='bold' 
                        mb='1rem' 
                    > 
                        Thank you! 
                    </Text>
                    <Text 
                        fontSize={{ base: "12px", md: "15px", lg: "20px" }} 
                        pb='1rem' 
                        whiteSpace="pre-line"
                    > 
                        {formSubmittedAlert}
                    </Text>
                    <Center>
                        <Box   
                            mt='1rem'
                            p='0.5rem'
                            bg='#fff' 
                            color='#000000'
                            h='40px'
                            w='150px'
                            fontWeight='bold'
                            fontSize='20px'
                            borderRadius='md'
                            onClick={showFormHideAlert} 
                            > 
                            Click here! 
                        </Box>
                    </Center>
                </VStack>   

    const formBox = (
        
        <Box title='form-box' id='form-box' bg='#000000' color='#fff' maxW='30rem' height='100%' mr='2rem' p='1.5rem'>
            <Text fontSize={{ base: "15px", md: "20px", lg: "30px" }} fontWeight='bold' > EMAIL US </Text>
            <Text fontSize={{ base: "10px", md: "15px", lg: "20px" }} pb='1rem'> Send us any questions, comments, or concerns! Or email us at DeliciousDelicacies@gmail.com</Text>
            <VStack align='stretch' >
         
            <label for="first-name" >First Name</label> 
                <Input 
                    id='first-name'
                     value={fname} 
                    onChange={handleFname} 
                    placeholder="first name (required)"
                />

                <label for="last-name">Last Name</label>
                <Input 
                    id='last-name'
                    value={lname} 
                    onChange={handleLname} 
                    placeholder="last name (required)"
                />

                <label for="email">Email</label>
                <Input 
                    id='email'
                    type='email'
                    value={email} 
                    onChange={handleEmail} 
                    placeholder="email address (required)"
                />

                <label for="phone">Phone</label>
                <Input 
                    id='phone'
                    type='tel'
                    value={phone} 
                    onChange={handlePhone} 
                    placeholder="phone number (optional)"
                />

                <label for="message">Message</label>
                <Textarea 
                    id='message'
                    value={message} 
                    onChange={handleMessage} 
                    placeholder="enter feedback or questions here (required)"
                    maxH='400px'
                />
                <Flex alignContent='center' justifyContent='center'> 
                    <Box 
                        as='button'  
                        mt='1rem'
                        bg='#fff' 
                        color='#000000'
                        h='40px'
                        w='90px'
                        fontWeight='bold'
                        fontSize='20px'
                        borderRadius='md'
                        onClick={handleSubmit} 
                        > 
                        Submit 
                    </Box>
                </Flex>
            </VStack>
        </Box>
    );

    return (
    <><div position="relative" margin-bottom="100px" className='Contact' > 
        <Flex>
            <SimpleGrid columns={2} templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' , lg: 'repeat(2, 1fr)' , xl: 'repeat(2, 1fr)' }}>
            {contactUsMessageBox}
            {formSubmittedAlertBox}
            {formBox}
            </SimpleGrid>
        </Flex>
    </div></>
    )
}

function showFormHideAlert() {
    document.getElementById("form-box").style.display="block";
    document.getElementById("form-submitted").style.display="none";
}

function hideFormShowAlert() {
    document.getElementById("form-box").style.display="none";
    document.getElementById("form-submitted").style.display="block";
}
