import { Flex, Box, Text, VStack, Input, Textarea, useToast} from '@chakra-ui/react'
import { useState } from "react";

//page for Contact Us form
export const Contact = () => {
    const toast = useToast();

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const handleFname = (event) => {
        setFname(event.target.value);
        document.getElementById('fname').style.outlineColor= "black";
    }
    const handleLname = (event) => {
        setLname(event.target.value);
        document.getElementById('lname').style.outlineColor= "black";
    }
    const handleEmail = (event) => {
        setEmail(event.target.value); 
        document.getElementById('email').style.outlineColor= "black";
    }
    const handlePhone = (event) => { setPhone(event.target.value); }
    const handleMessage = (event) => {
        setMessage(event.target.value);
        document.getElementById('message').style.outlineColor= "black";
    }

    const handleSubmit = (event) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        const fnameInvalid = (fname.length === 0);
        const lnameInvalid = (lname.length === 0);
        const emailInvalid = ((email.length === 0 || !(emailPattern.test(email))));
        const messageInvalid = (message.length === 0);

        //validate all required lines in the form 
        if (fnameInvalid)   { document.getElementById('fname').style.outlineColor= "red"; }
        if (lnameInvalid)   { document.getElementById('lname').style.outlineColor= "red"; }
        if (emailInvalid)   { document.getElementById('email').style.outlineColor= "red"; }
        if (messageInvalid) { document.getElementById('message').style.outlineColor= "red"; }
        
        //if any items are incorrectly filled out, show error Toast 
        if (fnameInvalid || lnameInvalid || emailInvalid || messageInvalid) {         
            toast ({    
                addRole: true,
                title: "Uh oh! Something you entered is invalid. Please fix your input in any boxes outlined in red.",
                position: 'top', 
                status: 'error',
                isClosable: true,
            });
           
        }
        //if all true, form is correctly filled out. Send to server, hide Form and show success message, and reset fields
        else {
            //TODO create container and server-side model for form 
            //TODO send form to server 


            hideFormShowAlert(); 
            setFname("");
            setLname("");
            setEmail("");
            setPhone("");
            setMessage("");
        }
    }

    const contactUsMessage = "All of our hard work here at Divine Delicacies is done with extreme care, " + 
    "so that you, as our guest, can savor the extraordinary. We value your opinions and want to listen " + 
    "when you have feedback or questions for us.\n\n If you need immediate assistance, please call our host " + 
    "desk at 407-555-5555.\n\n Otherwise, please fill out the form on the right-hand side, and we will respond " +
    "as soon as possible.\n\n We look forward to hearing from you!";

    const contactUsMessageBox = (
        <Box color= '#000000' ml='2rem' mr='2rem' p='1.5rem'>
            <Text title="header" fontSize='58px' mb='1rem'> Welcome to Divine Delicacies! </Text>
            <Text title='contact-message' fontSize='20px' maxW='43rem' whiteSpace="pre-line"> 
                {contactUsMessage}
            </Text>
        </Box>
    );

    const formSubmittedAlert = "Your message has successfully been submitted.\n\n" +
    "Do you have something else to tell us? Click the button below to send us another message!";

    const formSubmittedAlertBox = (
        <VStack title='form-submitted' id='form-submitted' textAlign='center' display="none" bg='#000000' color='#fff' maxW='30rem' height='100%' mr='2rem' p='1.5rem'>
            <Text fontSize='30px' fontWeight='bold' mb='1rem' > Thank you! </Text>
            <Text fontSize='20px' pb='1rem' whiteSpace="pre-line"> 
                {formSubmittedAlert}
            </Text>
            <Box 
                as='button'  
                mt='1rem'
                p='0.5rem'
                bg='#fff' 
                color='#000000'
                h='100%'
                w='150px'
                fontWeight='bold'
                fontSize='20px'
                borderRadius='md'
                onClick={showFormHideAlert} 
                > 
                Click here! 
            </Box>
        </VStack>   
    );

    const formBox = (
        <Box title='form-box' id='form-box' bg='#000000' color='#fff' maxW='30rem' height='100%' mr='2rem' p='1.5rem'>
            <Text fontSize='30px' fontWeight='bold' > EMAIL US </Text>
            <Text fontSize='20px' pb='1rem'> Send us any questions, comments, or concerns! Or email us at DeliciousDelicacies@gmail.com</Text>
            <VStack align='stretch' >
                <Input 
                    id='fname'
                    value={fname} 
                    onChange={handleFname} 
                    placeholder="first name (required)"
                />
                <Input 
                    id='lname'
                    value={lname} 
                    onChange={handleLname} 
                    placeholder="last name (required)"
                />
                <Input 
                    id='email'
                    type='email'
                    value={email} 
                    onChange={handleEmail} 
                    placeholder="email address (required)"
                />
                <Input 
                    type='tel'
                    value={phone} 
                    onChange={handlePhone} 
                    placeholder="phone number (optional)"
                />
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
    <><div className='Contact' > 
        <Flex alignContent='center' justifyContent='center'>
            {contactUsMessageBox}
            {formSubmittedAlertBox}
            {formBox}
        </Flex>
    </div></>
    )
}

function showFormHideAlert() {
    document.getElementById('form-box').style.display="block";
    document.getElementById('form-submitted').style.display="none";
}

function hideFormShowAlert() {
    document.getElementById('form-box').style.display="none";
    document.getElementById('form-submitted').style.display="block";
}
