import {render, screen} from "@testing-library/react";
import {Login} from "../pages/Login";
import { BrowserRouter } from "react-router-dom";

describe("Login page", () => {
    it("should render Login page correctly", () => {
        render( 
            <BrowserRouter>
                <Login/>
            </BrowserRouter>
        );

        const element = screen.getByTitle("login-form-box");
        expect(element).toBeInTheDocument();
    })

    //TODO: integration tests
    //should show FormErrorMessage when all fields are not entered 
    //should not show FormErrorMessage when component is initially loaded
    //should check for valid credentials
    //should navigate to Forgot Password if button clicked 
    //should navigate Home if Login successful
});