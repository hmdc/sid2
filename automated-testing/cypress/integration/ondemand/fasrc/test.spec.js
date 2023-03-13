import { NAVIGATION, loadHomepage } from "../../../support/utils/navigation.js";
import { changeProfile } from "../../../support/utils/profiles.js";
import { cleanupSessions, checkSession } from "../../../support/utils/sessions.js";

describe('FASRC Dashboard - Interactive Apps', () => {
  const interactiveApps = Cypress.env('fasrc_dashboard_applications')
  Cypress.config('baseUrl', NAVIGATION.baseUrl);

  const goToApp = app => {
    cy.get('nav li[title="Interactive Apps"] > a').click()
    cy.get(`nav li[title="Interactive Apps"] ul a[title="${app.name}"]`).click()
  }

  before(() => {
    loadHomepage()
    changeProfile('FASRC')
  })

  beforeEach(() => {
    //DEFAULT SIZE FOR THESE TESTS
    cy.viewport(cy.sid.screen.largeWidth, cy.sid.screen.height)
    loadHomepage()
  })

  interactiveApps.forEach( app => {
    it(`Should launch interactive application: ${app.token}`, () => {
      cleanupSessions()

      goToApp(app)
      cy.get('div[role="main"] h3').should('contain.text', app.name)
      //LAUNCH APP WITH EMPTY PARAMETERS
      cy.get('form#new_batch_connect_session_context input[type="submit"]').click()
      //CHECK LAUNCHED APP IN SESSIONS PAGE IS RUNNING
      checkSession(app)

      cy.get('div.markdown form [type="submit"]').click()
      
    })
  })

})