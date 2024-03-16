it("Opens Filter Modal When Button is Clicked",{defaultCommandTimeout:5000}, () => {
  cy.visit("/menu"); // Base URL configured
 // cy.wait(1000);
  cy.get("[data-test='FilterButton']").should("exist").click();  
  cy.get("[data-test='filter-modal-header']").should("exist").should("have.text", "All Filters");     
  cy.get("[data-test='Filter-Modal-Dietary-Needs-Button']").should("exist").should("have.text", "Dietary Needs");
  cy.get("[data-test='Filter-Modal-Type-Button']").should("exist").should("have.text", "Type");
  cy.get("[data-test='Filter-Modal-Sort-Button']").should("exist").should("have.text", "Sort");
  cy.get("[data-test='Filter-Modal-Cancel-Button']").should("exist").should("have.text", "Cancel");
});
 
it("Opens Dietary Needs Modal",{defaultCommandTimeout:5000}, () => {
  cy.visit("/menu"); // Base URL configured
  cy.get("[data-test='DietaryNeeds']").should("exist").click();  
  cy.get("[data-test='Dietary-Needs-Modal-Header']").should("exist").should("have.text", "Dietary Needs");
  cy.get("[data-test='Dietary-Needs-Input-Organic']").should("exist");

  cy.get("[data-test='Dietary-Needs-Input-Low-Carb-Keto']").should("exist");
  cy.get("[data-test='Dietary-Needs-Input-Paleo']").should("exist");

  cy.get("[data-test='Dietary-Needs-Input-Vegetarian']").should("exist");
  cy.get("[data-test='Dietary-Needs-Input-Kosher']").should("exist");

  cy.get("[data-test='Dietary-Needs-Input-Mediterranean']").should("exist");
  cy.get("[data-test='Dietary-Needs-Input-Non-GMO']").should("exist");

  cy.get("[data-test='Dietary-Needs-Modal-Footer-Submit-Button']").should("exist").should("have.text", "Apply");
  cy.get("[data-test='Dietary-Needs-Modal-Footer-Cancel-Button']").should("exist").should("have.text", "Cancel");
});

it("Opens Type Modal",{defaultCommandTimeout:5000}, () => {
  cy.visit("/menu"); // Base URL configured
  cy.get("[data-test='TypeButton']").should("exist").click();
  cy.get("[data-test='Type-Modal-Header']").should("exist").should("have.text", "Type");

  cy.get("[data-test='Type-Modal-Label-Appetizers']").should("exist").should("have.text", "Appetizers");
  cy.get("[data-test='Type-Modal-Input-Appetizers']").should("exist");

  cy.get("[data-test='Type-Modal-Label-Entrées']").should("exist").should("have.text", "Entrées");
  cy.get("[data-test='Type-Modal-Input-Entrées']").should("exist");

  cy.get("[data-test='Type-Modal-Label-Salads']").should("exist").should("have.text", "Salads");
  cy.get("[data-test='Type-Modal-Input-Salads']").should("exist");

  cy.get("[data-test='Type-Modal-Label-Soups']").should("exist").should("have.text", "Soups");
  cy.get("[data-test='Type-Modal-Input-Soups']").should("exist");

  cy.get("[data-test='Type-Modal-Label-Desserts']").should("exist").should("have.text", "Desserts");
  cy.get("[data-test='Type-Modal-Input-Desserts']").should("exist");

  cy.get("[data-test='Type-Modal-Label-Beverages']").should("exist").should("have.text", "Beverages");
  cy.get("[data-test='Type-Modal-Input-Beverages']").should("exist");

  cy.get("[data-test='Type-Modal-Footer-Apply-Button']").should("exist").should("have.text", "Apply");
  cy.get("[data-test='Type-Modal-Footer-Cancel-Button']").should("exist").should("have.text", "Cancel");
});

it("Opens Sort Modal",{defaultCommandTimeout:5000}, () => {
  cy.visit("/menu"); // Base URL configured
  cy.get("[data-test='SortButton']").should("exist").click();
  cy.get("[data-test='Sort-Modal-Header']").should("exist").should("have.text", "Sort");
  cy.get("[data-test='Sort-Modal-Input-PriceLowToHigh']").should("exist");

  cy.get("[data-test='Sort-Modal-Label-PriceLowToHigh']").should("exist").should("have.text", "Price: low to high");
  cy.get("[data-test='Sort-Modal-Input-PriceHighToLow']").should("exist");

  cy.get("[data-test='Sort-Modal-Label-PriceHighToLow']").should("exist").should("have.text", "Price: high to low");
  cy.get("[data-test='Sort-Modal-Input-PriceHighToLow']").should("exist");
  
  cy.get("[data-test='Sort-Modal-Footer-Submit-Button']").should("exist").should("have.text", "Apply");
  cy.get("[data-test='Sort-Modal-Footer-Cancel-Button']").should("exist").should("have.text", "Cancel");
});