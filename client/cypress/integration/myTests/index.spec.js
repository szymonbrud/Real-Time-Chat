/// <reference types="cypress" />

const { waitForDebugger } = require('inspector');

const dataTestId = name => `[data-testid=${name}]`;

const messageWrapper = '[data-testid="messageWrapper"]';

const createANewRoom = roomName => {
  cy.contains('Create a new room').click();
  cy.get('input').type(roomName);
  cy.get(dataTestId('acceptButton')).click();
};

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Testing /room', () => {
  after(() => {
    cy.task('clearDatabase');
  });

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  afterEach(() => {
    cy.task('clearDatabase');
  });

  it('Check forwarding to /room', () => {
    cy.url().should('eq', 'http://localhost:3000/room');
  });

  it('Create a new room', () => {
    createANewRoom('It will be my new room');

    cy.get('.room').contains('It will be my new room');
  });

  it('Join to room, and send message by me', () => {
    createANewRoom('It will be my new room');

    cy.contains('It will be my new room').click();
    cy.get(messageWrapper).contains('anonymus, witaj w pokoju:');

    cy.get('input[placeholder="napisz coś..."]').type('Hello I am new here!').type('{enter}');

    cy.get(messageWrapper).contains('Hello I am new here!');
  });

  it('Invade to room, join to room clinet 2, and send message by client 2', () => {
    createANewRoom('hello room');

    cy.contains('hello room').click();

    cy.contains('Invate to room').click();

    cy.get('[data-testid=textToCopy]')
      .invoke('text')
      .should(text2 => {
        if (text2) {
          cy.task('runPupTest1', text2);
        }
      });

    cy.contains('wyjście').click();

    cy.wait(10000);

    cy.get('[data-testid=messageWrapper] > :nth-child(2)').should(
      'contain',
      'anonymus has joined!',
    );
  });
});

//TODO: sprawdzić jaka jest najlepsza struktura dla czyrpess
//TODO: przypomniec sobie najlepsze praktyki pisania testów z tego artykułu
