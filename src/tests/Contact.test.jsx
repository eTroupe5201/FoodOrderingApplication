import { render, screen} from "@testing-library/react";
import {Contact} from "../pages/Contact";
import { BrowserRouter } from "react-router-dom";
import { afterEach, describe, it, expect, vi} from "vitest";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

//TODO: uncomment test for message maxLength once functionality added

describe("Contact page", () => {
    let firstNameInput;
    let lastNameInput;
    let emailInput;
    let phoneInput;
    let messageInput; 
    
    function setup(jsx) {
        return {
            user: userEvent.setup(),
            ...render(jsx),
        };
    }

    afterEach(() => { vi.clearAllMocks;});
    
    it ("should log via the mockConsole", () => {
        const mockConsole = vi.spyOn(console, "log").mockImplementation(() => undefined);

        console.log("test Contact mock log");
        expect(mockConsole).toHaveBeenCalledOnce();
        expect(mockConsole).toHaveBeenLastCalledWith("test Contact mock log");
    })
    
    it("should render Contact page correctly", () => {
        render(
            <BrowserRouter>
                <Contact/>
            </BrowserRouter>);

        const headerElement = screen.getByTitle("header");
        expect(headerElement).toBeInTheDocument();
        const message = screen.getByTitle("contact-header-message")
        expect(message).toBeInTheDocument();
        const formBox = screen.getByTitle("form-box")
        expect(formBox).toBeInTheDocument();

        const successFormBox = screen.getByTitle("form-submitted")
        expect(successFormBox).not.toBeVisible();
    })

    it("should not process contact if first name input is invalid", async () => {
        const mockSave = vi.fn();
        const {user} = setup(
            <BrowserRouter>
                <Contact saveData={mockSave}/>
            </BrowserRouter>);

        firstNameInput = screen.getByTitle("contact-first-name");
        lastNameInput = screen.getByTitle("contact-last-name");
        emailInput = screen.getByTitle("contact-email");
        phoneInput = screen.getByTitle("contact-phone");
        messageInput = screen.getByTitle("contact-message");

        await act(async () => {
            await user.type(firstNameInput, " ");
            await user.type(lastNameInput, "Ramsey");
            await user.type(emailInput, "testing@test.com");
            await user.type(phoneInput, "0123456789");
            await user.type(messageInput, "Test message");
            await user.click(screen.getByTitle("contact-submit-button"));
        });
        
        expect(mockSave).not.toBeCalled();
    });

    it("should not process contact if last name input is invalid", async () => {
        const mockSave = vi.fn();
        const {user} = setup(
            <BrowserRouter>
                <Contact saveData={mockSave}/>
            </BrowserRouter>);

        firstNameInput = screen.getByTitle("contact-first-name");
        lastNameInput = screen.getByTitle("contact-last-name");
        emailInput = screen.getByTitle("contact-email");
        phoneInput = screen.getByTitle("contact-phone");
        messageInput = screen.getByTitle("contact-message");

        await act(async () => {
            await user.type(firstNameInput, "Gordon");
            await user.type(lastNameInput, " ");
            await user.type(emailInput, "testing@test.com");
            await user.type(phoneInput, "0123456789");
            await user.type(messageInput, "Test message");
            await user.click(screen.getByTitle("contact-submit-button"));
        });
        
        expect(mockSave).not.toBeCalled();
    });

    it("should not process contact if email input is invalid", async () => {
        const mockSave = vi.fn();
        const {user} = setup(
            <BrowserRouter>
                <Contact saveData={mockSave}/>
            </BrowserRouter>);

        firstNameInput = screen.getByTitle("contact-first-name");
        lastNameInput = screen.getByTitle("contact-last-name");
        emailInput = screen.getByTitle("contact-email");
        phoneInput = screen.getByTitle("contact-phone");
        messageInput = screen.getByTitle("contact-message");

        await act(async () => {
            await user.type(firstNameInput, "Gordon");
            await user.type(lastNameInput, "Ramsey");
            await user.type(emailInput, "testing");
            await user.type(phoneInput, "0123456789");
            await user.type(messageInput, "Test message");
            await user.click(screen.getByTitle("contact-submit-button"));
        });
        
        expect(mockSave).not.toBeCalled();
    });

    it("should process contact if no phone input is provided, since it is not required", async () => {
        const mockConsole = vi.spyOn(console, "log").mockImplementation(() => undefined);

        const {user} = setup(
            <BrowserRouter>
                <Contact />
            </BrowserRouter>);

        firstNameInput = screen.getByTitle("contact-first-name");
        lastNameInput = screen.getByTitle("contact-last-name");
        emailInput = screen.getByTitle("contact-email");
        phoneInput = screen.getByTitle("contact-phone");
        messageInput = screen.getByTitle("contact-message");

        await act(async () => {
            await user.type(firstNameInput, "Gordon");
            await user.type(lastNameInput, "Ramsey");
            await user.type(emailInput, "testing@test.test");
            await user.type(phoneInput, " ");
            await user.type(messageInput, "Test message");
            await user.click(screen.getByTitle("contact-submit-button"));
        });
        
        expect(mockConsole).toHaveBeenCalled();
        //expect(mockConsole).toHaveBeenNthCalledWith(1 , "valid contact form submitted");
    });

    it("should not process contact if message input is too short", async () => {
        const mockSave = vi.fn();
        const {user} = setup(
            <BrowserRouter>
                <Contact saveData={mockSave}/>
            </BrowserRouter>);

        firstNameInput = screen.getByTitle("contact-first-name");
        lastNameInput = screen.getByTitle("contact-last-name");
        emailInput = screen.getByTitle("contact-email");
        phoneInput = screen.getByTitle("contact-phone");
        messageInput = screen.getByTitle("contact-message");

        await act(async () => {
            await user.type(firstNameInput, "Gordon");
            await user.type(lastNameInput, "Ramsey");
            await user.type(emailInput, "test@test.test");
            await user.type(phoneInput, "0123456789");
            await user.type(messageInput, " ");
            await user.click(screen.getByTitle("contact-submit-button"));
        });
        
        expect(mockSave).not.toBeCalled();
    });

    // it("should not process contact if message input is too long", async () => {
    //     const mockSave = vi.fn();
    //     const {user} = setup(
    //         <BrowserRouter>
    //             <Contact saveData={mockSave}/>
    //         </BrowserRouter>);

    //     firstNameInput = screen.getByTitle("contact-first-name");
    //     lastNameInput = screen.getByTitle("contact-last-name");
    //     emailInput = screen.getByTitle("contact-email");
    //     phoneInput = screen.getByTitle("contact-phone");
    //     messageInput = screen.getByTitle("contact-message");

    //     await act(async () => {
    //         await user.type(firstNameInput, "Gordon");
    //         await user.type(lastNameInput, "Ramsey");
    //         await user.type(emailInput, "test@test.test");
    //         await user.type(phoneInput, "0123456789");
    //         await user.type(messageInput, "The unanimous Declaration of the thirteen united States of America, When in the Course of human events, it becomes necessary for one people to dissolve the political bands which have connected them with another, and to assume among the powers of the earth, the separate and equal station to which the Laws of Nature and of Nature's God entitle them, a decent respect to the opinions of mankind requires that they should declare the causes which impel them to the separation.");
    //         await user.click(screen.getByTitle("contact-submit-button"));
    //     });
        
    //     expect(mockSave).not.toBeCalled();
    // });
    
    it("should process contact if all input is valid", async () => {
        const mockSave = vi.fn();
        const {user} = setup(
            <BrowserRouter>
                <Contact saveData={mockSave}/>
            </BrowserRouter>);

        firstNameInput = screen.getByTitle("contact-first-name");
        lastNameInput = screen.getByTitle("contact-last-name");
        emailInput = screen.getByTitle("contact-email");
        phoneInput = screen.getByTitle("contact-phone");
        messageInput = screen.getByTitle("contact-message");

        await act(async () => {
            await user.type(firstNameInput, "Gordon");
            await user.type(lastNameInput, "Ramsey");
            await user.type(emailInput, "test@test.test");
            await user.type(phoneInput, "0123456789");
            await user.type(messageInput, "This is my message");
            await user.click(screen.getByTitle("contact-submit-button"));
        });
        
        expect(mockSave).toBeCalled();
    });
})