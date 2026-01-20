describe("Delete Todo", () => {
  it("deletes a todo", () => {
    cy.visit("http://localhost:5173");

    cy.get('input[placeholder="New todo"]').type("Delete me");
    cy.contains("Add").click();

    cy.contains("Delete me").parent().find("button").click();

    cy.contains("Delete me").should("not.exist");
  });
});
