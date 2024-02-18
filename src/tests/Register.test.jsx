import {render, screen} from "@testing-library/react";
import {Register} from "../pages/Register";
import { BrowserRouter } from "react-router-dom";

describe("Register page", () => {
    it("should render Register page correctly", () => {
        render(
        <BrowserRouter>
            <Register/>
        </BrowserRouter>);

        const element = screen.getByTitle("register-form-box");
        expect(element).toBeInTheDocument();
    })
});