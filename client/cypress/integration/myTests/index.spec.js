/// <reference types="cypress" />

// const { MongoClient } = require('mongodb');
// import mongoose from 'mongoose';

describe('My first visit site', () => {
  // let connection;
  // let db;

  // beforeEach(async () => {
  //   connection = await MongoClient.connect('mongodb://localhost/realtimechat_tests', {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   });
  //   db = await connection.db('realtimechat_tests');
  // });

  it('My first test', () => {
    cy.visit('http://localhost:3000/');

    // expe(cy.url()).equal('http://localhost:3000/room');
    cy.url().should('eq', 'http://localhost:3000/room');

    // cy.contains('Create a new room').click();
    // cy.get('input').type('It will be my new room');
    // cy.contains('Potwierdź').click();

    // cy.get('.room').click();
    // console.log(cy.get('.room'));
    // cy.get('.room').should('have.value', 'It will be my new room');
    // cy.get('.room').contains('It will be my new room').should('eq', 'It will be my new room');
    // cy.get('.room').contains('It will be my new room');
    cy.task('updateTask').then(e => {
      console.log(e);
    });

    //TODO: jak zrobićusuwanie dancyh po dodaaniu, napisać to w folderze server i tylko użyteć tej funkcji jako helper

    // should('have.value', 'It will be my new room');
    // cy.contains('It will be my new room').should('have.value', 'It will be my new room')

    // cy.type('he');

    //     cy.on('window:alert', () => {
    // cy.get('#prompt').click().then(function () {
    //       expect(this.windowAlert).to.be.calledWith('Wow! I\'m a Scorpio too!')
    //     })
    //     })

    // cy.window().then(win => {
    //   // cy.get(win.alert).type('he');
    //   cy.stub(win, 'prompt').returns('scorpio');
    //   cy.stub(win, 'alert').as('windowAlert');
    // });

    // cy.url().wait('http://localhost:3000/room');
  });

  // afterEach(async () => {
  //   await connection.close();
  //   await db.close();
  // });
});
