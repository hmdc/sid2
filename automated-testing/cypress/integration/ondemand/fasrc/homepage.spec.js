import { NAVIGATION, loadHomepage } from "../../../support/utils/navigation.js";
import { changeProfile } from "../../../support/utils/profiles.js";
import { cleanupSessions} from "../../../support/utils/sessions.js";

describe('FASRC Dashboard - Homepage', () => {
  const activePinnedApps = cy.sid.pinnedApps.filter(l => Cypress.env('fasrc_pinned_apps').includes(l.id))
  Cypress.config('baseUrl', NAVIGATION.baseUrl);

  before(() => {
    loadHomepage()
    changeProfile('FASRC')
  })

  beforeEach(() => {
    //DEFAULT SIZE FOR THESE TESTS
    cy.viewport(cy.sid.screen.largeWidth, cy.sid.screen.height)
    cleanupSessions()
    loadHomepage()
  })

  activePinnedApps.forEach( app => {
    it(`FASRC Pinned Apps: ${app.id}`, () => {
      // CLICK PINNED APPS
      cy.get(`div[data-toggle="launcher-button"] a[href="${app.url}"]`).should('be.visible')
      cy.get(`div[data-toggle="launcher-button"] a[href="${app.url}"]`).click()
      // VERIFY APP FORM
      cy.get('div[role="main"] h3').should('contain.text', app.name)

    })
  })

  it('Documentation main sections', () => {
    cy.get('div img[alt="fas-rc"]').should($imageElement => {
      expect($imageElement).to.have.length(1)
      expect($imageElement.attr('src')).to.match(/.*rc-logo-text_2017.png$/i)
    })
    cy.get('div h1').invoke('text').should('match', /Welcome to FAS-RC Cluster/)
    cy.get('div h2').eq(0).invoke('text').should('match', /Documentation and Training/)
    cy.get('div h2').eq(1).invoke('text').should('match', /System Status and Planned Downtime/)
  })

})