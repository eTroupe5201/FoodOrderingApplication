// import {
//     Modal, Text, ModalOverlay, ModalContent, ModalHeader, ModalFooter,ModalBody, ModalCloseButton, Container,
// } from "@chakra-ui/react";
// import {
   
//     FormControl,
//     FormLabel,
//    Input, Flex,
//    FormErrorMessage,
//    FormHelperText, 
//   } from "@chakra-ui/react";
//  import { useState } from "react";
// import { Button } from "@chakra-ui/react";
// import { useDisclosure } from "@chakra-ui/react";

// export function LoginModal() {
//     const { isOpen, onOpen, onClose } = useDisclosure();
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [first, setFirst] = useState(""); // Correct declaration


//     const isError = email === "";
//     //may remove this it pops up as red

//     const handleFirst = (event) => setFirst(event.target.value);
   
//     const handleEmail = (event) => { 
//         validateEmail(event.target.value);
//         setEmail(event.target.value);
 
//     }

    
//     // const handleSubmit = {
//     //     //check validation for all items 
//     //     //create container for form 
//     //     //send form to server 
//         //add for login or register
//     // }

//     return (
//       <>
//       <Container >
//         <Button bg="black"  color="white" onClick={onOpen}>Login</Button>
//         <Flex>
//         <Modal  isOpen={isOpen} onClose={onClose}>
//           <ModalOverlay />
//           <ModalContent bg="black">
//             <ModalHeader bg="black" color="white">Login</ModalHeader>
//             <ModalCloseButton color="white"/>
//             <ModalBody>
//               <FormControl isRequired>
//                 <FormLabel pt="5"color="white" className="FormLabel">Username</FormLabel>
//                 <Input 
//                     value={username} 
//                     onChange={handleFirst} 
//                     placeholder="Username"
//                     bg='white'
//                 />
//                  </FormControl>
//               <FormControl isInvalid={isError}>
//       <FormLabel  pt="10" className="FormLabel" >Email</FormLabel>
//       <Input bg='white'type='email' value={email} onChange={handleEmail} />
//       {!isError ? (
//         <FormHelperText>
//           Enter the email you&lsquo;d like to receive the newsletter on.
//         </FormHelperText>
//       ) : (
//         <FormErrorMessage>Email is required.</FormErrorMessage>
//       )}
//     </FormControl>
//     <Text pt="5" pb="5"color="white"> <a href="{{ url(Register) }}"> Forgot Password?</a></Text>
           
//         <Text color="white">Not A Member? <a href="{{ url(Register) }}"> Register Today</a></Text>
 
//   </ModalBody>
  
//             <ModalFooter>
//               <Button bg="white" variant='ghost'mr={3} >Login</Button>
              
//               <Button colorScheme='gray' onClick={onClose}>
//                 Close
//               </Button>
//             </ModalFooter>
//           </ModalContent>
//         </Modal>
//         </Flex>
//         </Container>
//       </>
//     );
//   }
//   function validateEmail(address) {
//     //email 
//     //if valid email, return true. else false 
//     return false;  
//   }

