import { Link} from "react-router-dom";
import { VStack, Divider } from "@chakra-ui/react";
import {
    Button,
    Modal,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { DietaryModal } from "./DietaryModal";
import { SortModal } from "./SortModal";
import { TypeModal } from "./TypeModal";

export const FilterModal = ({ isOpen, onClose }) => {
    const [isDietaryModalOpen, setIsDietaryModalOpen] = useState(false);
    const [isSortModalOpen, setIsSortModalOpen] = useState(false);
    const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);

    const handleSortModalOpen = () => {
        setIsSortModalOpen(true);
        onClose(); // Close the filter modal when the sort modal is opened
    };

    const handleSortModalClose = () => {
        setIsSortModalOpen(false);
    };

    const handleTypeModalOpen = () => {
        setIsTypeModalOpen(true);
        onClose(); // Close the filter modal when the type modal is opened
    };

    const handleTypeModalClose = () => {
        setIsTypeModalOpen(false);
    };

    const handleDietaryModalOpen = () => {
        setIsDietaryModalOpen(true);
        onClose(); // Close the filter modal when the dietary modal is opened
    };

    const handleDietaryModalClose = () => {
        setIsDietaryModalOpen(false);
    };

    return (
        <>
            <DietaryModal isOpen={isDietaryModalOpen} onClose={handleDietaryModalClose} />
            <SortModal isOpen={isSortModalOpen} onClose={handleSortModalClose} />
            <TypeModal isOpen={isTypeModalOpen} onClose={handleTypeModalClose} />

            <div data-testid="filter-modal">
                <Modal  data-test="filter-Modal" isOpen={isOpen} onClose={onClose} motionPreset="slideInRight">

                    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(-10deg)" />
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
                        padding="1rem"
                    >

                        <ModalHeader data-test="filter-modal-header" fontSize="x-large" title="filter-modal-header">

                            All Filters
                        </ModalHeader>
                        <ModalCloseButton
                            color="white"
                            background="black"
                            border="white solid 1px"
                            _hover={{ boxShadow: "0 0 10px 1px tan" }}

                            title="filter-modal-close-button"
                        />
                        <ModalBody>
                            <VStack spacing={4} align="stretch">
                                <Button background="black" 
                                data-test="Filter-Modal-Dietary-Needs-Button"
                                  role="button"
                                  aria-label="Dietary Needs"
                                name="Dietary Needs" 
                                border="tan outset 2px" 
                                color="white"
                                title="Dietary Needs"
                                onClick={handleDietaryModalOpen}>
                                    Dietary Needs
                                </Button>
                                <Divider />
                                <Button 
                                data-test="Filter-Modal-Type-Button"
                                  role="button"
                                  aria-label="Type"
                                title="Type" background="black" name="Type" border="tan outset 2px" color="white" onClick={handleTypeModalOpen}>
                                    Type
                                </Button>
                                <Divider />
                                <Button data-test="Filter-Modal-Sort-Button" title="Sort" background="black" name="Sort" border="tan outset 2px" color="white" onClick={handleSortModalOpen}>

                                    Sort
                                </Button>
                                <Divider />
                            </VStack>
                        </ModalBody>

                        <ModalFooter data-test="Filter-Modal-Footer" title="filter-modal-footer">
                            <Link to="/menu">
                                <Button
                                    data-test="Filter-Modal-Cancel-Button"

                                    color="white"
                                    background="black"
                                    border="tan outset 2px"
                                    _hover={{ boxShadow: "0 0 10px 1px tan" }}
                                    onClick={onClose} // Close the modal without applying changes
                                >
                                    Cancel
                                </Button>
                            </Link>
                            <Link></Link>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </>
    );
};