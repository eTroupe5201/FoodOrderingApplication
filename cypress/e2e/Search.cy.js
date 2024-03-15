describe("Testing Search Functionality", {defaultCommandTimeout:5000}, () => {
  it("Search Bar Works From Main Page", () => {
    cy.visit("/")
    cy.get('[data-test="Search-Input"]').type("Soup");
    cy.get('[data-test="Search-Input-Button"]').click();
    cy.get('[data-test="Search-Header"]').should("exist").should("have.text", "Search Results");
    cy.get('[data-test="search-item-label=Harvest Delight Pumpkin Soup"]').should("exist");  
    cy.get('[data-test="search-item-label=Classic Chicken Noodle Soup"]').should("exist");
    cy.get('[data-test="search-item-label=Fiery Thai Tom Yum"]').should("exist");
  })
  it("Search Bar Works When Item Is Not Found", () => {
    cy.visit("/")
    cy.get('[data-test="Search-Input"]').type("Donut");
    cy.get('[data-test="Search-Input-Button"]').click();
    cy.get('[data-test="Search-Header"]').should("exist").should("have.text", "Search Results");
    cy.get('[data-test="NoItemsFoundResult"]').should("exist").should("have.text", "No results found for  \"Donut\"");
  })

  it("Search Bar Works From Menu Page", () => {
    cy.visit("/menu")
    cy.get('[data-test="Search-Input"]').type("Salad");
    cy.get('[data-test="Search-Input-Button"]').click();
    cy.get('[data-test="Search-Header"]').should("exist").should("have.text", "Search Results");
    cy.get('[data-test="search-item-label=Herb-Roasted Chicken with Red Potatoes and Garden Salad"]').should("exist");
    cy.get('[data-test="search-item-label=Fresh Caprese Salad"]').should("exist");
    cy.get('[data-test="Search-Input"]').clear();
    cy.get('[data-test="map-item=Soups"]').should("exist");
    cy.get('[data-test="Search-Input"]').type("Burger");
    cy.get('[data-test="Search-Input-Button"]').click();
    cy.get('[data-test="Search-Header"]').should("exist").should("have.text", "Search Results");
    cy.get('[data-test="NoItemsFoundResult"]').should("exist").should("have.text", "No results found for  \"Burger\"");
  })

  it("Search Bar Works From Contact Us Page", () => {
    cy.visit("/contact")
    cy.get('[data-test="Search-Input"]').type("Beverages");
    cy.get('[data-test="Search-Input-Button"]').click();
    cy.get('[data-test="Search-Header"]').should("exist").should("have.text", "Search Results");
    cy.get('[data-test="search-item-label=Spetacular Soda Selections"]').should("exist");
    cy.get('[data-test="search-item-label=Lime-Infused Classic Old Fashioned"]').should("exist");
  })

  it("Search Bar Works From Login In Page", () => {
    cy.visit("/login")
    cy.get('[data-test="Search-Input"]').type("Chicken");
    cy.get('[data-test="Search-Input-Button"]').click();
    cy.get('[data-test="Search-Header"]').should("exist").should("have.text", "Search Results");
    cy.get('[data-test="search-item-label=Classic Chicken Noodle Soup"]').should("exist");
    cy.get('[data-test="search-item-label=Herb-Roasted Chicken with Red Potatoes and Garden Salad"]').should("exist");
  })
  it("Search Bar Works From Registration Page", () => {
    cy.visit("/register");
    cy.get('[data-test="Search-Input"]').type("Fiery");
    cy.get('[data-test="Search-Input-Button"]').click();
    cy.get('[data-test="Search-Header"]').should("exist").should("have.text", "Search Results");
    cy.get('[data-test="search-item-label=Fiery Thai Tom Yum"]').should("exist");
  

  })
})