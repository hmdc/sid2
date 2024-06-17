import { NAVIGATION, loadHomepage, navigateFiles } from "../../../support/utils/navigation.js";

describe('FASRC Dashboard - Files Application', () => {
  Cypress.config('baseUrl', NAVIGATION.baseUrl);
  
  before(() => {
    loadHomepage()
  })

  beforeEach(() => {
    //DEFAULT SIZE FOR THESE TESTS
    cy.viewport(cy.sid.screen.largeWidth, cy.sid.screen.height)
    loadHomepage()
  })

  it('Should display files application page', () => {
    navigateFiles()

    // SHOULD DISPLAY FAVORITES
    cy.get('ul#favorites a').should($favorites => {
      expect($favorites.first().text().trim()).to.match(/home directory/i)
    })

    // SHOULD DISPLAY BREADCRUMBS
    cy.get('ol#path-breadcrumbs').should('have.length', 1)
  })

})