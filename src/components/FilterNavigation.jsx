import React from "react";
import { Divider, Button, HStack } from "@chakra-ui/react";
import { HiArrowsUpDown } from "react-icons/hi2";
import { DietaryModal } from "./DietaryModal";
import { SortModal } from "./SortModal";
import { TypeModal } from "./TypeModal";
import { FilterModal } from "./FilterModal";

export function FilterNavigation({ setSortBy }) {
  const [isDietaryModalOpen, setIsDietaryModalOpen] = React.useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = React.useState(false);
  const [isTypeModalOpen, setIsTypeModalOpen] = React.useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = React.useState(false);

  const handleSortModalOpen = () => {
    setIsSortModalOpen(true);
  };

  const handleSortModalClose = () => {
    setIsSortModalOpen(false);
  };

  const handleTypeModalOpen = () => {
    setIsTypeModalOpen(true);
  };

  const handleTypeModalClose = () => {
    setIsTypeModalOpen(false);
  };

  const handleDietaryModalOpen = () => {
    setIsDietaryModalOpen(true);
  };

  const handleDietaryModalClose = () => {
    setIsDietaryModalOpen(false);
  };

  const handleFilterModalOpen = () => {
    setIsFilterModalOpen(true);
  };

  const handleFilterModalClose = () => {
    setIsFilterModalOpen(false);
  };

  return (
    <>
      <HStack data-test="FilterNavigation" margin="2%">
        <Button data-test="FilterButton" className="filter-button" onClick={handleFilterModalOpen}> <HiArrowsUpDown />Filter</Button>
        <Button data-test="DietaryNeeds"className="filter-button" onClick={handleDietaryModalOpen}> Dietary Needs </Button>
        <Button data-test="TypeButton" className="filter-button" onClick={handleTypeModalOpen}>Type</Button>
        <Button data-test="SortButton" className="filter-button" onClick={handleSortModalOpen}>Sort</Button>
      </HStack>

      <Divider />

      {/* Render the modals */}
      <FilterModal isOpen={isFilterModalOpen} onClose={handleFilterModalClose} />
      <DietaryModal isOpen={isDietaryModalOpen} onClose={handleDietaryModalClose} />
      <SortModal isOpen={isSortModalOpen} onClose={handleSortModalClose} setSortBy={setSortBy} /> 
      <TypeModal isOpen={isTypeModalOpen} onClose={handleTypeModalClose} />
    </>
  );
}
