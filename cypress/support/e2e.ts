import "@testing-library/cypress/add-commands";
import "./commands";

Cypress.on("uncaught:exception", (err) => {
  if (
    err.message.includes("Minified React error #418") ||
    err.message.includes("Minified React error #423") ||
    err.message.includes("Hydration failed because the initial UI does not match what was rendered on the server") ||
    err.message.includes("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering")
  ) {
    return false;
  }
  // Enable uncaught exception failures for other errors
});