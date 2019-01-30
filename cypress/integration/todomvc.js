import faker from 'faker';

function addRandomTodo() {
  cy.get('input.new-todo').type(`${faker.lorem.words()}{Enter}`, {delay: 4});
}

describe('todo mvc', () => {
  beforeEach(() => {
    cy.visit('http://todomvc.com/examples/react/');
    // cy.visit('http://todomvc.com/examples/angularjs/');
  });

  it('Should clear input after submit', () => {
    addRandomTodo();
    cy.get('input.new-todo').should('be.empty');
  });

  it('Should add item', () => {
    addRandomTodo();
    addRandomTodo();
    cy.get('.todo-list li').should('have.length', 2);
  });

  it('Should remove item', () => {
    addRandomTodo();
    cy.get('.destroy').invoke('show').click();
    cy.get('.todo-list li').should('have.length', 0);
  });

  it('Should mark an item as completed', () => {
    addRandomTodo();
    cy.get('input.toggle').click();
    cy.get('.todo-count strong').invoke('text').should('equal', '0');
  });

  it('Filters should work as expected', () => {
    addRandomTodo();
    cy.get('.filters').contains('Completed').click();
    cy.get('.todo-list li').should('have.length', 0);
    cy.get('.filters').contains('Active').click();
    cy.get('.todo-list li').should('have.length', 1);
    cy.get('.filters').contains('All').click();
    cy.get('.todo-list li').should('have.length', 1);
  });

  it('Should handle big lists', () => {
    let count = 20;
    for (let i = 0; i < count; i++) {
      addRandomTodo();
    }
    cy.get('.todo-list li').should('have.length', count);
  })

});
