import { SortModal } from "../components/SortModal";
import {render, screen, cleanup} from "@testing-library/react";
import { describe, it, expect, afterEach} from "vitest";
import { MemoryRouter } from "react-router-dom";
import { fireEvent } from "@testing-library/react";

describe("SortModal.jsx", () => {

  afterEach(cleanup);

  it("Renders and interacts correctly", () => {
    render(<MemoryRouter> <SortModal isOpen={true} /> 
    </MemoryRouter>); 
   
    const sortModal = screen.getByTestId("sort-modal");
    expect(sortModal).toBeDefined();
    
    const modalHeader = screen.getByTitle("sort-modal-header");
    expect(modalHeader).toBeInTheDocument();
    const closeButton = screen.getByTitle("sort-modal-close-button");
    expect(closeButton).toBeInTheDocument();
    const modalFooter = screen.getByTitle("sort-modal-footer");
    expect(modalFooter).toBeInTheDocument();


});
it("Renders and interacts correctly with radio buttons", () => {
  render(<MemoryRouter> <SortModal isOpen={true} /> </MemoryRouter>); 

  const PriceLowToHighRadio =  screen.getByTitle("PriceLowToHigh");
  fireEvent.change(PriceLowToHighRadio, { target: { checked: true } });
  expect(PriceLowToHighRadio).toBeChecked();

  fireEvent.change(PriceLowToHighRadio, { target: { checked: false } });
  expect(PriceLowToHighRadio).not.toBeChecked();

  const PriceHighToLowRadio =  screen.getByTitle("PriceHighToLow");
  fireEvent.change(PriceHighToLowRadio, { target: { checked: true } });
  expect(PriceHighToLowRadio).toBeChecked();

  fireEvent.change(PriceHighToLowRadio, { target: { checked: false } });
  expect(PriceHighToLowRadio).not.toBeChecked();



});
  });

