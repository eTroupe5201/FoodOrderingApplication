import {render, screen} from "@testing-library/react";
import {Login} from "../pages/Login";
import { BrowserRouter } from "react-router-dom";
import { afterEach, describe, it, expect, vi} from 'vitest';
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

//Firebase integration tests must be done within functions > test due to firebase/analytics restrictions 
    //TODO: should navigate Home if Login successful
    //TODO: should navigate to Register if clicked
    //TODO: should navigate to ForgotPassword if clicked

describe("Login page", () => {
    let emailInput;
    let passwordInput; 

    function setup(jsx) {
        return {
            user: userEvent.setup(),
            ...render(jsx),
        };
    }

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

    it("should not process login if email input is invalid", async () => {
        const mockSave = vi.fn();
        const {user} = setup(
            <BrowserRouter>
                <Login saveData={mockSave}/>
            </BrowserRouter>);

        emailInput = screen.getByTitle('login-email');
        passwordInput = screen.getByTitle('login-password');

        await act(async () => {
            await user.type(emailInput, 'testing.com');
            await user.type(passwordInput, 'test1234');
            await user.click(screen.getByTitle('login-login-button'));
        });
        
        expect(mockSave).not.toBeCalled();
    });

    it("should not process login if password input is invalid", async () => {
        const mockSave = vi.fn();
        const {user} = setup(
            <BrowserRouter>
                <Login saveData={mockSave}/>
            </BrowserRouter>);

        emailInput = screen.getByTitle('login-email');
        passwordInput = screen.getByTitle('login-password');
        
        await act(async () => {
            await user.type(emailInput, 'testing@test.com');
            await user.type(passwordInput, " ");
            await user.click(screen.getByTitle('login-login-button'));
        });
        
        expect(mockSave).not.toBeCalled();
        });

    it("should process login if email and password input are valid", async () => {
        const mockSave = vi.fn();
        const {user} = setup(
            <BrowserRouter>
                <Login saveData={mockSave}/>
            </BrowserRouter>);

        emailInput = screen.getByTitle('login-email');
        passwordInput = screen.getByTitle('login-password');
        
        await act(async () => {
            await user.type(emailInput, 'testing@test.com');
            await user.type(passwordInput, "test123");
            await user.click(screen.getByTitle('login-login-button'));
        });
        
        expect(mockSave).toBeCalled();
    });

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


