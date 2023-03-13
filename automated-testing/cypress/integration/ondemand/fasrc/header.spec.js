import { NAVIGATION, loadHomepage } from "../../../support/utils/navigation.js";
import { changeProfile } from "../../../support/utils/profiles.js";

describe('FASRC Dashboard - Header', () => {

  const interactiveApps = Cypress.env('fasrc_dashboard_applications')
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

  it('Should display FASRC logo with homepage link', () => {
    cy.get('nav a.navbar-brand-logo')
      .should($logoElement => {
        expect($logoElement).to.have.length(1)
        expect($logoElement.attr('href')).to.match(new RegExp(NAVIGATION.rootPath))
      })
      .find('img').should($imageElement => {
        expect($imageElement).to.have.length(1)
        expect($imageElement.attr('src')).to.match(/.*fasrc_logo.png$/i)
      })
  })

  it('Should display Clusters navigation item', () => {
    cy.get('nav li[title="Clusters"]').as('navItem')
    cy.get('@navItem').find('> a').invoke('text').should('match', /clusters/i)
    cy.get('@navItem').find('> a').click()
    cy.get('@navItem').find('ul li').as('menu').should('have.length', 1)

    cy.get('@menu').first().should('be.visible')
    cy.get('@menu').first().find('a').should($submenuElement => {
      expect($submenuElement.attr('target')).to.equal('_blank')
    })
  })

  it('Should display Files navigation item with home directory link', () => {
    cy.get('nav li[title="Files"]').as('navItem')
    cy.get('@navItem').find('> a').invoke('text').should('match', /files/i)
    cy.get('@navItem').find('> a').click()
    cy.get('@navItem').find('ul li').as('menu').its('length').should('be.gte', 1)

    cy.get('@menu').first().should('be.visible')
    cy.get('@menu').first().find('a').should($submenuElement => {
      expect($submenuElement.text().trim()).to.match(/home directory/i)
    })
  })

  it('Should display Jobs navigation item', () => {
    cy.get('nav li[title="Jobs"]').as('navItem')
    cy.get('@navItem').find('> a').invoke('text').should('match', /jobs/i)
    cy.get('@navItem').find('> a').click()
    cy.get('@navItem').find('ul li').as('menu').should('have.length', 2)

    cy.get('@menu').eq(0).should('be.visible')
    cy.get('@menu').eq(0).find('a').should($submenuElement => {
      expect($submenuElement.text().trim()).to.match(/active jobs/i)
    })

    cy.get('@menu').eq(1).should('be.visible')
    cy.get('@menu').eq(1).find('a').should($submenuElement => {
      expect($submenuElement.text().trim()).to.match(/job composer/i)
      expect($submenuElement.attr('target')).to.equal('_blank')
    })
  })

  it('Should display Interactive Apps navigation item with restricted apps', () => {
    cy.get('nav li[title="Interactive Apps"]').as('navItem')
    cy.get('@navItem').find('> a').invoke('text').should('match', /interactive apps/i)
    cy.get('@navItem').find('> a').click()
    cy.get('@navItem').find('ul li a').as('menu').should('have.length.gte', interactiveApps.length)

    interactiveApps.forEach( (app) => {
      cy.get('@menu').filter(`a[title="${app.name}"]`).should($appElement => {
        $appElement.is(':visible')
        expect($appElement.text().trim()).to.equal(app.name)
        expect($appElement.attr('href')).to.contain(`/sys/${app.token}`)
      })
    })
  })

  it('Should display Interactive Sessions navigation item', () => {
    cy.get('nav li[title="My Interactive Sessions"]').as('navItem')
    cy.get('@navItem').find('> a').should($navElement => {
      $navElement.is(':visible')
      expect($navElement.text().trim()).to.match(/my interactive sessions/i)
      expect($navElement.attr('href')).to.contain('/batch_connect/sessions')
    })
  })

  it('Should display Help links', () => {
    cy.get('nav li[title="Help"] ul.dropdown-menu').as('helpMenu')
    cy.get('@helpMenu').find('a').should($helpLinks => {
      //SUPPORT TICKET IS FIRST ITEM INSIDE HELP MENU
      expect($helpLinks.first().text().trim()).to.match(/submit support ticket/i)
      expect($helpLinks.first().attr('href')).to.match(/support$/)
    })

    // PROFILE LINKS
    cy.get('@helpMenu').find('li.dropdown-header').should($profileHeaderElement => {
      expect($profileHeaderElement.text().trim()).to.match(/interface/i)
    })
    cy.get('@helpMenu').find('a[title="FASRC"]').should($profileLinkElement => {
      expect($profileLinkElement.text().trim()).to.match(/fasrc/i)
      expect($profileLinkElement.attr('href')).to.match(new RegExp('/settings.*fasrc', 'i'))
    })
    cy.get('@helpMenu').find('a[title="Sid"]').should($profileLinkElement => {
      expect($profileLinkElement.text().trim()).to.match(/sid/i)
      expect($profileLinkElement.attr('href')).to.match(new RegExp('/settings.*sid', 'i'))
    })
  })

})