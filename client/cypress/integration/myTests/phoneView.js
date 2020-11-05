/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('→Testing bottom menu routers', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.viewport(375, 667);
  });

  afterEach(() => {
    cy.task('clearDatabase');
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

  it('Create new room', () => {
    cy.contains('new room').click();
    cy.get('input').type('People');
    cy.contains('Stwórz').click();

    cy.wait(1000);
    cy.contains('People');
  });

  it('Sending and receiving messages', () => {
    cy.contains('new room').click();
    cy.get('input').type('People');
    cy.contains('Stwórz').click();

    cy.contains('People').click();

    cy.get('input').type('My first message').type('{enter}');
    cy.contains('My first message');

    cy.get('[data-testid="invade"]').click();

    cy.contains('Invade by link or qr code');

    cy.get('[data-testid="linkWrapper"]')
      .invoke('text')
      .should(link => {
        cy.task('runPupTest1', link);
      });

    cy.get('[data-testid="backButton"]').click();

    cy.wait(8000);

    cy.contains('Hello from puppeter');
  });
});
