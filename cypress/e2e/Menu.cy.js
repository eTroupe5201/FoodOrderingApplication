describe("Base Menu",{defaultCommandTimeout:5000}, () => {
  
    it("Contains correct header text", () => {
      cy.visit("/menu") //base url configured
      cy.get("[data-test='map-item=Soups']").should("exist").should("have.text", "Soups")
      cy.get("[data-test='map-item=Entrées']").should("exist").should("have.text", "Entrées")
      cy.get("[data-test='map-item=Appetizers']").should("exist").should("have.text", "Appetizers") 
      cy.get("[data-test='map-item=Salads']").should("exist").should("have.text", "Salads")
      cy.get("[data-test='map-item=Desserts']").should("exist").should("have.text", "Desserts")
      cy.get("[data-test='map-item=Beverages']").should("exist").should("have.text", "Beverages")
  
      })
      // it("Navigates to item page when clicked",{defaultCommandTimeout:5000}, () => {
      //   cy.visit("/menu"); // Base URL configured
      //   cy.get("[data-test='item-label=Harvest Delight Pumpkin Soup']").should("exist");
      //   cy.get("[data-test='items-link=4uKzrPoxZ3RgHZJ1U1tb'] > .css-amprl4").click();
      //   cy.url().should('include', '/item/4uKzrPoxZ3RgHZJ1U1tb');
        
      // }); 

     
  })//run npx cy open to open the cypress browser
  
  
