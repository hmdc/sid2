import { cleanupSessions, checkSession } from "../../support/utils/sessions_2.0.js";

describe('FASRC Dashboard - Smoke test', () => {
  const longRunningTimeout = cy.sid.timeout
  const baseUrl = Cypress.env('dashboard_baseUrl')
  const rootPath = "/pun/sys/dashboard"
  const auth = cy.sid.auth
  const navigationItems = Cypress.env('dashboard_fasrc_navigation')
  Cypress.config('baseUrl', baseUrl);

  beforeEach(() => {
    //DEFAULT SIZE FOR THESE TESTS
    cy.viewport(cy.sid.screen.largeWidth, cy.sid.screen.height)
  })

  it('Navigation', () => {
    cy.visit(rootPath, { auth })
    cy.get('nav a.navbar-brand').should($logoElement => {
      expect($logoElement).to.have.length(1)
      expect($logoElement.attr('href')).to.match(new RegExp(rootPath))
    })

    cy.wrap(navigationItems).each(navItem => {
      cy.get(`nav li[title="${navItem}"]`).invoke('text').should('match', new RegExp(navItem, "i"))
    })
  })

  it('Interactive Apps', () => {
    cy.visit(rootPath, { auth })
    cy.get('nav li[title="Interactive Apps"]').as('interactiveAppsMenu').click()
    const interactiveApps = []
    cy.get('@interactiveAppsMenu').find('a[title]').each($interactiveApp => {
      expect($interactiveApp).to.have.length(1)
      $interactiveApp.is(':visible')
      interactiveApps.push({
        title: $interactiveApp.attr('title'),
        href: $interactiveApp.attr('href')
      })
    })
    cy.get('@interactiveAppsMenu').click()

    cy.wrap(interactiveApps).each(appInfo => {
      cy.task('log', `Checking interactive app: ${appInfo.title}`)
      cy.get('@interactiveAppsMenu').click()
      cy.get('@interactiveAppsMenu').find(`a[href="${appInfo.href}"]`).click()
      cy.title().should($title => {
        expect($title).to.contain(appInfo.title)
      })
      cy.get('div h3').should($title => {
        expect($title.text().trim()).to.contain(appInfo.title)
      })
      //BREADCRUMBS
      cy.get('ol.breadcrumb li').eq(0).invoke('text').should('match', /home/i)
      cy.get('ol.breadcrumb li').eq(0).find('a').invoke('attr', 'href').should('match', new RegExp(rootPath, 'i'))
      cy.get('ol.breadcrumb li').eq(1).invoke('text').should('match', /my interactive sessions/i)
      cy.get('ol.breadcrumb li').eq(1).find('a').invoke('attr', 'href').should('match', new RegExp(`${rootPath}/batch_connect/sessions`, 'i'))
      cy.get('ol.breadcrumb li').eq(2).invoke('text').invoke('trim').should('match', new RegExp(cy.sid.regexEscape(appInfo.title), 'i'))
    })

  })

  it('Interactive Sessions', () => {
    cy.visit(`${rootPath}/batch_connect/sessions`, { auth })
    cy.title().should($title => {
      expect($title).to.match(/my interactive sessions/i)
    })
    //BREADCRUMBS
    cy.get('ol.breadcrumb li').eq(0).invoke('text').should('match', /home/i)
    cy.get('ol.breadcrumb li').eq(0).find('a').invoke('attr', 'href').should('match', new RegExp(rootPath, 'i'))
    cy.get('ol.breadcrumb li').eq(1).invoke('text').should('match', /my interactive sessions/i)
  })

  it('Launch Interactive Application', () => {
    cleanupSessions()

    const fasrcApplication = Cypress.env('dashboard_fasrc_application')

    cy.visit(`${rootPath}/batch_connect/sys/${fasrcApplication.token}/session_contexts/new`, { auth })

    cy.get('div[role="main"] h3').should('contain.text', fasrcApplication.name)

    cy.get('form#new_batch_connect_session_context input[type="submit"]').click()
    checkSession(fasrcApplication)  
    cleanupSessions()
  })

})