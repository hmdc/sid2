import { NAVIGATION, loadHomepage, navigateSessions, visitApplication } from "../../../support/utils/navigation.js";
import { changeProfile } from "../../../support/utils/profiles.js";
import { cleanupSessions, checkSession } from "../../../support/utils/sessions.js";

describe('Sid Dashboard - Interactive Sessions', () => {

  const demoApp = cy.sid.ondemandApplications.filter(l => l.id == Cypress.env('interactive_sessions_app')).shift()
  const interactiveApps = cy.sid.ondemandApplications.filter(l => Cypress.env('fasrc_dashboard_applications').includes(l.id))
  const fasrcClusterProfile = Cypress.env('fasrc_cluster_profile')
  Cypress.config('baseUrl', NAVIGATION.baseUrl);

  before(() => {
    loadHomepage()
    changeProfile(fasrcClusterProfile)
  })

  beforeEach(() => {
    //DEFAULT SIZE FOR THESE TESTS
    cy.viewport(cy.sid.screen.largeWidth, cy.sid.screen.height)
    loadHomepage()
  })

  it(`${fasrcClusterProfile}: Should display restricted interactive apps left menu`, () => {
    navigateSessions()
    interactiveApps.forEach( app => {
      cy.get('div.list-group a').filter(`a[data-title="${app.name}"]`).should($appElement => {
        $appElement.is(':visible')
        expect($appElement.text().trim()).to.equal(app.name)
        expect($appElement.attr('href')).to.contain(app.token)
      })
    })
  })

  it(`${fasrcClusterProfile}: Should display session panel fields`, () => {
    cleanupSessions()

    visitApplication(demoApp.token)
    cy.get('div[role="main"] h3').should('contain.text', demoApp.name)
    //LAUNCH APP WITH EMPTY PARAMETERS
    cy.get('form#new_batch_connect_session_context input[type="submit"]').click()
    checkSession(demoApp, true)
    cleanupSessions()
  })

})