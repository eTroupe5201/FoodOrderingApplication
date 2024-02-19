import {render, screen} from "@testing-library/react";
import {ForgotPassword} from "../pages/ForgotPassword";
import { BrowserRouter } from "react-router-dom";
import { afterEach, describe, it, expect, vi} from "vitest";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

//Firebase integration tests must be done within functions > test due to firebase/analytics restrictions 
    //TODO: should navigate to Home after valid email submitted
    //TODO: should show alert if email provided in an incorrect format

describe("ForgotPassword page", () => {
    let emailInput;

    function setup(jsx) {
        return {
            user: userEvent.setup(),
            ...render(jsx),
        };
    }

    afterEach(() => { vi.clearAllMocks();});

    it ("should log via the mockConsole", () => {
        const mockConsole = vi.spyOn(console, "log").mockImplementation(() => undefined);

        console.log("test ForgotPassword mock log");
        expect(mockConsole).toHaveBeenCalledOnce();
        expect(mockConsole).toHaveBeenLastCalledWith("test ForgotPassword mock log");
    })

    it("should render ForgotPassword page correctly", () => {
        render( 
            <BrowserRouter>
                <ForgotPassword/>
            </BrowserRouter>
        );

        const resetForm = screen.getByTitle("pw-reset-form-box")
        expect(resetForm).toBeInTheDocument();
        const email = screen.getByTitle("forgot-password-email")
        expect(email).toBeInTheDocument();
    })

    it("should show an alert if no input or all whitespace is entered", async () => {
        const mockConsole = vi.spyOn(console, "log").mockImplementation(() => undefined);

        const {user} = setup(
            <BrowserRouter>
                <ForgotPassword />
            </BrowserRouter>);

        emailInput = screen.getByTitle("forgot-password-email");
        
        await act(async () => {
            await user.type(emailInput, "    ");
            await user.click(screen.getByTitle("forgot-password-button"))
        });

        expect(mockConsole).toHaveBeenCalled();
        expect(mockConsole).toHaveBeenNthCalledWith(2, "invalid email - empty string or only whitespace");
    });

});
