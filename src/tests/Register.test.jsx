import {render, screen} from "@testing-library/react";
import {Register} from "../pages/Register";
import { BrowserRouter } from "react-router-dom";
import { afterEach, describe, it, expect, vi} from "vitest";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

//Firebase integration tests must be done within functions > test due to firebase/analytics restrictions 
    //TODO: should navigate to Login if Register is successful

describe("Register page", () => {
    let firstNameInput;
    let lastNameInput;
    let emailInput;
    let confirmEmailInput;
    let passwordInput; 
    let confirmPasswordInput;

    function setup(jsx) {
        return {
            user: userEvent.setup(),
            ...render(jsx),
        };
    }

    afterEach(() => { vi.clearAllMocks;});
    
    it ("should log via the mockConsole", () => {
        const mockConsole = vi.spyOn(console, "log").mockImplementation(() => undefined);

        console.log("test Register mock log");
        expect(mockConsole).toHaveBeenCalledOnce();
        expect(mockConsole).toHaveBeenLastCalledWith("test Register mock log");
    })
    
    it("should render Register page elements correctly", () => {
        render(
        <BrowserRouter>
            <Register/>
        </BrowserRouter>);

        const registerForm = screen.getByTitle("register-form-box");
        expect(registerForm).toBeInTheDocument();
        const firstName = screen.getByTitle("register-first-name");
        expect(firstName).toBeInTheDocument();
        const lastName = screen.getByTitle("register-last-name");
        expect(lastName).toBeInTheDocument();
        const email = screen.getByTitle("register-email");
        expect(email).toBeInTheDocument();
        const confirmEmail = screen.getByTitle("register-confirm-email");
        expect(confirmEmail).toBeInTheDocument();
        const phone = screen.getByTitle("register-phone");
        expect(phone).toBeInTheDocument();
        const password = screen.getByTitle("register-password");
        expect(password).toBeInTheDocument();
        const showPasswordButton = screen.getByTitle("show-password-button");
        expect(showPasswordButton).toBeInTheDocument();
        const confirmPassword = screen.getByTitle("register-confirm-password");
        expect(confirmPassword).toBeInTheDocument();
        const showConfirmPasswordButton = screen.getByTitle("show-confirm-password-button");
        expect(showConfirmPasswordButton).toBeInTheDocument();
        const registerButton = screen.getByTitle("register-register-button");
        expect(registerButton).toBeInTheDocument();
    })

    it("should not process register if first name input is invalid", async () => {
        const mockSave = vi.fn();
        const {user} = setup(
            <BrowserRouter>
                <Register saveData={mockSave}/>
            </BrowserRouter>);

        firstNameInput = screen.getByTitle("register-first-name");
        lastNameInput = screen.getByTitle("register-last-name");
        emailInput = screen.getByTitle("register-email");
        passwordInput = screen.getByTitle("register-password");
        
        await act(async () => {
            await user.type(firstNameInput, "  ");
            await user.type(lastNameInput, "Ramsey");
            await user.type(emailInput, "testing@test.com");
            await user.type(passwordInput, "test123");
            await user.click(screen.getByTitle("register-register-button"));
        });
        
        expect(mockSave).not.toBeCalled();
    });

    it("should not process register if last name input is invalid", async () => {
        const mockSave = vi.fn();
        const {user} = setup(
            <BrowserRouter>
                <Register saveData={mockSave}/>
            </BrowserRouter>);

        firstNameInput = screen.getByTitle("register-first-name");
        lastNameInput = screen.getByTitle("register-last-name");
        emailInput = screen.getByTitle("register-email");
        passwordInput = screen.getByTitle("register-password");
        
        await act(async () => {
            await user.type(firstNameInput, "Gordon");
            await user.type(lastNameInput, " - ");
            await user.type(emailInput, "testing@test.com");
            await user.type(passwordInput, "test123");
            await user.click(screen.getByTitle("register-register-button"));
        });
        
        expect(mockSave).not.toBeCalled();
    });

    it("should not process register if email input is invalid", async () => {
        const mockSave = vi.fn();
        const {user} = setup(
            <BrowserRouter>
                <Register saveData={mockSave}/>
            </BrowserRouter>);

        firstNameInput = screen.getByTitle("register-first-name");
        lastNameInput = screen.getByTitle("register-last-name");
        emailInput = screen.getByTitle("register-email");
        passwordInput = screen.getByTitle("register-password");
        
        await act(async () => {
            await user.type(firstNameInput, "Gordon");
            await user.type(lastNameInput, "Ramsey");
            await user.type(emailInput, "testing.com");
            await user.type(passwordInput, "test123");
            await user.click(screen.getByTitle("register-register-button"));
        });
        
        expect(mockSave).not.toBeCalled();
    });

    it("should not process register if password input is invalid", async () => {
        const mockSave = vi.fn();
        const {user} = setup(
            <BrowserRouter>
                <Register saveData={mockSave}/>
            </BrowserRouter>);

        firstNameInput = screen.getByTitle("register-first-name");
        lastNameInput = screen.getByTitle("register-last-name");
        emailInput = screen.getByTitle("register-email");
        passwordInput = screen.getByTitle("register-password");
        
        await act(async () => {
            await user.type(firstNameInput, "Gordon");
            await user.type(lastNameInput, "Ramsey");
            await user.type(emailInput, "testing@test.com");
            await user.type(passwordInput, " ");
            await user.click(screen.getByTitle("register-register-button"));
        });
        
        expect(mockSave).not.toBeCalled();
    });

    it("should not process register if email and confirmEmail do not match", async () => {
        const mockConsole = vi.spyOn(console, "log").mockImplementation(() => undefined);

        const {user} = setup(
            <BrowserRouter>
                <Register />
            </BrowserRouter>);

        firstNameInput = screen.getByTitle("register-first-name");
        lastNameInput = screen.getByTitle("register-last-name");
        emailInput = screen.getByTitle("register-email");
        confirmEmailInput = screen.getByTitle("register-confirm-email");
        passwordInput = screen.getByTitle("register-password");
        confirmPasswordInput = screen.getByTitle("register-confirm-password");

        await act(async () => {
            await user.type(firstNameInput, "Gordon");
            await user.type(lastNameInput, "Ramsey");
            await user.type(emailInput, "testing@test.com");
            await user.type(confirmEmailInput, "testing@test.gov");
            await user.type(passwordInput, "test123");
            await user.type(confirmPasswordInput, "test123");
            await user.click(screen.getByTitle("register-register-button"));
        });
        
        expect(mockConsole).toHaveBeenCalled();
        expect(mockConsole).toHaveBeenLastCalledWith("passwords or emails do not match");
    });

    it("should not process register if password and confirmPassword do not match", async () => {
        const mockConsole = vi.spyOn(console, "log").mockImplementation(() => undefined);

        const {user} = setup(
            <BrowserRouter>
                <Register />
            </BrowserRouter>);

        firstNameInput = screen.getByTitle("register-first-name");
        lastNameInput = screen.getByTitle("register-last-name");
        emailInput = screen.getByTitle("register-email");
        confirmEmailInput = screen.getByTitle("register-confirm-email");
        passwordInput = screen.getByTitle("register-password");
        confirmPasswordInput = screen.getByTitle("register-confirm-password");

        await act(async () => {
            await user.type(firstNameInput, "Gordon");
            await user.type(lastNameInput, "Ramsey");
            await user.type(emailInput, "testing@test.com");
            await user.type(confirmEmailInput, "testing@test.com");
            await user.type(passwordInput, "test123");
            await user.type(confirmPasswordInput, "test456");
            await user.click(screen.getByTitle("register-register-button"));
        });
        
        expect(mockConsole).toHaveBeenCalled();
        expect(mockConsole).toHaveBeenLastCalledWith("passwords or emails do not match");
    });

    it("should process register if all input is valid and emails and passwords match", async () => {
        const mockConsole = vi.spyOn(console, "log").mockImplementation(() => undefined);

        const {user} = setup(
            <BrowserRouter>
                <Register />
            </BrowserRouter>);

        firstNameInput = screen.getByTitle("register-first-name");
        lastNameInput = screen.getByTitle("register-last-name");
        emailInput = screen.getByTitle("register-email");
        confirmEmailInput = screen.getByTitle("register-confirm-email");
        passwordInput = screen.getByTitle("register-password");
        confirmPasswordInput = screen.getByTitle("register-confirm-password");

        await act(async () => {
            await user.type(firstNameInput, "Gordon");
            await user.type(lastNameInput, "Ramsey");
            await user.type(emailInput, "testing@test.com");
            await user.type(confirmEmailInput, "testing@test.com");
            await user.type(passwordInput, "test123");
            await user.type(confirmPasswordInput, "test123");
            await user.click(screen.getByTitle("register-register-button"));
        });
        
        expect(mockConsole).toHaveBeenCalled();
        expect(mockConsole).toHaveBeenNthCalledWith(1, "valid registration input");
    });
});