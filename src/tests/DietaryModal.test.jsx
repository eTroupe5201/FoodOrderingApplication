import { DietaryModal } from "../components/DietaryModal";
import {render, screen, cleanup} from "@testing-library/react";
import { describe, it, expect, afterEach} from "vitest";
import { MemoryRouter } from "react-router-dom";
import { fireEvent } from "@testing-library/react";

describe("dietaryModal.jsx", () => {

  afterEach(cleanup);

  it("Renders and interacts correctly", () => {
    render(<MemoryRouter> <DietaryModal isOpen={true} /> 
    </MemoryRouter>); 
    const dietaryModal = screen.getByTestId("dietary-modal");
    expect(dietaryModal).toBeDefined();
    
    const modalHeader = screen.getByTitle("dietary-modal-header");
    expect(modalHeader).toBeInTheDocument();
    const closeButton = screen.getByTitle("dietary-modal-close-button");
    expect(closeButton).toBeInTheDocument();
    const modalFooter = screen.getByTitle("dietary-modal-footer");
    expect(modalFooter).toBeInTheDocument();


});
it("Renders and interacts correctly with radio buttons", () => {
  render(<MemoryRouter> <DietaryModal isOpen={true} /> </MemoryRouter>); 

  const organicRadio =  screen.getByTitle("Organic");
  fireEvent.change(organicRadio, { target: { checked: true } });
  expect(organicRadio).toBeChecked();

  fireEvent.change(organicRadio, { target: { checked: false } });
  expect(organicRadio).not.toBeChecked();

  const lowCarbKetoRadio =  screen.getByTitle("Low-Carb/Keto");
  fireEvent.change(lowCarbKetoRadio, { target: { checked: true } });
  expect(lowCarbKetoRadio).toBeChecked();

  fireEvent.change(lowCarbKetoRadio, { target: { checked: false } });
  expect(lowCarbKetoRadio).not.toBeChecked();


  const VegetarianRadio =  screen.getByTitle("Vegetarian");
  fireEvent.change(VegetarianRadio, { target: { checked: true } });
  expect(VegetarianRadio).toBeChecked();

  fireEvent.change(VegetarianRadio, { target: { checked: false} });
  expect(VegetarianRadio).not.toBeChecked();


  const PaleoRadio =  screen.getByTitle("Paleo");
  fireEvent.change(PaleoRadio, { target: { checked: true } });
  expect(PaleoRadio).toBeChecked();
  
  fireEvent.change(PaleoRadio, { target: { checked: false} });
  expect(PaleoRadio).not.toBeChecked();

  const KosherRadio =  screen.getByTitle("Kosher");
  fireEvent.change(KosherRadio, { target: { checked: true } });
  expect(KosherRadio).toBeChecked();

  fireEvent.change(KosherRadio, { target: { checked: false } });
  expect(KosherRadio).not.toBeChecked();


  const MediterraneanRadio =  screen.getByTitle("Mediterranean");
  fireEvent.change(MediterraneanRadio, { target: { checked: true } });
  expect(MediterraneanRadio).toBeChecked();

  fireEvent.change(MediterraneanRadio, { target: { checked: false } });
  expect(MediterraneanRadio).not.toBeChecked();

  const NonGMORadio =  screen.getByTitle("Non-GMO");
  fireEvent.change(NonGMORadio, { target: { checked: true } });
  expect(NonGMORadio).toBeChecked();

  fireEvent.change(NonGMORadio, { target: { checked: false } });
  expect(NonGMORadio).not.toBeChecked();

  

});
  });

