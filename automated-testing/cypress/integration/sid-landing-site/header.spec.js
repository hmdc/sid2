describe('Sid Landing Site - Header', () => {

  const baseUrl = Cypress.env('landing-page_baseUrl')

  const checkFullNavigation = (elementAlias) => {
    cy.get(elementAlias).should('have.length', 3)

    cy.get(elementAlias).eq(0).find('a').should('have.text', 'Documentation')
    cy.get(elementAlias).eq(1).find('a').should('have.text', 'Support')
    cy.get(elementAlias).eq(2).find('a').should('have.text', 'Connect to')
  }

  it('Should display Sid logo', () => {
    cy.viewport(cy.sid.screen.largeWidth, cy.sid.screen.height)
    cy.visit(baseUrl)
    const logoLink = cy.get('h1 a')
    logoLink.should('have.text', 'Welcome to ')
    logoLink.invoke('attr', 'href').should('eq', '/')
  })

  it('Should display navigation items - large screen', () => {
    cy.viewport(cy.sid.screen.largeWidth, cy.sid.screen.height)
    cy.visit(baseUrl)
    cy.get('ul.nav li').filter(':visible').as('navigation')

    checkFullNavigation('@navigation')
  })

  it('Should display navigation items - medium screen', () => {
    cy.viewport(cy.sid.screen.mediumWidth, cy.sid.screen.height)
    cy.visit(baseUrl)
    const navigation = cy.get('ul.nav li').filter(':visible').as('navigation')

    cy.get('@navigation').should('have.length', 2)

    cy.get('@navigation').eq(0).find('button').invoke('attr', 'data-testid').should('eq', 'btn-hamburger')
    cy.get('@navigation').eq(1).find('a').should('have.text', 'Connect to')

  })

  it('Should display navigation items - small screen', () => {
    cy.viewport(cy.sid.screen.smallWidth, cy.sid.screen.height)
    cy.visit(baseUrl)
    cy.get('ul.nav li').filter(':visible').as('navigation')

    cy.get('@navigation').should('have.length', 1)

    cy.get('@navigation').eq(0).find('button').invoke('attr', 'data-testid').should('eq', 'btn-hamburger')
  })

  it('Should show and hide Hamburger menu', () => {
    cy.viewport(cy.sid.screen.smallWidth, cy.sid.screen.height)
    cy.visit(baseUrl)
    cy.get('ul.nav li').filter(':visible').eq(0).find('button').as('hamburgerButton')

    cy.get('nav.hamburger-menu').should('not.exist');
    //SHOW HAMBURGER MENU
    cy.get('@hamburgerButton').click()
    cy.get('nav.hamburger-menu').should('be.visible')
    cy.get('nav.hamburger-menu li').as('hamburgerMenu')
    checkFullNavigation('@hamburgerMenu')
    //HIDE HAMBURGER MENU
    cy.get('@hamburgerButton').click()
    cy.get('nav.hamburger-menu').should('not.exist');
  })

})