

describe('Blog App', function(){
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user  = {
      username: 'testUser',
      name: 'Test User',
      password: 'userPassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in').click()
    cy.get('#login-form')
      .should('contain', 'username')
      .should('contain', 'password')
  })

  describe('Login', function(){
    it('succeeds with correct credentials', function(){
      cy.login({ username: 'testUser', password: 'userPassword' })
      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function(){
      cy.contains('log in').click()
      cy.get('#usernameInput').type('username')
      cy.get('#passwordInput').type('password')
      cy.get('#submitLogin').click()

      cy.get('.error').should('contain', 'wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain','Test User logged in')
    })
  })

  describe('When logged in', function(){
    beforeEach(function(){
      cy.login({ username: 'testUser', password: 'userPassword' })
    })

    it('a blog can be created', function(){
      cy.contains('create new blog').click()
      cy.get('#name').type('Test Blog Title')
      cy.get('#author').type('Test Blog Author')
      cy.get('#url').type('www.example.com')
      cy.get('#blogSubmit').click()

      cy.get('.success').should('contain', 'a new blog Test Blog Title by Test Blog Author added')
      cy.get('.success').should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('#bloglist').should('contain', 'Test Blog Title')
    })

    describe('and several blogs exist', function(){
      beforeEach(function(){
        cy.createBlog({ title:'Blog 2', author: 'Blog Author 2', url: 'www.example.com/2' })
        cy.createBlog({ title:'Blog 3', author: 'Blog Author 3', url: 'www.example.com/3' })
        cy.createBlog({ title:'Blog 4', author: 'Blog Author 4', url: 'www.example.com/4' })
      })

      it('one of them can be liked', function(){
        cy.contains('Blog 3')
          .parent()
          .contains('view')
          .click()

        cy.contains('www.example.com/3')
          .parent()
          .as('info')
          .find('button')
          .contains('like')
          .click()

        cy.get('@info')
          .contains('likes 1')
      })
    })

  })
})