import { NAVIGATION, loadHomepage, navigateJobComposer } from "../../../support/utils/navigation.js";

describe('FASRC Dashboard - Job Composer', () => {
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

  it('Should display job composer page', () => {
    navigateJobComposer()

    cy.get('div.page-header h2').invoke('text').should('match', new RegExp('jobs', "i"))
    cy.get('button#new_job_button').should($newJobButton => {
      expect($newJobButton).to.have.length(1)
      expect($newJobButton.text().trim()).to.match(/new job/i)
    })
  })

})