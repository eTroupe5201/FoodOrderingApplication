import { render, screen} from "@testing-library/react";
import {Contact} from "../pages/Contact";
import { BrowserRouter } from "react-router-dom";
import { afterEach, describe, it, expect, vi} from "vitest";
// import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

describe("Contact page", () => {
    function setup(jsx) {
        return {
            user: userEvent.setup(),
            ...render(jsx),
        };
    }

    afterEach(() => { vi.clearAllMocks;});
    
    it ("should log via the mockConsole", () => {
        const mockConsole = vi.spyOn(console, "log").mockImplementation(() => undefined);

        console.log("test Contact mock log");
        expect(mockConsole).toHaveBeenCalledOnce();
        expect(mockConsole).toHaveBeenLastCalledWith("test Contact mock log");
    })
    
    it("should render Contact page correctly", () => {
        render(
            <BrowserRouter>
                <Contact/>
            </BrowserRouter>);

        const headerElement = screen.getByTitle("header");
        expect(headerElement).toBeInTheDocument();
        const message = screen.getByTitle("contact-message")
        expect(message).toBeInTheDocument();
        const e3 = screen.getByTitle("form-box")
        expect(e3).toBeInTheDocument();

        const e5 = screen.getByTitle("form-submitted")
        expect(e5).not.toBeVisible();
    
    })


    // it ("should show an error message when fields of the form are not all valid", async () => {
    //     render(<Contact/>);
    //     const button = screen.getByRole("button");
        

    // })

    // it ("should create a container for the form and send to the server", async () => {
    //     render(<Contact/>);
        
    // })
})