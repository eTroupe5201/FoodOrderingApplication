import { TypeModal } from "../components/TypeModal";
import {render, screen, cleanup} from "@testing-library/react";
import { describe, it, expect, afterEach} from "vitest";
import { MemoryRouter } from "react-router-dom";
import { fireEvent } from "@testing-library/react";


describe("TypeModal.jsx", () => {

  afterEach(cleanup);

  it("Renders and interacts correctly", () => {
    render(<MemoryRouter> <TypeModal isOpen={true} /> </MemoryRouter>); 
  
    const typeModal = screen.getByTestId("type-modal");
    expect(typeModal).toBeDefined();
    
    const modalHeader = screen.getByTitle("type-modal-header");
    expect(modalHeader).toBeInTheDocument();
    const closeButton = screen.getByTitle("type-modal-close-button");
    expect(closeButton).toBeInTheDocument();
    const modalFooter = screen.getByTitle("type-modal-footer");
    expect(modalFooter).toBeInTheDocument();


});
it("Renders and interacts correctly with radio buttons", () => {
  render(<MemoryRouter> <TypeModal isOpen={true} /> </MemoryRouter>); 
  const appetizersRadio =  screen.getByTitle("Appetizers");
  fireEvent.change(appetizersRadio, { target: { checked: true } });
  expect(appetizersRadio).toBeChecked();

  fireEvent.change(appetizersRadio, { target: { checked: false } });
  expect(appetizersRadio).not.toBeChecked();

  const soupsRadio =  screen.getByTitle("Soups");
  fireEvent.change(soupsRadio, { target: { checked: true } });
  expect(soupsRadio).toBeChecked();

  fireEvent.change(soupsRadio, { target: { checked: false } });
  expect(soupsRadio).not.toBeChecked();


  const dessertsRadio =  screen.getByTitle("Desserts");
  fireEvent.change(dessertsRadio, { target: { checked: true } });
  expect(dessertsRadio).toBeChecked();

  fireEvent.change(dessertsRadio, { target: { checked: false} });
  expect(dessertsRadio).not.toBeChecked();


  const beveragesRadio =  screen.getByTitle("Beverages");
  fireEvent.change(beveragesRadio, { target: { checked: true } });
  expect(beveragesRadio).toBeChecked();
  
  fireEvent.change(beveragesRadio, { target: { checked: false } });
  expect(beveragesRadio).not.toBeChecked();
  

  const saladsRadio =  screen.getByTitle("Salads");
  fireEvent.change(saladsRadio, { target: { checked: true } });
  expect(saladsRadio).toBeChecked();

  fireEvent.change(saladsRadio, { target: { checked: false } });
  expect(saladsRadio).not.toBeChecked();


  const entréesRadio =  screen.getByTitle("Entrées");
  fireEvent.change(entréesRadio, { target: { checked: true } });
  expect(entréesRadio).toBeChecked();

  fireEvent.change(entréesRadio, { target: { checked: false } });
  expect(entréesRadio).not.toBeChecked();


});
  });

