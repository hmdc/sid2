import { NAVIGATION, loadHomepage } from "../../../support/utils/navigation.js";
import { changeProfile } from "../../../support/utils/profiles.js";
import { startPinnedApp,  cleanupSessions, checkSession} from "../../../support/utils/sessions.js";

describe('Sid Dashboard - Homepage', () => {

  const activePinnedApps = cy.sid.pinnedApps.filter(l => Cypress.env('sid_pinned_apps').includes(l.id))
  Cypress.config('baseUrl', NAVIGATION.baseUrl);

  before(() => {
    loadHomepage()
    changeProfile('Sid')
  })

  beforeEach(() => {
    //DEFAULT SIZE FOR THESE TESTS
    cy.viewport(cy.sid.screen.largeWidth, cy.sid.screen.height)
    cleanupSessions()
    loadHomepage()
  })

  it('Sid Welcome message', () => {
    cy.get('div.welcome-message h2').should($homepageTitle => {
      const welcomeText = Cypress.env('dashboard_welcome_text')
      expect(cy.sid.normalize($homepageTitle.text())).to.match(new RegExp(welcomeText, 'i'))
    })
  })

  activePinnedApps.forEach( app => {
    it(`Sid Pinned Apps: ${app.id}`, () => {
      startPinnedApp(app)
      checkSession(app)
    })
  })

  const QUICK_LINKS_ASSERTS = {
    terminal: () => {
      cy.get('#link-terminal-button').find('a').should($quickLinkElement => {
        expect($quickLinkElement.attr('href')).to.match(/.pun.sys.shell.ssh./i)
        expect(cy.sid.normalize($quickLinkElement.text())).to.match(/start a web based terminal session/i)
      })
    },
    sessions: () => {
      cy.get('#link-all-sessions-button').find('a').should($quickLinkElement => {
        expect($quickLinkElement.attr('href')).to.match(/.batch_connect.sessions/i)
        expect(cy.sid.normalize($quickLinkElement.text())).to.match(/view all interactive apps/i)
      })
    },
    fasse: () => {
      cy.get('#link-fasse-button').find('a').should($quickLinkElement => {
        expect($quickLinkElement.attr('href')).to.equal('https://fasseood.rc.fas.harvard.edu/')
        expect($quickLinkElement.attr('target')).to.equal('_blank')
        expect(cy.sid.normalize($quickLinkElement.text())).to.match(/medium risk data .* connect to fasse/i)
      })
    },
    cannon: () => {
      cy.get('#link-cannon-button').find('a').should($quickLinkElement => {
        expect($quickLinkElement.attr('href')).to.equal('https://vdi.rc.fas.harvard.edu/')
        expect($quickLinkElement.attr('target')).to.equal('_blank')
        expect(cy.sid.normalize($quickLinkElement.text())).to.match(/low risk data .* connect to cannon/i)
      })
    }
  }

  it('Quick link buttons', () => {
    const quickLinks = Cypress.env('quick_links')
    cy.get('div#quick-links-container').find('div.app-launcher').as('quickLinks')
    cy.get('@quickLinks').should('have.length', quickLinks.length)

    quickLinks.forEach(linkId => {
      QUICK_LINKS_ASSERTS[linkId]()
    })
  })

  it('Documentation main sections', () => {
    cy.get('div.docs-sections-container h3').should($sectionTitles => {
      expect($sectionTitles).to.have.length(4)
      expect($sectionTitles.eq(0).text()).to.match(/getting started/i)
      expect($sectionTitles.eq(1).text()).to.match(/documentation and training/i)
      expect($sectionTitles.eq(2).text()).to.match(/support/i)
      expect($sectionTitles.eq(3).text()).to.match(/system status and planned downtime/i)
    })
  })

})