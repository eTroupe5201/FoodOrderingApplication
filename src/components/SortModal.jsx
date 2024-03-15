import { Link } from "react-router-dom";
import { VStack, Divider, Button, Modal, ModalContent, ModalOverlay, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { useDataProvider } from "../components/dataProvider";

export const SortModal = ({ isOpen, onClose}) => {
    const { selectedOption, updateSelectedOption, updateSelectedFilter } = useDataProvider();
    
    //Function to handle radio button change
    const handleOptionChange = (event) => {
        console.log("Selected option:", event.target.value)
        updateSelectedOption(event.target.value);
    };

    // Function to handle form submission
    const handleSubmit = () => {
        updateSelectedFilter("Sort");
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
        <div data-testid="sort-modal">
            <Modal data-test="Sort-Modal" isOpen={isOpen} onClose={onClose} motionPreset="slideInRight">
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
                    <ModalHeader data-test="Sort-Modal-Header" fontSize="x-large" title="sort-modal-header">Sort</ModalHeader>
                    <ModalCloseButton
                        color="white"
                        background="black"
                        border="white solid 1px"
                        _hover={{ boxShadow: "0 0 10px 1px tan" }}
                        title="sort-modal-close-button"
                    />
                    <ModalBody>
                        <VStack spacing={4} align="stretch">
                            <div>
                                <input
                                    type="radio"
                                    id="PriceLowToHigh"
                                    name="PriceLowToHigh"
                                    value="PriceLowToHigh"
                                    title="PriceLowToHigh"
                                    data-test="Sort-Modal-Input-PriceLowToHigh"
                                role="radio"
                                aria-checked={selectedOption === "PriceLowToHigh" ? "true" : "false"} // Set aria-checked attribute based on selectedOption state
                                    checked={selectedOption === "PriceLowToHigh"} // Check if this option is selected
                                    onChange={handleOptionChange} // Call handleOptionChange function on change
                                />
                                <label data-test="Sort-Modal-Label-PriceLowToHigh" htmlFor="PriceLowToHigh" style={{ flex: "1", paddingLeft: "8px" }} >Price: low to high</label>
                            </div>
                            <Divider />
                            <div>
                                <input
                                    type="radio"
                                    data-test="Sort-Modal-Input-PriceHighToLow"
                                    id="PriceHighToLow"
                                    name="PriceHighToLow"
                                    value="PriceHighToLow"
                                    title="PriceHighToLow"
                                    role="radio"
                                    aria-checked={selectedOption === "PriceHighToLow" ? "true" : "false"} // Set aria-checked attribute based on selectedOption state
                                    checked={selectedOption === "PriceHighToLow"} // Check if this option is selected
                                    onChange={handleOptionChange} // Call handleOptionChange function on change
                                />
                                <label   data-test="Sort-Modal-Label-PriceHighToLow" htmlFor="PriceHighToLow" style={{ flex: "1", paddingLeft: "8px" }} >Price: high to low</label>
                            </div>
                        </VStack>
                    </ModalBody>
                    <ModalFooter data-test="Sort-Modal-Footer" title="sort-modal-footer">
                        <Link to="/menu">
                            <Button
                                data-test="Sort-Modal-Footer-Submit-Button"
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
                                data-test="Sort-Modal-Footer-Cancel-Button"
                                color="white"
                                background="black"
                                border="tan outset 2px"
                                _hover={{ boxShadow: "0 0 10px 1px tan" }}
                                onClick={handleCancel} // Close the modal without applying changes
                            >
                                Cancel
                            </Button>
                        </Link>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};
