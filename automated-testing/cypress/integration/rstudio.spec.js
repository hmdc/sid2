import { NAVIGATION, loadHomepage, navigateSessions } from "../support/utils/navigation.js";

describe('RStudio', () => {
  Cypress.config('baseUrl', NAVIGATION.baseUrl);

  beforeEach(() => {
    const baseUrl = Cypress.env('landing-page_baseUrl')
    loadHomepage()
    navigateSessions()
  })

  it('Should connect to RStudio', () => {
    cy.get('div.session-panel[data-id] div.markdown form').then($form => {
      $form[0].setAttribute('target', '_self')
      cy.get('div.session-panel[data-id] div.markdown button').click()

      cy.get('img[alt="RStudio"]').should('have.length', 1)
    })
  })

  it.only('Should connect to Remote Desktop', () => {

    cy.get('div.session-panel[data-id] div.markdown form input[type="submit"]').then($input => {
      $input[0].setAttribute('formtarget', '_self')
      $input[0].click()
    })
  })

})