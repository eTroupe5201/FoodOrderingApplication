import {render, screen} from "@testing-library/react";
import {Gratitude} from "../pages/Gratitude";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect} from "vitest";

describe("Gratitude page", () => {
    
    it("should render Gratitude page correctly", () => {
        render( 
            <BrowserRouter>
                <Gratitude/>
            </BrowserRouter>
        );

        const gratitudeContent = screen.getByTitle("gratitude-content-stack");
        expect(gratitudeContent).toBeInTheDocument();
    });
});
