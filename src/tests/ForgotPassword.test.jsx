import {render, screen} from "@testing-library/react";
import {ForgotPassword} from "../pages/ForgotPassword";
import { BrowserRouter } from "react-router-dom";

describe("ForgotPassword page", () => {
    it("should render ForgotPassword page correctly", () => {
        render( 
            <BrowserRouter>
                <ForgotPassword/>
            </BrowserRouter>
        );

        // const e2 = screen.getByTitle("pw-reset-form-box")
        // expect(e2).toBeInTheDocument();
        // const e3 = screen.getByTitle("email-code-form-box")
        // expect(e3).toBeInTheDocument();
        // const e4 = screen.getByTitle("pw-change-form-box")
        // expect(e4).toBeInTheDocument();
    })
});