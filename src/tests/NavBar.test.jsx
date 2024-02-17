// import {describe, it, expect } from "vitest";
// import TestRenderer from 'react-test-renderer';
// import { MemoryRouter } from "react-router-dom";
// import { NavBar } from "../components/NavBar";

// describe("NavBar.jsx", () => {
//     it("test the children inside my NavBar Component", () => {
//         const navBar = TestRenderer.create(<MemoryRouter><NavBar/></MemoryRouter>).toJSON();
//         console.log(navBar.children);

//         expect(navBar.children.length).toBe(2);

//         expect(navBar.children[0].type).toBe("img");
//         expect(navBar.children[1].type).toBe("ul");

//         expect(navBar.children[1].children.length).toBe(5);

//         expect(navBar.children[1].children[0].type).toBe("li");
//         //expect(navBar.children[1].children[1].type).toBe("li");
//         //expect(navBar.children[1].children[2].type).toBe("li");
//         expect(navBar.children[1].children[3].type).toBe("li");
//        //expect(navBar.children[1].children[4].type).toBe("li"); 
//    })
// })

// it("will create a snapshot of NavBar", () => {
//     const navBar = TestRenderer.create(<MemoryRouter><NavBar/></MemoryRouter>).toJSON();
//     expect(navBar).toMatchSnapshot();
// })

// //NOTES
// //npm test to run
// //https://www.youtube.com/watch?v=GuW3erPa5Z8 vitest tutorial
// //it block tells you what the test is doing
// //describe block tells you what the test is testing
// //it test is when vitest recognizes the test 
