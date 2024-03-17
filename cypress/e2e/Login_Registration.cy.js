// Import the plugin

import "cypress-mailosaur";
const emailDomain= `@w2iju48c.mailosaur.net`;
const serverId = "w2iju48c";
let userEmail = "";
describe("User Registration with Email Verification",{defaultCommandTimeout: 35000}, () => {
  it("should register a new user ", () => {
    // Generate a random email address for registration
   
    cy.visit("/register");
    userEmail = `testuser${Math.floor(Math.random() * 100000)}${emailDomain}`; //randomely generated email 
   // userEmail = `testuser${emailDomain}`; //randomely generated email
    // Fill out the registration form
    cy.get("[data-test='first-name-input']").should("be.visible").type("Test");
    cy.get("[data-test='last-name-input']").should("be.visible").type("User");
    cy.get("[data-test='email-input']").type(userEmail);
    cy.get("[data-test='confirm-email-input']").type(userEmail);
    cy.get("[data-test='phone-input']").type("1234567890");
    cy.get("[data-test='password-input']").type("Test1234");
    cy.get("[data-test='confirm-password-input']").type("Test1234");
    cy.get("[data-test='address-input']").type("123 Test St");
    cy.get("[data-test='register']").click();
    cy.get("[data-test='Close-Instructions-Button']").click();
   
    cy.mailosaurGetMessage(serverId, { sentTo: userEmail })
    .then((email) => {
      expect(email).to.exist;
      expect(email.subject).to.equal("Verify your email for project-731811052079");
      let confirmSignUpLink = email.html.links[0].href;
      cy.window().then((win) => {
        const link = win.document.createElement("a");
        link.href = confirmSignUpLink;
        link.target = "_blank"; // Open the link in a new tab (if necessary)
        win.document.body.appendChild(link);
        const clickSpy = cy.spy(link, "click").as("linkClicked");
        link.click();
        cy.get("@linkClicked").should("have.been.calledOnce");

      });
    });

   // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000); // wait for the email to be sent and received, need to find a better way to do this, works for now
    cy.get("[data-test='complete-verification']").click();
    cy.url().should("eq", "http://localhost:5173/login");
    cy.get("[data-test='email-input']").type(userEmail);
    cy.get("[data-test='password-input']").type("Test1234");
    cy.get("[data-test='submit']").click();
  
    
  });

 

});
