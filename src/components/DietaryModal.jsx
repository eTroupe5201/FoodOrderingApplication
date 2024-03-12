import { Link } from "react-router-dom";
import {VStack,  Divider } from "@chakra-ui/react";
import { Button, Modal, ModalContent, ModalOverlay, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { useSortProvider} from "../components/sortProvider";


export const DietaryModal = ({ isOpen, onClose }) => {
   
    const { selectedOption, updateSelectedOption, updateSelectedFilter } = useSortProvider();
   
    // Function to handle radio button change
    const handleOptionChange = (event) => {
    updateSelectedOption(event.target.value);
    };
   
    // Function to handle form submission
    const handleSubmit = () => {
        updateSelectedOption(selectedOption);
        updateSelectedFilter("Dietary");
       
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
                <ModalHeader title="cart-modal-header">Dietary Needs</ModalHeader>
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
                                id="Organic"
                                name="dietaryNeeds"
                                value="Organic"
                                checked={selectedOption === "Organic"} // Check if this option is selected
                                    onChange={handleOptionChange} // Call handleOptionChange function on change
                            />
                            <label htmlFor="Organic" style={{ flex: '1', paddingLeft: '8px' }} >Organic</label>
                        </div>
                        <Divider/>
                        <div>
                            <input
                                type="radio"
                                id="Ketogenic"
                                name="dietaryNeeds"
                                value="Ketogenic"
                                paddingLeft="100px"
                                checked={selectedOption === "Ketogenic"} // Check if this option is selected
                                    onChange={handleOptionChange} // Call handleOptionChange function on change
                            />
                            <label htmlFor="Ketogenic" style={{ flex: '1', paddingLeft: '8px' }}>Ketogenic</label>
                        </div>
                        <Divider/>
                        <div>
                            <input
                                type="radio"
                                id="Vegetarian"
                                name="dietaryNeeds"
                                value="Vegetarian"
                                checked={selectedOption === "Vegetarian"} // Check if this option is selected
                                    onChange={handleOptionChange} // Call handleOptionChange function on change
                            />
                            <label htmlFor="Vegetarian" style={{ flex: '1', paddingLeft: '8px' }}>Vegetarian</label>
                        </div>
                        <Divider/>
                    <div>
                            <input
                                type="radio"
                                id="Paleo"
                                name="dietaryNeeds"
                                value="Paleo"
                                checked={selectedOption === "Paleo"} // Check if this option is selected
                                    onChange={handleOptionChange} // Call handleOptionChange function on change
                            />
                            <label htmlFor="Paleo" style={{ flex: '1', paddingLeft: '8px' }}>Paleo</label>
                        </div>
                        <Divider/>
                        <div>
                            <input
                                type="radio"
                                id="Koser"
                                name="dietaryNeeds"
                                value="Kosher"
                                checked={selectedOption === "Kosher"} // Check if this option is selected
                                    onChange={handleOptionChange} // Call handleOptionChange function on change
                            />
                            <label htmlFor="Kosher" style={{ flex: '1', paddingLeft: '8px' }}>Kosher</label>
                        </div>
                        <Divider/>
                        <div>
                        <div >
                            <input
                                type="radio"
                                id="Mediterranean"
                                name="dietaryNeeds"
                                value="Mediterranean"
                                checked={selectedOption === "Mediterranean"} // Check if this option is selected
                                    onChange={handleOptionChange} // Call handleOptionChange function on change
                            />
                            <label htmlFor="Mediterranean" style={{  flex: '1', paddingLeft: '8px' }}>Mediterranean</label>
                        </div>
                        </div>
                        <Divider/>
                        <div>
                            <input
                                type="radio"
                                id="Non-GMO"
                                name="dietaryNeeds"
                                value="Non-GMO"
                                checked={selectedOption === "Non-GMO"} // Check if this option is selected
                                    onChange={handleOptionChange} // Call handleOptionChange function on change
                            />
                            <label htmlFor="Non-GMO" style={{ flex: '1', paddingLeft: '8px' }}>Non-GMO</label>
                        </div>
                    </VStack>
                </ModalBody>
                <ModalFooter title="Filter-modal-footer">
                    <Link to="/menu">
                    <Button
                            mr={3}
                            color="white"
                            background="black"
                            border="white solid 1px"
                            _hover={{ boxShadow: "0 0 10px 1px tan" }}
                            onClick={handleSubmit} // Call handleSubmit function on button click
                        >
                            Apply
                        </Button>
                        <Button
                            color="white"
                            background="black"
                            border="white solid 1px"
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
