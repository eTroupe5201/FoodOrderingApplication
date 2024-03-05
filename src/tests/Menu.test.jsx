import {render, screen} from "@testing-library/react";
import {Menu} from "../pages/Menu";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect} from "vitest";

describe("Menu page", () => {
   
    it("should render Menu page correctly", () => {
        render( 
            <BrowserRouter>
                <Menu/>
            </BrowserRouter>
        );

        const menuGrid = screen.getByTitle("menu-grid")
        expect(menuGrid).toBeInTheDocument();
    })

});
