import {render, screen} from "@testing-library/react";
import {Login} from "./Login";

describe("Login page", () => {
    it("should render Login page correctly", () => {
        render(<Login/>);

        const e1 = screen.getByTitle("login-form-box");
        expect(e1).toBeInTheDocument();
        const e2 = screen.getByTitle("pw-reset-form-box")
        expect(e2).toBeInTheDocument();
        const e3 = screen.getByTitle("email-code-form-box")
        expect(e3).toBeInTheDocument();
        const e4 = screen.getByTitle("pw-change-form-box")
        expect(e4).toBeInTheDocument();
    })
});