import {render, screen} from "@testing-library/react";
import {Register} from "../pages/Register";
import { BrowserRouter } from "react-router-dom";

describe("Register page", () => {
    it("should render Register page correctly", () => {
        render(
        <BrowserRouter>
            <Register/>
        </BrowserRouter>);

        // const e1 = screen.getByTitle("login-form-box");
        // expect(e1).toBeInTheDocument();
        // const e2 = screen.getByTitle("pw-reset-form-box")
        // expect(e2).toBeInTheDocument();
        // const e3 = screen.getByTitle("email-code-form-box")
        // expect(e3).toBeInTheDocument();
        // const e4 = screen.getByTitle("pw-change-form-box")
        // expect(e4).toBeInTheDocument();
    })
});