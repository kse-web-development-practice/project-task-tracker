describe('Tasks Page', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })
  it('edit tasks', async () => {
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
            totalTasks: 1,
            completedTasks: 0
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

    cy.intercept('GET', `${Cypress.env('API_BASE_URL')}/task/1`, {
      statusCode: 200,
      body: {
        tasks: [
          {
            _id: '1',
            name: 'Task 1',
            deadline: '2024-07-05',
            importance: 'Low',
            isCompleted: false
          }
        ]
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

    cy.url().should('include', '/tasks')

    cy.intercept('PUT', `${Cypress.env('API_BASE_URL')}/task/update/1`, {
      statusCode: 200,
      body: {
        task: {
          _id: '1',
          name: 'Task 1',
          deadline: '2024-07-05',
          importance: 'High',
          isCompleted: false
        }
      }
    }).as('updateTask')

    cy.get('select').select('High').should('have.value', 'High')

    cy.intercept('PUT', `${Cypress.env('API_BASE_URL')}/task/update/1`, {
      statusCode: 200,
      body: {
        task: {
          _id: '1',
          name: 'Task 1',
          deadline: '2024-07-05',
          importance: 'High',
          isCompleted: true
        }
      }
    }).as('updateTask')

    cy.get('input[type="checkbox"]').check().should('be.checked')
  })
})
