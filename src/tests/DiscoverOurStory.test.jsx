import { describe, it, expect, vi } from "vitest";
import { DiscoverOurStory } from "../components/DiscoverOurStory";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TestRenderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

describe("DiscoverOurStory.jsx", () => {
    it("Should Render DiscoverOurStory Correctly", () => {
        render(
            <BrowserRouter>
                <DiscoverOurStory />
            </BrowserRouter>
        );

        const discoverOurStoryElement = screen.getByRole("banner");
        expect(discoverOurStoryElement).toBeInTheDocument();
        console.log("DiscoverOurStory content:", discoverOurStoryElement.textContent);
    });
    it("Should render an image with the correct alt attribute", () => {
        render(
            <BrowserRouter>
                <DiscoverOurStory />
            </BrowserRouter>
        );

        const imageElement = screen.getByAltText("logo");
        expect(imageElement).toBeInTheDocument();
    });
 
    it("Should Log Via The MockConsole", () => {
        const mockConsole = vi.spyOn(console, "log").mockImplementation(() => undefined);

        console.log("Test DiscoverOurStory Log");
        expect(mockConsole).toHaveBeenCalledOnce();
        expect(mockConsole).toHaveBeenLastCalledWith("Test DiscoverOurStory Log");
    });

  
    it("test the children inside my DiscoverOurStory Component", () => {
        const discoverOurStory = TestRenderer.create(<MemoryRouter><DiscoverOurStory /></MemoryRouter>).toJSON();
        console.log(discoverOurStory.children);
        expect(discoverOurStory.children.length).toBe(2);
        expect(discoverOurStory.children[0].type).toBe("div");
    });
});