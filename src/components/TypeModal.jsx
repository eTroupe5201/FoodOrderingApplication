import { Link } from "react-router-dom";
import {VStack,  Divider } from "@chakra-ui/react";
import { Button, Modal, ModalContent, ModalOverlay, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { useDataProvider} from "../components/dataProvider";

export const TypeModal = ({ isOpen, onClose }) => {
   
    const { selectedOption, updateSelectedOption, updateSelectedFilter } = useDataProvider();
    
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

        <div data-testid="type-modal">
        <Modal data-test="Type-Modal" isOpen={isOpen} onClose={onClose} motionPreset="slideInRight">

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

                <ModalHeader data-test="Type-Modal-Header" title="type-modal-header">Type</ModalHeader>
                <ModalCloseButton
                    color="white"
                    background="black"
                    border="white solid 1px"
                    _hover={{ boxShadow: "0 0 10px 1px tan" }}
                    title="type-modal-close-button"

                />
                <ModalBody>
                    <VStack spacing={4} align="stretch">
                        <div>
                    <input
                                type="radio"
                                id="Appetizers"
                                name="Appetizers"
                                value="Appetizers"
                                title="Appetizers"
                                role="radio"
                                data-test="Type-Modal-Input-Appetizers"
                                aria-checked={selectedOption === "Appetizers" ? "true" : "false"} // Set aria-checked attribute based on selectedOption state
                                checked={selectedOption === "Appetizers"} // Check if this option is selected
                                    onChange={handleOptionChange} // Call handleOptionChange function on change
                            />
                            <label data-test="Type-Modal-Label-Appetizers" htmlFor="Appetizers" style={{ flex: "1", paddingLeft: "8px" }}  >Appetizers</label>
                        </div>
                      <Divider />
                      <div>
                    <input
                                type="radio"
                                id="Soups"
                                name="Soups"
                                value="Soups"
                                title="Soups"
                                role="radio"
                                data-test="Type-Modal-Input-Soups"
                                aria-checked={selectedOption === "Soups" ? "true" : "false"} // Set aria-checked attribute based on selectedOption state
                                checked={selectedOption === "Soups"} // Check if this option is selected
                                    onChange={handleOptionChange} // Call handleOptionChange function on change
                            />
                            <label data-test="Type-Modal-Label-Soups" htmlFor="Soups" style={{ flex: "1", paddingLeft: "8px" }} >Soups</label>

                        </div>
                      <Divider />
                      <div>
                    <input
                                type="radio"
                                id="Entrées"
                                name="Entrées"
                                value="Entrées"
                                title="Entrées"
                                role="radio"
                                data-test="Type-Modal-Input-Entrées"
                                aria-checked={selectedOption === "Entrées" ? "true" : "false"} // Set aria-checked attribute based on selectedOption state
                                checked={selectedOption === "Entrées"} // Check if this option is selected
                                    onChange={handleOptionChange} // Call handleOptionChange function on change
                            />
                            <label data-test="Type-Modal-Label-Entrées" htmlFor="Entrées" style={{ flex: "1", paddingLeft: "8px" }} >Entrées</label>
                        </div>
                      <Divider />
                      <div>
                    <input
                                type="radio"
                                id="Salads"
                                name="Salads"
                                value="Salads"
                                title="Salads"
                                role="radio"
                                data-test="Type-Modal-Input-Salads"
                                aria-checked={selectedOption === "Salads" ? "true" : "false"} // Set aria-checked attribute based on selectedOption state
                                checked={selectedOption === "Salads"} // Check if this option is selected
                                    onChange={handleOptionChange} // Call handleOptionChange function on change
                            />
                            <label  data-test="Type-Modal-Label-Salads" htmlFor="Salads" style={{ flex: "1", paddingLeft: "8px" }} >Salads</label>
                        </div>
                      <Divider />
                      <div>
                    <input
                                type="radio"
                                id="Desserts"
                                name="Desserts"
                                value="Desserts"
                                title="Desserts"
                                role="radio"
                                data-test="Type-Modal-Input-Desserts"
                                aria-checked={selectedOption === "Desserts" ? "true" : "false"} // Set aria-checked attribute based on selectedOption state
                           
                                checked={selectedOption === "Desserts"} // Check if this option is selected
                                    onChange={handleOptionChange} // Call handleOptionChange function on change
                            />
                            <label data-test="Type-Modal-Label-Desserts" htmlFor="Desserts" style={{ flex: "1", paddingLeft: "8px" }} >Desserts</label>
                        </div>
                      <Divider />       <div>
                    <input
                                type="radio"
                                id="Beverages"

                                name="Beverages"
                                value="Beverages"
                                title="Beverages"
                                data-test="Type-Modal-Input-Beverages"
                                role="radio"
                                aria-checked={selectedOption === "Beverages" ? "true" : "false"} // Set aria-checked attribute based on selectedOption state
                           
                                checked={selectedOption === "Beverages"} // Check if this option is selected
                                    onChange={handleOptionChange} // Call handleOptionChange function on change
                            />
                            <label data-test="Type-Modal-Label-Beverages" htmlFor="Beverages" style={{ flex: "1", paddingLeft: "8px" }} >Beverages</label>
                        </div>
                      <Divider />
                    </VStack>
                </ModalBody>

                <ModalFooter data-test="Type-Modal-Footer" title="type-modal-footer">

                    <Link to="/menu">
                    <Button
                            mr={3}
                            color="white"
                            background="black"
                            border="tan outset 2px"
                            data-test="Type-Modal-Footer-Apply-Button"

                            _hover={{ boxShadow: "0 0 10px 1px tan" }}
                            onClick={handleSubmit} // Call handleSubmit function on button click
                        >
                            Apply
                        </Button>
                        <Button
                            color="white"
                            background="black"
                            border="tan outset 2px"
                            data-test="Type-Modal-Footer-Cancel-Button"

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