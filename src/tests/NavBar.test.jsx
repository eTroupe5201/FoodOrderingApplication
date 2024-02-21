// import { render, screen } from "@testing-library/react";
// import { NavBar } from "../components/NavBar";
// import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("NavBar component", () => {
    beforeEach(() => {
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
})