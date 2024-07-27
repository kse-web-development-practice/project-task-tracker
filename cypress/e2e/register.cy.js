describe('Register Page', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  it('register', () => {
    cy.visit('http://localhost:4000/register')

    cy.get('input[type=""]').type('testUser')
    cy.get('input[data-testid="password-input"]').type('testPassword')
    cy.get('input[data-testid="repeat-password-input"]').type('testPassword')

    cy.get('button').contains('Register').should('be.visible').click()

    cy.intercept('POST', `${Cypress.env('API_BASE_URL')}/user/register`, {
      statusCode: 200,
      body: {
        token: 'mockToken'
      }
    }).as('registerRequest')

    cy.intercept('GET', `${Cypress.env('API_BASE_URL')}/project/list/testUser`, {
      statusCode: 200,
      body: {
        projects: []
      }
    }).as('getProjects')

    cy.contains('Hi, testUser!').should('be.visible')
  })
})
