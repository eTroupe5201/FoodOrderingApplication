import { describe, it, expect, vi } from "vitest";
import { MobileNav } from "../components/MobileNav";
import TestRenderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";

describe("MobileNav.jsx", () => {
    // Mock implementation for useDisclosure
    // const mockUseDisclosure = () => ({ isOpen: false, onOpen: jest.fn(), onClose: jest.fn() });

    // it("Should Open Menu When Clicking Hamburger Icon", () => {
    //     // Render the MobileNav component with the mock useDisclosure prop
    //     render(<MobileNav useDisclosure={mockUseDisclosure} />);

    //     // Simulate clicking on the hamburger icon
    //     fireEvent.click(document.querySelector(".chakra-menu__icon"));

    //     // Assert that the menu should be opened
    //     const menu = document.querySelector(".chakra-menu__list");
    //     expect(menu).not.toBeNull();
    //     expect(menu.classList.contains("chakra-menu__list--open")).toBeTruthy();
    // });

    it("Should Log Via The MockConsole", () => {
        const mockConsole = vi.spyOn(console, "log").mockImplementation(() => undefined);

        console.log("Test Footer Log");
        expect(mockConsole).toHaveBeenCalledOnce();
        expect(mockConsole).toHaveBeenLastCalledWith("Test Footer Log");
    });

    it("test the children inside my MobileNav Component", () => {
        const mobileNav = TestRenderer.create(<MemoryRouter><MobileNav /></MemoryRouter>).toJSON();
        console.log(mobileNav.children); // Fixed the typo here
        expect(mobileNav.children).toBe(undefined);
    });

    // Add more test cases if needed
});
