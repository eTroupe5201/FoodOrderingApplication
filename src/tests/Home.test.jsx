import {render, screen} from "@testing-library/react";
import {Home} from "../pages/Home";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi} from 'vitest';

describe("Home page", () => {
   
    it ("should log via the mockConsole", () => {
        const mockConsole = vi.spyOn(console, 'log').mockImplementation(() => undefined);

        console.log("test Home log");
        expect(mockConsole).toHaveBeenCalledOnce();
        expect(mockConsole).toHaveBeenLastCalledWith("test Home log");
    })

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