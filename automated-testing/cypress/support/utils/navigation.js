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

export const navigateActiveJobs = () => {
  cy.get('nav li[title="Jobs"] > a').click()
  cy.get('nav li[title="Jobs"] ul a[title="Active Jobs"]').click()
}

export const navigateJobComposer = () => {
  cy.get('nav li[title="Jobs"] > a').click()
  cy.get('nav li[title="Jobs"] ul a[title="Job Composer"]').then($jobComponerLink => {
    const url = $jobComponerLink.prop('href')
    const auth = cy.sid.auth
    const qs = cy.sid.query_params
    cy.visit(url, { auth, qs })
  })
}

export const navigateFiles = () => {
  cy.get('nav li[title="Files"] > a').click()
  cy.get('nav li[title="Files"] ul a[title="Home Directory"]').click()
}

export const navigateApplication = appName => {
  cy.get('nav li[title="Interactive Apps"] > a').click()
  cy.get(`nav li[title="Interactive Apps"] ul a[title="${appName}"]`).click()
}

export const visitApplication = appToken => {
  const auth = cy.sid.auth
  const qs = cy.sid.query_params
  cy.visit(`/pun/sys/dashboard/batch_connect/${appToken}/session_contexts/new`, { auth, qs })
}

export const navigateSessions = () => {
  cy.get('nav li[title="My Interactive Sessions"] > a').click()
}

export const navigateToSupport = () => {
  cy.get('nav li[title="Help"] > a').click()
  cy.get('nav li[title="Help"] ul a[title="Submit Support Ticket"]').click()
}