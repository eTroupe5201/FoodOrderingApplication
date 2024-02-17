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

        const e1 = screen.getByTitle("login-form-box");
        expect(e1).toBeInTheDocument();
    })
});