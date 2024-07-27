describe('Main Page', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  it('authenticated user', () => {
    cy.intercept('POST', `${Cypress.env('API_BASE_URL')}/user/token`, {
      statusCode: 200,
      body: {
        username: 'testUser'
      }
    }).as('mockLogin')

    cy.intercept('GET', `${Cypress.env('API_BASE_URL')}/project/list/testUser`, {
      statusCode: 200,
      body: {
        projects: [
          {
            _id: 1,
            name: 'Project 1',
            description: 'Description 1',
            status: 'In progress',
            ownerUsername: 'testUser',
            totalTasks: 2,
            completedTasks: 1
          },
          {
            _id: 2,
            name: 'Project 2',
            description: 'Description 2',
            status: 'Completed',
            ownerUsername: 'testUser',
            totalTasks: 3,
            completedTasks: 3
          }
        ]
      }
    }).as('getProjects')

    localStorage.setItem('token', 'mockToken')
    cy.visit('http://localhost:4000/')

    cy.contains('Hi, testUser!').should('be.visible')

    cy.contains('Project 1').should('be.visible')
    cy.contains('Project 2').should('be.visible')

    cy.get('button').contains('Add Project').should('be.visible').click()

    cy.url().should('include', '/create')

    cy.get('button').contains('Logout').should('be.visible').click()

    cy.contains('Hi, Guest!').should('be.visible')
  })

  it('unauthenticated user', () => {
    cy.visit('http://localhost:4000/')

    cy.get('button').contains('Add Project').should('be.visible').click()

    cy.url().should('include', '/login')

    cy.get('button').contains('Log in').should('be.visible').click()

    cy.url().should('include', '/login')

    cy.get('button').contains('Sign up').should('be.visible').click()

    cy.url().should('include', '/register')
  })
})
