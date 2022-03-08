describe('Sid Dashboard - Interactive Sessions', () => {

  const baseUrl = Cypress.env('dashboard_baseUrl')
  const rootPath = Cypress.env('dashboard_rootPath')
  const auth = cy.sid.auth
  const interactiveApps = Cypress.env('dashboard_applications')
  Cypress.config('baseUrl', baseUrl);

  beforeEach(() => {
    //DEFAULT SIZE FOR THESE TESTS
    cy.viewport(cy.sid.screen.largeWidth, cy.sid.screen.height)
  })

  it('Should display restricted interactive apps left menu', () => {
    cy.visit(`${rootPath}/batch_connect/sessions`, { auth })
    interactiveApps.forEach( (app) => {
      cy.get('div.panel-heading ~ div.list-group a').filter(`a[data-title="${app.name}"]`).should($appElement => {
        $appElement.is(':visible')
        expect($appElement.text().trim()).to.equal(app.name)
        expect($appElement.attr('href')).to.contain(`/sys/${app.token}`)
      })
    })
  })

})