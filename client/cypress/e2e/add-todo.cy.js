describe("Todo App", () => {
  it("adds a new todo", () => {
    cy.visit("http://localhost:5173");

    cy.get('input[placeholder="New todo"]').type("Test todo");

    cy.contains("Add").click();

    cy.contains("Test todo").should("exist");
  });
});

it("add-todo", function () {});
