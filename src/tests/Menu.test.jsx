import {render, screen} from "@testing-library/react";
import {Menu} from "../pages/Menu";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect} from "vitest";

//Firebase integration tests must be done within functions > test due to firebase/analytics restrictions 
    //TODO: should show items by category 

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
