import { NAVIGATION, loadHomepage, navigateActiveJobs, visitApplication } from "../../../support/utils/navigation.js";
import { cleanupSessions, checkSession } from "../../../support/utils/sessions.js";

describe('FASRC Dashboard - Active Jobs', () => {
  const demoApp = cy.sid.ondemandApplications.filter(l => l.id == Cypress.env('fasrcv3_interactive_sessions_app')).shift()
  Cypress.config('baseUrl', NAVIGATION.baseUrl);
  
  before(() => {
    loadHomepage()
  })

  beforeEach(() => {
    //DEFAULT SIZE FOR THESE TESTS
    cy.viewport(cy.sid.screen.largeWidth, cy.sid.screen.height)
    loadHomepage()
  })

  it('Should display active jobs page', () => {
    cleanupSessions()
    visitApplication(demoApp.token)
    //LAUNCH APP WITH EMPTY PARAMETERS
    cy.get('form#new_batch_connect_session_context input[type="submit"]').click()
    checkSession(demoApp, false)
    navigateActiveJobs()
    // THERE ARE JS ERRORS IN THE ACTIVE JOBS PAGE
    Cypress.on('uncaught:exception', () => false)
    cy.wait(2000)

    cy.get('div.row h2').invoke('text').should('match', new RegExp('active jobs', "i"))
    cy.get('div.row table#job_status_table tbody tr').then($jobs => {
      expect($jobs).to.have.length.greaterThan(0)
      const $jobFields = $jobs.last().find("td")
      expect($jobFields).to.have.length(10)
      expect($jobFields.eq(2).text()).to.match(new RegExp(demoApp.token, 'i'))
      expect($jobFields.eq(7).text()).to.match(/running/i)
    })

    cleanupSessions()
  })

})