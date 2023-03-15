import { NAVIGATION, loadHomepage, navigateSessions } from "../../../support/utils/navigation.js";
import { changeProfile } from "../../../support/utils/profiles.js";

describe('Sid Dashboard - Interactive Sessions', () => {

  const interactiveApps = Cypress.env('sid_dashboard_applications')
  Cypress.config('baseUrl', NAVIGATION.baseUrl);

  before(() => {
    loadHomepage()
    changeProfile('Sid')
  })

  beforeEach(() => {
    //DEFAULT SIZE FOR THESE TESTS
    cy.viewport(cy.sid.screen.largeWidth, cy.sid.screen.height)
  })

  it('Should display restricted interactive apps left menu', () => {
    navigateSessions()
    interactiveApps.forEach( app => {
      cy.get('div.list-group a').filter(`a[data-title="${app.name}"]`).should($appElement => {
        $appElement.is(':visible')
        expect($appElement.text().trim()).to.equal(app.name)
        expect($appElement.attr('href')).to.contain(`/sys/${app.token}`)
      })
    })
  })

})