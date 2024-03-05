import {render, screen, cleanup} from "@testing-library/react";
import { CartModal } from "../components/CartModal";
import { describe, it, expect, afterEach} from "vitest";
import { MemoryRouter } from "react-router-dom";

describe("CartModal.jsx", () => {

    afterEach(cleanup);

    it("should render the CartModal Component elements correctly when isOpen=true", () => {
        render(<MemoryRouter> <CartModal isOpen={true} /> </MemoryRouter>);
            
        const cartModal = screen.getByTestId("cart-modal");
        expect(cartModal).toBeDefined();

        const modalHeader = screen.getByTitle("cart-modal-header");
        expect(modalHeader).toBeInTheDocument();
        const closeButton = screen.getByTitle("cart-modal-close-button");
        expect(closeButton).toBeInTheDocument();
        const cartItems = screen.getByTitle("cart-modal-lines");
        expect(cartItems).toBeInTheDocument();
        const costLines = screen.getByTitle("cart-modal-costs");
        expect(costLines).toBeInTheDocument();
        const modalFooter = screen.getByTitle("cart-modal-footer");
        expect(modalFooter).toBeInTheDocument();
    });

    it("should not render the CartModal Component elements when isOpen=false", () => {
        render(<MemoryRouter> <CartModal isOpen={false} /> </MemoryRouter>);
            
        const cartModal = screen.getByTestId("cart-modal");
        expect(cartModal).toBeDefined();

        let childElement = undefined;

        try {
            childElement = screen.getByTitle("cart-modal-header");
        } catch (error) {console.log(error.message)}

        expect(childElement).toBeUndefined();
    });
});
