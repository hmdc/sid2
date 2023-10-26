import { navigateSessions, navigateApplication } from "../../support/utils/navigation.js";
import { cleanupSessions, checkSession } from "../../support/utils/sessions_2.0.js";

describe('Sid Dashboard - Interactive Sessions', () => {
  const demoApp = cy.sid.ondemandApplications.filter(l => l.id == Cypress.env('interactive_sessions_app')).shift()
  const interactiveApps = cy.sid.ondemandApplications.filter(l => Cypress.env('fasrc_dashboard_applications').includes(l.id))

  const baseUrl = Cypress.env('dashboard_baseUrl')
  const rootPath = "/pun/sys/dashboard"
  const auth = cy.sid.auth
  Cypress.config('baseUrl', baseUrl);

  beforeEach(() => {
    //DEFAULT SIZE FOR THESE TESTS
    cy.viewport(cy.sid.screen.largeWidth, cy.sid.screen.height)
    cy.visit(rootPath, { auth })
  })

  it('Should display interactive apps left menu', () => {
    navigateSessions()
    interactiveApps.forEach( app => {
      cy.get('div.list-group a').filter(`a[data-title="${app.name}"]`).should($appElement => {
        $appElement.is(':visible')
        expect($appElement.text().trim()).to.equal(app.name)
        expect($appElement.attr('href')).to.contain(app.token)
      })
    })
  })

  it('Should display session panel fields', () => {
    cleanupSessions()
    navigateApplication(demoApp.name)
    cy.get('div[role="main"] h3').should('contain.text', demoApp.name)
    //LAUNCH APP WITH EMPTY PARAMETERS
    cy.get('form#new_batch_connect_session_context input[type="submit"]').click()
    checkSession(demoApp)
    cleanupSessions()
  })

})