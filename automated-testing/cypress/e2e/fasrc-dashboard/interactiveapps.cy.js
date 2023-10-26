import { navigateApplication } from "../../support/utils/navigation.js";
import { cleanupSessions, checkSession } from "../../support/utils/sessions_2.0.js";

describe('FASRC Dashboard - Interactive Apps', () => {
  const interactiveApps = cy.sid.ondemandApplications.filter(l => Cypress.env('fasrc_dashboard_applications').includes(l.id))
  const launchApplications = Cypress.env('launch_applications')

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
    cy.wrap(interactiveApps).each( app => {
      cy.task('log', `Checking interactive app menu: ${app.token}`)
      navigateApplication(app.name)
      cy.get('div.system-and-shared-apps-header div.card-header').should($heading => {
        expect($heading.text()).to.match(/interactive apps/i)
      })

      interactiveApps.forEach( app => {
        cy.get('div.list-group a').filter(`a[data-title="${app.name}"]`).should($appElement => {
          $appElement.is(':visible')
          expect($appElement.text().trim()).to.equal(app.name)
          expect($appElement.attr('href')).to.contain(app.token)
        })
      })
    })
  })

  !launchApplications && it(`Should launch interactive application - DISABLED`, () => {})

  launchApplications && interactiveApps.forEach( app => {
    it(`Should launch interactive application: ${app.token} - launchApplications: ${launchApplications}`, () => {
      cleanupSessions()

      navigateApplication(app.name)
      cy.get('div[role="main"] h3').should('contain.text', app.name)

      //LAUNCH APP WITH EMPTY PARAMETERS
      cy.get('form#new_batch_connect_session_context input[type="submit"]').click()
      //CHECK LAUNCHED APP IN SESSIONS PAGE IS RUNNING
      checkSession(app)
      //CLEANUP
      cleanupSessions()
      
    })
  })

})