describe('Login Page', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  it('log in', () => {
    cy.visit('http://localhost:4000/login')

    cy.get('input[type=""]').type('testUser')
    cy.get('input[type="password"]').type('testPassword')

    cy.get('button').contains('Login').should('be.visible').click()

    cy.intercept('POST', `${Cypress.env('API_BASE_URL')}/user/login`, {
      statusCode: 200,
      body: {
        token: 'mockToken'
      }
    }).as('loginRequest')

    cy.intercept('GET', `${Cypress.env('API_BASE_URL')}/project/list/testUser`, {
      statusCode: 200,
      body: {
        projects: []
      }
    }).as('getProjects')

    cy.contains('Hi, testUser!').should('be.visible')
  })
})
