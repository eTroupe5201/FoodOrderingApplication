import { Link, useNavigate } from "react-router-dom";
import {VStack,  Divider } from "@chakra-ui/react";
import { Button, Modal, ModalContent, ModalOverlay, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { useSortProvider} from "../components/sortProvider";

export const TypeModal = ({ isOpen, onClose }) => {
   
    const { selectedOption, updateSelectedOption, updateSelectedFilter } = useSortProvider();
    
    //Function to handle radio button change
    const handleOptionChange = (event) => {
        console.log("Selected option:", event.target.value)
        updateSelectedOption(event.target.value);
    };

    // Function to handle form submission
    const handleSubmit = () => {
        updateSelectedFilter("Type");
        updateSelectedOption(selectedOption);
        onClose();
    };
       // Function to handle form submission
       const handleCancel = () => {
        updateSelectedOption("");
        updateSelectedFilter("");
        onClose();
    };

    return (
        <div data-testid="cart-modal">
        <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInRight">
            <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(-10deg)' />
            <ModalContent
                borderLeft="2px tan outset"
                fontFamily="Raleway, sans-serif"
                fontWeight="bold"
                position="fixed"
                background="black"
                color="white"
                top="0"
                right="0"
                bottom="0"
                ml="0"
                mt="0"
                height="100vh" // Make the modal full height
                width={{ base: "100%", md: "50%", lg: "50%", xl: "50%" }}
                boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
                borderRadius="0"
                justifyContent="center" // Center content vertically
                padding="1rem"
            >
                <ModalHeader title="cart-modal-header">Type</ModalHeader>
                <ModalCloseButton
                    color="white"
                    background="black"
                    border="white solid 1px"
                    _hover={{ boxShadow: "0 0 10px 1px tan" }}
                    title="cart-modal-close-button"
                />
                <ModalBody>
                    <VStack spacing={4} align="stretch">
                        <div>
                    <input
                                type="radio"
                                id="Appetizers"
                                name="dietaryNeeds"
                                value="Appetizers"
                                checked={selectedOption === "Appetizers"} // Check if this option is selected
                                    onChange={handleOptionChange} // Call handleOptionChange function on change
                            />
                            <label htmlFor="Appetizers" style={{ flex: '1', paddingLeft: '8px' }} >Appetizers</label>
                        </div>
                      <Divider />
                      <div>
                    <input
                                type="radio"
                                id="Soups"
                                name="dietaryNeeds"
                                value="Soups"
                                checked={selectedOption === "Soups"} // Check if this option is selected
                                    onChange={handleOptionChange} // Call handleOptionChange function on change
                            />
                            <label htmlFor="Soups" style={{ flex: '1', paddingLeft: '8px' }} >Soups</label>
                        </div>
                      <Divider />
                      <div>
                    <input
                                type="radio"
                                id="Entrées"
                                name="dietaryNeeds"
                                value="Entrées"
                                checked={selectedOption === "Entrées"} // Check if this option is selected
                                    onChange={handleOptionChange} // Call handleOptionChange function on change
                            />
                            <label htmlFor="Entrées" style={{ flex: '1', paddingLeft: '8px' }} >Entrées</label>
                        </div>
                      <Divider />
                      <div>
                    <input
                                type="radio"
                                id="Salads"
                                name="dietaryNeeds"
                                value="Salads"
                                checked={selectedOption === "Salads"} // Check if this option is selected
                                    onChange={handleOptionChange} // Call handleOptionChange function on change
                            />
                            <label htmlFor="Salads" style={{ flex: '1', paddingLeft: '8px' }} > Salads</label>
                        </div>
                      <Divider />
                      <div>
                    <input
                                type="radio"
                                id="Desserts"
                                name="dietaryNeeds"
                                value="Desserts"
                                checked={selectedOption === "Desserts"} // Check if this option is selected
                                    onChange={handleOptionChange} // Call handleOptionChange function on change
                            />
                            <label htmlFor="Desserts" style={{ flex: '1', paddingLeft: '8px' }} >Desserts</label>
                        </div>
                      <Divider />       <div>
                    <input
                                type="radio"
                                id="Beverages"
                                name="dietaryNeeds"
                                value="Beverages"
                                checked={selectedOption === "Beverages"} // Check if this option is selected
                                    onChange={handleOptionChange} // Call handleOptionChange function on change
                            />
                            <label htmlFor="Beverages" style={{ flex: '1', paddingLeft: '8px' }} >Beverages</label>
                        </div>
                      <Divider />
                    </VStack>
                </ModalBody>
                <ModalFooter title="Filter-modal-footer">
                    <Link to="/menu">
                    <Button
                            mr={3}
                            color="white"
                            background="black"
                            border="tan outset 2px"
                            _hover={{ boxShadow: "0 0 10px 1px tan" }}
                            onClick={handleSubmit} // Call handleSubmit function on button click
                        >
                            Apply
                        </Button>
                        <Button
                            color="white"
                            background="black"
                            border="tan outset 2px"
                            _hover={{ boxShadow: "0 0 10px 1px tan" }}
                            onClick={handleCancel} // Close the modal without applying changes
                        >
                            Cancel
                        </Button>
                    </Link>
                    <Link>
                       
                    </Link>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </div>
    );
};
