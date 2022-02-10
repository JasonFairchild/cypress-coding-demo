/// <reference types="cypress" />

describe('Demo form iframe', () => {

  it('Verifies google recaptcha request and simple iframe interaction', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      expect(err.message).to.include('Cannot set properties of null');
      return false;
    })
    /*  
      If I could manage it, I would test the demo form in any
      other way besides the iframe it resides in for prod.
      Preferably with component testing, especially for the
      details. This does at least check that the iframe is
      there with the right fields that are interactable.
    */ 
    cy.intercept('GET', 'https://www.google.com/recaptcha/api.js')
      .as('googleRecaptcha');
    cy.visit('/');
    cy.findByRole('link', { name: 'Get a demo' })
      .click();
    cy.wait('@googleRecaptcha').then((int) => {
      expect(int.response?.statusCode).to.equal(200);
    })
    
    cy.getDemoIframeBody()
      .findByRole('textbox', { name: /First Name/})
      .type('First name');
    cy.getDemoIframeBody()
      .findByRole('textbox', { name: /Last Name/})
      .type('Last name');
    cy.getDemoIframeBody()
      .findByRole('textbox', { name: /Email/})
      .type('Email');
    cy.getDemoIframeBody()
      .findByRole('textbox', { name: /Company/})
      .type('My company');
    cy.getDemoIframeBody()
      .findByRole('combobox', { name: /Organization Type/})
      .select('Fund');
    cy.getDemoIframeBody()
      .findByRole('button', { name: 'Submit'})
      .click();
  })
})