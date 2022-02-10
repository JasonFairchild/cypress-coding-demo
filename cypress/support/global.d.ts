/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
       * Yields Body of Demo Iframe
       *
       * @memberof Chainable
       * @example
       *    cy.foo().find('element')
       */
     getDemoIframeBody(): Chainable<void>;
  }
}