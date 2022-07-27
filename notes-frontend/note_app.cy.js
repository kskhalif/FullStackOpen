describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function() {
    cy.contains('Notes');
    cy.contains('Note app, by Kacem Khalife');
  });

  it('login form can be opened', function() {
    cy.contains('existing user').click();
  });

  it('user can login', function() {
    cy.contains('existing user').click();
    cy.get('#Username').type('user1');
    cy.get('#Password').type('P@ssword1');
    cy.get('#login-button').click();
    cy.contains('Welcome, Person One');
  });

  it('login fails with wrong password', function() {
    cy.contains('existing user').click();
    cy.get('#Username').type('user1');
    cy.get('#Password').type('wrong');
    cy.get('#login-button').click();
    cy.contains('incorrect password');
  });

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'user1', password: 'P@ssword1' });
    });

    it('a new note can be created', function() {
      cy.get('#new-note-input').type('a note created by cypress');
      cy.get('#new-note-button').click();
      cy.contains('a note created by cypress');
    });

    it('a user can change the importance of a note they added', function() {
      cy.createNote({ content: 'another note by cypress'});
      cy.contains('another note by cypress')
        .contains('mark important')
        .click();

      cy.contains('another note by cypress')
        .contains('mark not important');
    });
  });
});
