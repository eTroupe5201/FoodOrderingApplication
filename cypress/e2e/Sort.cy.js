describe("template spec", () => {
  it("Contains correct header text", () => {
    cy.visit("/menu") //base url configured
    //cy.wait(1000);//get performance up, temporary to make sure the test has enough time
    cy.get("[data-test='map-item=Soups']").should("exist").should("have.text", "Soups").should("have.css", "font-family", "'Great Vibes', cursive");
    cy.get("[data-test='map-item=Entrées']").should("exist").should("have.text", "Entrées").should("have.css", "font-family", "'Great Vibes', cursive");
    cy.get("[data-test='map-item=Appetizers']").should("exist").should("have.text", "Appetizers").should("have.css", "font-family", "'Great Vibes', cursive");  
    cy.get("[data-test='map-item=Salads']").should("exist").should("have.text", "Salads").should("have.css", "font-family", "'Great Vibes', cursive");
    cy.get("[data-test='map-item=Desserts']").should("exist").should("have.text", "Desserts").should("have.css", "font-family", "'Great Vibes', cursive");
    cy.get("[data-test='map-item=Beverages']").should("exist").should("have.text", "Beverages")
    .should("have.css", "font-family", "'Great Vibes', cursive");

    })
    
})//run npx cy open to open the cypress browser

