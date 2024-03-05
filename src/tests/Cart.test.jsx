import {render, screen} from "@testing-library/react";
import {Cart} from "../pages/Cart";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect} from "vitest";


describe("Cart page", () => {
    it("should render Cart page correctly", () => {
        render( 
            <BrowserRouter>
                <Cart/>
            </BrowserRouter>
        );

        const cartList = screen.getByTitle("cart-item-list");
        expect(cartList).toBeInTheDocument();
    });
});
