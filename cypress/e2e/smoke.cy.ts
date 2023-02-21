describe("smoke tests", () => {
  it("allows navigation", () => {
    cy.visit("/");

    // Open articles page
    cy.findByRole("link", { name: /articles/i }).click();
    cy.findByRole("heading", { name: /articles/i });
    // Open an article
    cy.findByRole("link", {
      name: /the importance of abstraction in software development/i,
    }).click();
    cy.findByRole("heading", {
      name: /the importance of abstraction in software development/i,
    });

    // Go back to home page
    cy.findByRole("link", { name: /john gachihi/i }).click();

    // Open projects page
    cy.findByRole("link", { name: /projects/i }).click();
    cy.findByRole("heading", { name: /projects/i });
    // Open a project
    cy.findByRole("link", {
      name: /Kotlin Symbol Processor \(KSP\) Example/i,
    }).click();
    cy.findByRole("heading", {
      name: /Kotlin Symbol Processor \(KSP\) Example/i,
    });

    // Go back to home page
    cy.findByRole("link", { name: /john gachihi/i }).click();

    // Open contacts page
    cy.findByRole("link", { name: /contacts/i }).click();
    cy.findByRole("link", { name: /linkedin/i });

    // Open articles page using navbar link
    cy.findByRole("navigation").within(() =>
      cy.findByRole("link", { name: /articles/i }).click()
    );
    cy.findByRole("heading", { name: /articles/i });

    // Open projects page using navbar link
    cy.findByRole("navigation").within(() =>
      cy.findByRole("link", { name: /projects/i }).click()
    );
    cy.findByRole("heading", { name: /projects/i });

    // Open contacts page using navbar link
    cy.findByRole("navigation").within(() =>
      cy.findByRole("link", { name: /contacts/i }).click()
    );
    cy.findByRole("link", { name: /linkedin/i });
  });
});
