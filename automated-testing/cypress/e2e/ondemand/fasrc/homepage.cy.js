import { NAVIGATION, loadHomepage } from "../../../support/utils/navigation.js";
import { changeProfile } from "../../../support/utils/profiles.js";
import { cleanupSessions} from "../../../support/utils/sessions.js";

describe('FASRC Dashboard - Homepage', () => {
  const activePinnedApps = cy.sid.ondemandApplications.filter(l => Cypress.env('fasrc_pinned_apps').includes(l.id))
  const fasrcClusterProfile = Cypress.env('fasrc_cluster_profile')
  Cypress.config('baseUrl', NAVIGATION.baseUrl);

  before(() => {
    loadHomepage()
    changeProfile(fasrcClusterProfile)
  })

  beforeEach(() => {
    //DEFAULT SIZE FOR THESE TESTS
    cy.viewport(cy.sid.screen.largeWidth, cy.sid.screen.height)
    loadHomepage()
    cleanupSessions()
    loadHomepage()
  })

  activePinnedApps.forEach( app => {
    it(`${fasrcClusterProfile}: FASRC Pinned Apps: ${app.id}`, () => {
      // CLICK PINNED APPS
      cy.get(`div[data-toggle="launcher-button"] a:contains(${app.name})`).should('be.visible')
      cy.get(`div[data-toggle="launcher-button"] a:contains(${app.name})`).click()
      // VERIFY APP FORM
      cy.get('div[role="main"] h3').should('contain.text', app.name)

    })
  })

  it(`${fasrcClusterProfile}: Documentation main sections`, () => {
    cy.get('div img[src="/public/rc-logo-text_2017_sm.png"]').first().should('be.visible')
    const welcomeText = Cypress.env('fasrc_welcome_text')
    cy.get('div h1').invoke('text').should('match', new RegExp(welcomeText, "i"))
    cy.get('div h2').eq(0).invoke('text').should('match', /Documentation and Training/)
    cy.get('div h2').eq(1).invoke('text').should('match', /System Status and Planned Downtime/)
  })

})