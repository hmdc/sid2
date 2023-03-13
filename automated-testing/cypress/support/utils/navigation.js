export const NAVIGATION = {
  baseUrl: Cypress.env('dashboard_baseUrl'),
  rootPath: Cypress.env('dashboard_rootPath'),
}
export const navigateToApplication = applicationName => {
  cy.get('nav li[title="Interactive Apps"] > a').click()
  cy.get(`nav li[title="Interactive Apps"] ul a[title="${applicationName}"]`).click()
}

export const loadHomepage = () => {
  const rootPath = Cypress.env('dashboard_rootPath')
  const auth = cy.sid.auth
  const qs = cy.sid.query_params
  cy.visit(rootPath, { auth, qs })
}

export const navigateToSupport = () => {
  cy.get('nav li[title="Help"] > a').click()
  cy.get(`nav li[title="Help"] ul a[title="Submit Support Ticket"]`).click()
}