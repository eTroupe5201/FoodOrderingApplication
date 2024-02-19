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

            
                <Box title='form-box' id='form-box' bg='#000000' color='#fff' maxW='30rem' height='100%' mr='2rem' p='1.5rem'>
                    <Text 
                        fontSize={{ base: "15px", md: "20px", lg: "30px" }} 
                        fontWeight='bold' 
                    > 
                        EMAIL US 
                    </Text>
                    <Text 
                        fontSize={{ base: "10px", md: "15px", lg: "20px" }} 
                        pb='1rem'
                    > 
                        Send us any questions, comments, or concerns! Or email us at DeliciousDelicacies@gmail.com
                    </Text>
                    <VStack align='stretch' >
                        <FormControl id='fnameField' isInvalid={!!formState?.errors?.firstName?.type}>
                            <FormLabel>First Name</FormLabel>
                            <Input 
                                id='firstName'
                                {...register("firstName", { required: true, pattern:/(^[a-zA-Z,'-][a-zA-Z\s,'-]{0,20}[a-zA-Z]$)/})}
                            />
                            <FormErrorMessage>Required</FormErrorMessage>
                        </FormControl>
                        <FormControl id='lnameField' isInvalid={!!formState?.errors?.lastName?.type}>
                            <FormLabel>Last Name</FormLabel>
                            <Input 
                                id='lastName'
                                {...register("lastName", { required: true, pattern:/(^[a-zA-Z,'-][a-zA-Z\s,'-]{0,20}[a-zA-Z]$)/ })}
                            />
                            <FormErrorMessage>Required</FormErrorMessage>
                        </FormControl>
                        <FormControl id='emailField' isInvalid={!!formState?.errors?.email?.type}>
                            <FormLabel>Email Address</FormLabel>
                            <Input 
                                id='email'
                                {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/})}
                            />
                            <FormErrorMessage>Email address is invalid</FormErrorMessage>
                        </FormControl>
                        <FormControl id='phoneField'>
                            <FormLabel>Phone Number (optional)</FormLabel>
                            <Input 
                                type='tel'
                                {...register("phone")}
                            />
                        </FormControl>
                        <FormControl id='message' isInvalid={!!formState?.errors?.message?.type}>
                            <FormLabel>Message</FormLabel>
                        <Textarea 
                            id='message'
                            {...register("message", {required: true, maxLength:400})}
                        />
                        </FormControl>

                        <Flex>
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
                                > 
                                Submit 
                            </Box>
                        </Flex>
                    </VStack>
                </Box>
            </Center>            
        </SimpleGrid>
    </form></>
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
