describe('Project Create Page', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  it('create project', async () => {
    cy.intercept('POST', `${Cypress.env('API_BASE_URL')}/user/token`, {
      statusCode: 200,
      body: {
        username: 'testUser'
      }
    }).as('mockLogin')

    cy.intercept('GET', `${Cypress.env('API_BASE_URL')}/project/list/testUser`, {
      statusCode: 200,
      body: {
        projects: []
      }
    }).as('getProjects')

    localStorage.setItem('token', 'mockToken')
    cy.visit('http://localhost:4000/')

    cy.contains('Hi, testUser!').should('be.visible')

    cy.get('button').contains('Add Project').should('be.visible').click()

    cy.url().should('include', '/create')

    cy.get('input[type=""]').type('New Project')
    cy.get('textarea').type('Cool Description')

    cy.intercept('POST', `${Cypress.env('API_BASE_URL')}/project/add`, {
      statusCode: 200,
      body: {
        project: {}
      }
    }).as('getProject')

    cy.intercept('GET', `${Cypress.env('API_BASE_URL')}/project/list/testUser`, {
      statusCode: 200,
      body: {
        projects: [
          {
            _id: 1,
            name: 'New Project',
            description: 'Cool Description',
            status: 'Not started',
            ownerUsername: 'testUser',
            totalTasks: 0,
            completedTasks: 0
          }
        ]
      }
    }).as('getProjects')

    cy.get('button').contains('Create').should('be.visible').click()

    cy.contains('New Project').should('be.visible')
  })
})
