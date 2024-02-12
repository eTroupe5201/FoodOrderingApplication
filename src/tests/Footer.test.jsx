import {describe, it, expect } from "vitest";
import TestRenderer from 'react-test-renderer';
import { MemoryRouter } from "react-router-dom";
import { Footer } from "../components/Footer";

describe("Footer.jsx", () => {
    it("test the children inside my Footer Component", () => {
        const footer = TestRenderer.create(<MemoryRouter><Footer/></MemoryRouter>).toJSON();
        console.log(footer.children);
        expect(footer.children.length).toBe(1);
        expect(footer.children[0].type).toBe("div");
        expect(footer.children[0].children.length).toBe(1);

    }) })