import { NAVIGATION, loadHomepage, navigateFiles } from "../../../support/utils/navigation.js";

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
    navigateFiles()

    // SHOULD DISPLAY FAVORITES
    cy.get('ul#favorites a').should($favorites => {
      expect($favorites.first().text().trim()).to.match(/home directory/i)
    })

    // SHOULD DISPLAY BREADCRUMBS
    cy.get('ol#path-breadcrumbs').should('have.length', 1)
  })

})