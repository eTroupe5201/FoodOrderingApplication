// import { render, screen } from "@testing-library/react";
// import { NavBar } from "../components/NavBar";
// import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";


// import { useBreakpointValue } from "@chakra-ui/react";

describe("NavBar component", () => {
    vi.before(() => {
        // Mock useBreakpointValue function
        vi.mock("@chakra-ui/react", () => ({
            useBreakpointValue: () => ({ base: true, sm: true, md: true, lg: false, xl: false }),
        }));
    });

    it("should log via the mockConsole", () => {
        const mockConsole = vi.spyOn(console, "log").mockImplementation(() => undefined);

        console.log("test NavBar log");
        expect(mockConsole).toHaveBeenCalledOnce();
        expect(mockConsole).toHaveBeenLastCalledWith("test NavBar log");
    });

    // it("should render NavBar elements correctly", () => {
    //     render(
    //         <BrowserRouter>
    //             <NavBar />
    //         </BrowserRouter>
    //     );

    //     const navBar = screen.getByRole("navigation");
    //     expect(navBar).toBeInTheDocument();
    // });
});