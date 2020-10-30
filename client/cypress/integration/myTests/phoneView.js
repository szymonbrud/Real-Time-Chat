// TODO: check that room are loaded
// TODO: check that I can write in room
// TODO: check that I can join to new room and write somethink and is it show in the first room

/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('→Testing bottom menu routers', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.viewport(375, 667);
  });

  it('Join to chat page on start', () => {
    cy.url().should('eq', 'http://localhost:3000/messagesChat');
  });

  it('Bottom menu router corrent switch between pages', () => {
    cy.url().should('eq', 'http://localhost:3000/messagesChat');
    cy.contains('call').click();
    cy.url().should('eq', 'http://localhost:3000/voiceChat');
    cy.contains('more').click();
    cy.url().should('eq', 'http://localhost:3000/more');
    cy.contains('chat').click();
    cy.url().should('eq', 'http://localhost:3000/messagesChat');
  });
});
