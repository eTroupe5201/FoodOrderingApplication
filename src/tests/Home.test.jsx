import {render, screen} from "@testing-library/react";
import {Home} from "../pages/Home";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect} from "vitest";

describe("Home page", () => {
    it("should render Home page elements correctly", () => {
        render( 
            <BrowserRouter>
                <Home/>
            </BrowserRouter>
        );

        const homePage = screen.getByTitle("home-page");
        expect(homePage).toBeInTheDocument();
    })
   
});