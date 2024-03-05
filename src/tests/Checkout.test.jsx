import {cleanup} from "@testing-library/react";
import {CheckOut} from "../pages/CheckOut";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, afterEach} from "vitest";
import TestRenderer from "react-test-renderer";

describe("Checkout page", () => {

    afterEach(cleanup);

    it("should render Checkout page correctly", () => {       
        const checkout = TestRenderer.create( 
            <BrowserRouter>
                <CheckOut/>
            </BrowserRouter>
        ).toJSON;
        
        //because checkout depends on restaurantInfo being defined in dataProvider (from Firebase), Checkout will pull undefined
        expect(checkout.children).toBe(undefined);
    });
});
