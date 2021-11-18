describe('Sid Landing Site - Homepage', () => {

  beforeEach(() => {
    const baseUrl = Cypress.env('landing-page_baseUrl')
    cy.visit(baseUrl)
  })

  it('Should display Sid header', () => {
    cy.get('header').should('be.visible')
  })

  it('Should display Sid description section', () => {
    cy.get('div.description').should('be.visible')
  })

  it('Should display Sid content section', () => {
    cy.get('div.content').should('be.visible')
  })

  it('Should display Sid footer', () => {
    cy.get('footer').should('be.visible')
  })

})