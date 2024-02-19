import {render, screen} from "@testing-library/react";
import {Menu} from "../pages/Menu";
import { BrowserRouter } from "react-router-dom";
import { afterEach, describe, it, expect, vi} from "vitest";
import userEvent from "@testing-library/user-event";

//Firebase integration tests must be done within functions > test due to firebase/analytics restrictions 
    //TODO: should show items by category 

describe("Menu page", () => {
    function setup(jsx) {
        return {
            user: userEvent.setup(),
            ...render(jsx),
        };
    }

    afterEach(() => { vi.clearAllMocks();});

    it ("should log via the mockConsole", () => {
        const mockConsole = vi.spyOn(console, "log").mockImplementation(() => undefined);

        console.log("test Menu mock log");
        expect(mockConsole).toHaveBeenCalledOnce();
        expect(mockConsole).toHaveBeenLastCalledWith("test Menu mock log");
    })

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
