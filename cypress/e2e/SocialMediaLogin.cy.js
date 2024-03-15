// describe("template spec",{defaultCommandTimeout:5000}, () => {
//   it("User Can Login With Google", () => {
//     cy.visit("/login")
//     cy.get('[data-test="Social-Media-Tab"]').click
//     cy.get('[data-test="Google-Login-Button"]').click();


//   })
// })
// change environment variable for single suite of tests
describe("Testing Social Media Buttons",
  {
    env: {
      "TEST_UID": "iZWI7ei1AjdOgGNgV7MwZdQJm523"
    },
  },
  () => {
    it("Google Login In", () => {
      cy.visit("/login")
      cy.login(`${Cypress.env("TEST_UID")}`)
      cy.get('[data-test="Social-Media-Tab"]').click
      cy.get('[data-test="Google-Login-Button"]').click();
      
    
    })
  }
)