describe("Testing Login Page", () => {
  //I have to figure out how to dynamically generate users by seeding firebase with data, for now I 
  //manually added a user to the database
      it("should allow a registered user to login", () => {
        cy.visit("/login"); // Assuming the login page URL is '/login'
        cy.get('input[name="email-input"]').type('testEmail@test.com');
        // Enter password and submit form
        // Add assertions to validate successful login
    });
})  
