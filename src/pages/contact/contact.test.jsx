import {fireEvent, render, screen} from "@testing-library/react";
import {Contact} from "./Contact";
import { Toast } from "@chakra-ui/react";

describe("Contact page", () => {
    it("should render Contact page correctly", () => {
        render(<Contact/>);

        const e1 = screen.getByTitle("header");
        expect(e1).toBeInTheDocument();
        const e2 = screen.getByTitle("contact-message")
        expect(e2).toBeInTheDocument();
        const e3 = screen.getByTitle("form-box")
        expect(e3).toBeInTheDocument();
    })

    // it ("should show an error message when fields of the form are not all valid", async () => {
    //     render(<Contact/>);
    //     const button = screen.getByRole("button");
        

    // })

    // it ("should create a container for the form and send to the server", async () => {
    //     render(<Contact/>);
        
    // })
})