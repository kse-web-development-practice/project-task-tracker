describe('Task Create Page', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  it('create task', async () => {
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
            totalTasks: 0,
            completedTasks: 0
          }
        ]
      }
    }).as('getProjects')

    localStorage.setItem('token', 'mockToken')
    cy.visit('http://localhost:4000/')

    cy.contains('Hi, testUser!').should('be.visible')

    cy.intercept('GET', `${Cypress.env('API_BASE_URL')}/task/1`, {
      statusCode: 200,
      body: {
        tasks: []
      }
    }).as('getTasks')

    cy.intercept('GET', `${Cypress.env('API_BASE_URL')}/project/1`, {
      statusCode: 200,
      body: {
        project: {
          _id: 1,
          name: 'Project 1',
          description: 'Description 1',
          status: 'In progress',
          ownerUsername: 'testUser',
          totalTasks: 2,
          completedTasks: 1
        }
      }
    }).as('getProject')

    cy.get('td').contains('Project 1').should('be.visible').click()

    cy.get('button').contains('Add Task').should('be.visible').click()

    cy.url().should('include', '/tasks/create')

    cy.get('input[type=""]').type('New Task')
    cy.get('textarea').type('Cool Description')
    cy.get('input[type="date"]').type('2024-08-01')

    cy.intercept('POST', `${Cypress.env('API_BASE_URL')}/task/add`, {
      statusCode: 200,
      body: {
        task: {}
      }
    }).as('getTask')

    cy.intercept('GET', `${Cypress.env('API_BASE_URL')}/task/1`, {
      statusCode: 200,
      body: {
        tasks: [
          {
            _id: '1',
            name: 'New Task',
            deadline: '2024-08-01',
            importance: 'Low',
            isCompleted: false
          }
        ]
      }
    }).as('getTasks')

    cy.get('button').contains('Create').should('be.visible').click()

    cy.contains('New Task').should('be.visible')
  })
})
