import {describe, it, expect, vi } from "vitest";
import TestRenderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { Footer } from "../components/Footer";
 import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Footer.jsx", () => {
  
    it("Should Render Footer elements Correctly", () => {
        render(
            <BrowserRouter>
                <Footer />
            </BrowserRouter>
        );

        const footer = screen.getByRole("navigation"); // Change
        expect(footer).toBeInTheDocument();
        console.log("Footer Content:", footer.textContent);
    });
    it("Should Log Via The MockConsole", () => {
        const mockConsole = vi.spyOn(console, "log").mockImplementation(() => undefined);

        console.log("Test Footer Log");
        expect(mockConsole).toHaveBeenCalledOnce();
        expect(mockConsole).toHaveBeenLastCalledWith("Test Footer Log");
    });

    it("test the children inside my Footer Component", () => {
        const footer = TestRenderer.create(<MemoryRouter><Footer/></MemoryRouter>).toJSON();
        console.log(footer.children);
        expect(footer.children.length).toBe(2);
        expect(footer.children[0].type).toBe("section");

});
});


