import {cleanup, render, screen} from "@testing-library/react";
import {Profile} from "../pages/Profile";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, afterEach} from "vitest";

describe("Profile page", () => {
    afterEach(cleanup);

    it("should render Profile page correctly", () => {
        render( 
            <BrowserRouter>
                <Profile/>
            </BrowserRouter>
        );

        const profileContent = screen.getByTitle("profile-content")
        expect(profileContent).toBeInTheDocument();

        const editProfileButton = screen.getByTitle("edit-profile-button")
        expect(editProfileButton).toBeInTheDocument();

        const resetPwBox = screen.getByTitle("reset-pw-box")
        expect(resetPwBox).toBeInTheDocument();

        const orderHistoryBox = screen.getByTitle("order-history-box")
        expect(orderHistoryBox).toBeInTheDocument();
    });
        
    it("should not populate data in the user info sections since no user is logged in", () => {
        render( 
            <BrowserRouter>
                <Profile/>
            </BrowserRouter>
        ); 

        const firstName = screen.getByTitle("profile-first-name")
        expect(firstName).toBeInTheDocument();
        expect(firstName).not.toHaveValue();

        const lastName = screen.getByTitle("profile-last-name")
        expect(lastName).toBeInTheDocument();
        expect(lastName).not.toHaveValue();

        const email = screen.getByTitle("profile-email")
        expect(email).toBeInTheDocument();
        expect(email).not.toHaveValue();

        const phone = screen.getByTitle("profile-phone")
        expect(phone).toBeInTheDocument();
        expect(phone).not.toHaveValue();
    });    
});
