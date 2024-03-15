import { Link } from "react-router-dom";
import {VStack,  Divider } from "@chakra-ui/react";
import { Button, Modal, ModalContent, ModalOverlay, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { useDataProvider} from "../components/dataProvider";


export const DietaryModal = ({ isOpen, onClose }) => {
   
    const { selectedOption, updateSelectedOption, updateSelectedFilter } = useDataProvider();
   
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
        <div data-testid="dietary-modal">
        <Modal data-test="DietaryNeedsModal" isOpen={isOpen} onClose={onClose} motionPreset="slideInRight">
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
                <ModalHeader data-test="Dietary-Needs-Modal-Header" title="dietary-modal-header">Dietary Needs</ModalHeader>
                <ModalCloseButton
                    color="white"
                    background="black"
                    border="white solid 1px"
                    _hover={{ boxShadow: "0 0 10px 1px tan" }}
                    title="dietary-modal-close-button"
                    data-test="Dietary-Needs-Modal-Close-Button"
                />
                <ModalBody>
                    <VStack spacing={4} align="stretch">
                        <div>
                    <input
                                type="radio"
                                id="Organic"
                                name="Organic"
                                value="Organic"
                                title="Organic"
                                role="radio"
                                aria-checked={selectedOption === "Organic" ? "true" : "false"} // Set aria-checked attribute based on selectedOption state
                                data-test="Dietary-Needs-Input-Organic"
                                checked={selectedOption === "Organic"} // Check if this option is selected
                                    onChange={handleOptionChange} // Call handleOptionChange function on change
                            />
                            <label htmlFor="Organic" style={{ flex: "1", paddingLeft: "8px" }} >Organic</label>
                        </div>
                        <Divider/>
                        <div>
                            <input
                                type="radio"
                                id="Low-Carb/Keto"
                                name="dietaryNeeds"
                                value="Low-Carb/Keto"
                                title="Low-Carb/Keto"
                                role="radio"
                                aria-checked={selectedOption === "Low-Carb/Keto" ? "true" : "false"} // Set aria-checked attribute based on selectedOption state
                                data-test="Dietary-Needs-Input-Low-Carb-Keto"
                                checked={selectedOption === "Low-Carb/Keto"} // Check if this option is selected
                                    onChange={handleOptionChange} // Call handleOptionChange function on change
                            />
                            <label htmlFor="Low-Carb/Keto" style={{ flex: "1", paddingLeft: "8px" }}>Low-Carb/Keto</label>
                        </div>
                        <Divider/>
                        <div>
                            <input
                                type="radio"
                                id="Vegetarian"
                                name="Vegetarian"
                                value="Vegetarian"
                                title="Vegetarian"
                                role="radio"
                                data-test="Dietary-Needs-Input-Vegetarian"
                                aria-checked={selectedOption === "Vegetarian" ? "true" : "false"} // Set aria-checked attribute based on selectedOption state
                                checked={selectedOption === "Vegetarian"} // Check if this option is selected
                                    onChange={handleOptionChange} // Call handleOptionChange function on change
                            />
                            <label htmlFor="Vegetarian" style={{ flex: "1", paddingLeft: "8px" }}>Vegetarian</label>
                        </div>
                        <Divider/>
                    <div>
                            <input
                                type="radio"
                                id="Paleo"
                                name="Paleo"
                                value="Paleo"
                                title="Paleo"
                                role="radio"
                                data-test="Dietary-Needs-Input-Paleo"
                                aria-checked={selectedOption === "Paleo" ? "true" : "false"} // Set aria-checked attribute based on selectedOption state
                                checked={selectedOption === "Paleo"} // Check if this option is selected
                                    onChange={handleOptionChange} // Call handleOptionChange function on change
                            />
                            <label htmlFor="Paleo" style={{ flex: "1", paddingLeft: "8px" }}>Paleo</label>
                        </div>
                        <Divider/>
                        <div>
                            <input
                                type="radio"
                                id="Kohser"
                                name="Kosher"
                                value="Kosher"
                                title="Kosher"
                                role="radio"
                                data-test="Dietary-Needs-Input-Kosher"
                                aria-checked={selectedOption === "Kosher" ? "true" : "false"} // Set aria-checked attribute based on selectedOption state
                              
                                checked={selectedOption === "Kosher"} // Check if this option is selected
                                    onChange={handleOptionChange} // Call handleOptionChange function on change
                            />
                            <label htmlFor="Kosher" style={{ flex: "1", paddingLeft: "8px" }}>Kosher</label>
                        </div>
                        <Divider/>
                        <div>
                        <div >
                            <input
                                type="radio"
                                id="Mediterranean"
                                name="Mediterranean"
                                value="Mediterranean"
                                title="Mediterranean"
                                data-test="Dietary-Needs-Input-Mediterranean"
                                role="radio"
                                aria-checked={selectedOption === "Mediterranean" ? "true" : "false"} // Set aria-checked attribute based on selectedOption state
                              
                                checked={selectedOption === "Mediterranean"} // Check if this option is selected
                                    onChange={handleOptionChange} // Call handleOptionChange function on change
                            />
                            <label htmlFor="Mediterranean" style={{ flex: "1", paddingLeft: "8px" }}>Mediterranean</label>
                        </div>
                        </div>
                        <Divider/>
                        <div>
                            <input
                                type="radio"
                                id="Non-GMO"
                                name="Non-GMO"
                                value="Non-GMO"
                                title="Non-GMO"
                                data-test="Dietary-Needs-Input-Non-GMO"
                                role="radio"
                                aria-checked={selectedOption === "Organic" ? "true" : "false"} // Set aria-checked attribute based on selectedOption state
                              
                                checked={selectedOption === "Non-GMO"} // Check if this option is selected
                                    onChange={handleOptionChange} // Call handleOptionChange function on change
                            />
                            <label htmlFor="Non-GMO" style={{ flex: "1", paddingLeft: "8px" }}>Non-GMO</label>
                        </div>
                    </VStack>
                </ModalBody>
                <ModalFooter data-test="Dietary-Needs-Modal-Footer" title="dietary-modal-footer">
                    <Link to="/menu">
                    <Button
                            mr={3}
                            color="white"
                            background="black"
                            border="white solid 1px"
                            data-test="Dietary-Needs-Modal-Footer-Submit-Button"
                            _hover={{ boxShadow: "0 0 10px 1px tan" }}
                            onClick={handleSubmit} // Call handleSubmit function on button click
                        >
                            Apply
                        </Button>
                        <Button
                            color="white"
                            background="black"
                            border="white solid 1px"
                            data-test="Dietary-Needs-Modal-Footer-Cancel-Button"
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
