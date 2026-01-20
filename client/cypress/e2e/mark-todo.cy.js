it("marks a todo as completed", () => {
  cy.visit("http://localhost:5173");

  cy.get('input[placeholder="New todo"]').type("Complete me");
  cy.contains("Add").click();

  cy.contains("Complete me").click();

  cy.contains("Complete me")
    .parent()
    .find('input[type="checkbox"]')
    .check()
    .should("be.checked");
});
