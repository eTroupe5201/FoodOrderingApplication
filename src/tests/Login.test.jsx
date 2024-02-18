import {fireEvent, render, screen} from "@testing-library/react";
import {Login} from "../pages/Login";
import { BrowserRouter } from "react-router-dom";
import { afterEach, describe, it, expect, vi} from 'vitest';
import { act } from "react-dom/test-utils";

//Firebase integration tests must be done within functions > test due to firebase/analytics restrictions 
    //TODO: integration tests
    //should show FormErrorMessage when all fields are not entered 
    //should not show FormErrorMessage when component is initially loaded
    //should check for valid credentials
    //should navigate Home if Login successful

    
describe("LoginPage with mock of console.log", () => {
    let emailInput;
    let passwordInput; 
    let submitButton; 

    afterEach(() => { vi.clearAllMocks();});

    it ("should log via the mockConsole", () => {
        const mockConsole = vi.spyOn(console, 'log').mockImplementation(() => undefined);

        console.log("test LoginPage log");
        expect(mockConsole).toHaveBeenCalledOnce();
        expect(mockConsole).toHaveBeenLastCalledWith("test LoginPage log");
    })

    it("should render Login page elements correctly", () => {
        render( 
            <BrowserRouter>
                <Login/>
            </BrowserRouter>
        );

        const formBox = screen.getByTitle("login-form-box");
        expect(formBox).toBeInTheDocument();
        const emailElement = screen.getByTitle('login-email');
        expect(emailElement).toBeInTheDocument();
        const passwordElement = screen.getByTitle('login-password');
        expect(passwordElement).toBeInTheDocument();
        const showPasswordButton = screen.getByTitle('login-show-password-button');
        expect(showPasswordButton).toBeInTheDocument();
        const loginButton = screen.getByTitle('login-login-button');
        expect(loginButton).toBeInTheDocument();
        const registerButton = screen.getByTitle('login-register-button');
        expect(registerButton).toBeInTheDocument();
    })

    // it("should navigate to 'Register' page when the button is clicked", () => {
    //     render( 
    //         <BrowserRouter>
    //             <Login/>
    //         </BrowserRouter>
    //     );
    //     const mockConsole = vi.spyOn(console, 'log').mockReturnValue("Showing Register page");//.mockImplementation(() => undefined);

    //     const registerButton = screen.getByTitle('login-register-button');

    //     fireEvent.click(registerButton);
    //     expect(mockConsole).toHaveBeenCalled();
    //     expect(mockConsole).toHaveBeenLastCalledWith("Showing Register page");
    // })

        //should navigate to Forgot Password if button clicked 
});