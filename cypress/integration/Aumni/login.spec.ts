/// <reference types="cypress" />

describe('Authentication', () => {
  /*  
    These tests are longer form, more like user flows.
    I like to use these to save time if it will 
    not lead to flakiness. This is about as long as
    I like  to make them and I always prefer to test
    things such as field validation with component 
    testing so the E2E flows can be much simpler.
  */ 
  it('Verifies login field validation messages', () => {
    // Navigate to login and trigger empty field validation
    cy.visit('/');
    cy.findByRole('link', { name: 'Login' })
      .click();
    cy.findByRole('button', { name: 'Login' })
      .click();
    cy.findByRole('button', { name: 'Log In' })
      .click();
    cy.findByText(`Email can't be blank`);
    cy.findByText(`Password can't be blank`);

    // Verify invalid email message
    cy.findByRole('textbox', { name: 'Email' })
      .type('a');
    cy.findByRole('button', { name: 'Log In' })
      .click();
    cy.findByText(`Email is invalid`);

    // Verify wrong credentials message
    cy.findByPlaceholderText('yours@example.com')
      .clear()
      .type('c@c.com');
    cy.findByPlaceholderText('your password')
      .type('wrong pw');
    cy.findByRole('button', { name: 'Log In' })
      .click();
    cy.findByText(`Wrong email or password.`);
    // When I submit with this fake email enough times, it gets blocked with message
    // YOUR ACCOUNT HAS BEEN BLOCKED AFTER MULTIPLE CONSECUTIVE LOGIN ATTEMPTS.
    // I just change the email in the test. Obviously not a great test for prod
  })

  it('Verifies forgot password messages', () => {
    // Navigate to forgot password and test blank email validation
    cy.visit('https://app.aumni.fund/login');
    cy.findByRole('button', { name: 'Login' })
      .click();
    cy.findByRole('link', { name: `Don't remember your password?` })
      .click();
    cy.findByRole('button', { name: 'Send email' })
      .click();
    cy.findByText(`Email can't be blank`);

    // Use back button
    cy.findByRole('button', { name: 'back' })
      .click();
    cy.findByText(`Don't remember your password?`)
      .should('be.visible');
    
    // Verify email carries over to forgot password and explanation text
    cy.findByRole('textbox', { name: 'Email' })
      .type('a@a.com');
    cy.findByRole('link', { name: `Don't remember your password?` })
      .click();
    cy.findByText(`Please enter your email address. We will send you an email to reset your password.`)
      .should('be.visible');
    cy.findByRole('textbox', { name: 'Email' })
      .should('have.value', 'a@a.com');
    
    // Verify sent reset email message
    cy.findByRole('button', { name: 'Send email' })
      .click();
    cy.findByText(`We've just sent you an email to reset your password.`)
      .should('be.visible');
  })
})