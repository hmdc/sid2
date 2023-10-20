import { NAVIGATION, loadHomepage, navigateSessions } from "../../../support/utils/navigation.js";
import { changeProfile } from "../../../support/utils/profiles.js";
import { cleanupSessions, startDevSession, checkSession } from "../../../support/utils/sessions.js";

describe('Sid Dashboard - Interactive Sessions', () => {

  const devApp = cy.sid.ondemandApplications.filter(l => l.id == 'dev-app')
  const interactiveApps = cy.sid.ondemandApplications.filter(l => Cypress.env('fasrc_dashboard_applications').includes(l.id))
  Cypress.config('baseUrl', NAVIGATION.baseUrl);

  before(() => {
    loadHomepage()
    changeProfile('FASRC')
  })

  beforeEach(() => {
    //DEFAULT SIZE FOR THESE TESTS
    cy.viewport(cy.sid.screen.largeWidth, cy.sid.screen.height)
    loadHomepage()
  })

  it('Should display restricted interactive apps left menu', () => {
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
    startDevSession()
    checkSession(devApp)
  })

})