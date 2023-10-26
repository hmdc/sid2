import { cleanupSessions } from "../../support/utils/sessions_2.0.js";

describe('FASRC Dashboard - Homepage', () => {
  const activePinnedApps = cy.sid.ondemandApplications.filter(l => Cypress.env('fasrc_pinned_apps').includes(l.id))
  const baseUrl = Cypress.env('dashboard_baseUrl')
  const rootPath = "/pun/sys/dashboard"
  const auth = cy.sid.auth
  Cypress.config('baseUrl', baseUrl);

  beforeEach(() => {
    //DEFAULT SIZE FOR THESE TESTS
    cy.viewport(cy.sid.screen.largeWidth, cy.sid.screen.height)
    cy.visit(rootPath, { auth })
    cleanupSessions()
    cy.visit(rootPath, { auth })
  })

  activePinnedApps.forEach( app => {
    it(`FASRC Pinned Apps: ${app.id}`, () => {
      // CLICK PINNED APPS
      cy.get(`a.app-card div.center-block:contains(${app.name})`).should('be.visible')
      cy.get(`a.app-card div.center-block:contains(${app.name})`).click()
      // VERIFY APP FORM
      cy.get('div[role="main"] h3').should('contain.text', app.name)

    })
  })

  it('Documentation main sections', () => {
    cy.get('div img[src="/public/rc-logo-text_2017_sm.png"]').should($imageElement => {
      expect($imageElement).to.have.length(1)
      expect($imageElement.attr('alt')).to.match(/harvard university/i)
    })

    cy.get('div h1').invoke('text').should('match', new RegExp(Cypress.env('fasrc_welcome_text'), "i"))
    cy.get('div h2').eq(0).invoke('text').should('match', /Documentation and Training/)
    cy.get('div h2').eq(1).invoke('text').should('match', /System Status and Planned Downtime/)
  })

})