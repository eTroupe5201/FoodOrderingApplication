import { describe, it, expect } from "vitest";
import { DiscoverOurMenu } from "../components/DiscoverOurMenu";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TestRenderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

describe("DiscoverOurMenu.jsx", () => {
    it("Should Render DiscoverOurMenu Correctly", () => {
        render(
            <BrowserRouter>
                <DiscoverOurMenu />
            </BrowserRouter>
        );

        const discoverOurStoryElement = screen.getByRole("DiscoverOurMenu");
        expect(discoverOurStoryElement).toBeInTheDocument();
        console.log("DiscoverOurMenu content:", discoverOurStoryElement.textContent);
    });

  
    it("test the children inside my DiscoverOurMenu Component", () => {
        const discoverOurMenu = TestRenderer.create(<MemoryRouter><DiscoverOurMenu /></MemoryRouter>).toJSON();
        console.log(discoverOurMenu.children);
        expect(discoverOurMenu.children.length).toBe(2);
        expect(discoverOurMenu.children[0].type).toBe("div");
    });
});