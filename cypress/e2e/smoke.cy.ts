describe("smoke tests", () => {
  it("allows navigation", () => {
    cy.visit("/");

    cy.findByRole("link", { name: /articles/i }).click();
    cy.findByRole("heading", { name: /articles/i });
    cy.findByRole("link", {
      name: /the importance of abstraction in software development/i,
    }).click();
    cy.findByRole("heading", {
      name: /the importance of abstraction in software development/i,
    });

    cy.findByRole("link", { name: /john gachihi/i }).click();

    cy.findByRole("link", { name: /projects/i }).click();
    cy.findByRole("heading", { name: /projects/i });
    cy.findByRole("link", {
      name: /Kotlin Symbol Processor \(KSP\) Example/i,
    }).click();
    cy.findByRole("heading", {
      name: /Kotlin Symbol Processor \(KSP\) Example/i,
    });

    cy.findByRole("link", { name: /john gachihi/i }).click();

    cy.findByRole("link", { name: /contacts/i }).click();
  });
});
