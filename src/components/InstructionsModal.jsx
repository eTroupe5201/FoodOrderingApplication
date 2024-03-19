import React from "react";
import {  Button, Modal, ModalContent, ModalOverlay, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";

export const InstructionsModal = ({ isOpen, onClose}) => {
    
    return (
        <div data-testid="sort-modal">
<Modal  transition="3s" motionPreset="scale" onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(-10deg)" />
              <ModalContent padding="20px" border="2px solid tan" fontFamily="'Raleway', sans-serif" borderRadius="25px" bg="black" color="white" >
                <ModalHeader textAlign="center">REGISTRATION INSTRUCTIONS</ModalHeader>
                <ModalCloseButton />
                <ModalBody  fontWeight="bold"  borderRadius="25px" textAlign="center" padding="20px" border="2px solid tan" pb={6}>
                    <p>You will receive an email within 1-3 minutes. If you do not receive an email within that time frame, click on Resend Email.</p>
                    <br></br>
                    <p> Kindly review your email and proceed by clicking the verification link. To finalize the verification process, click on the Complete Registration button on this webpage.</p>
                    <br></br>
                    <p> Close this window to continue.</p>

                  <br></br>
                    <p> To finalize the verification process, click on the  &quot;Complete Registration &quot; button on the webpage.</p>

                </ModalBody>
                <ModalFooter><Button data-test="Close-Instructions-Button" color="white" bg="black" border="2px solid tan" mr={3} onClick={onClose}>
        Close
      </Button>  </ModalFooter>
        </ModalContent>
        </Modal>

    </div>
);
};
