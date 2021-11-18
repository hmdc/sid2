describe('Sid Dashboard - Header', () => {

  const baseUrl = Cypress.env('dashboard_baseUrl')
  const rootPath = Cypress.env('dashboard_rootPath')
  const auth = cy.sid.auth
  const interactiveApps = Cypress.env('dashboard_applications')
  Cypress.config('baseUrl', baseUrl);

  beforeEach(() => {
    //DEFAULT SIZE FOR THESE TESTS
    cy.viewport(cy.sid.screen.largeWidth, cy.sid.screen.height)
    cy.visit(rootPath, { auth })
  })

  it('Should display Sid logo with homepage link', () => {
    cy.get('nav a.navbar-brand-logo')
      .should($logoElement => {
        expect($logoElement).to.have.length(1)
        expect($logoElement.attr('href')).to.match(new RegExp(rootPath))
      })
      .find('img').should($imageElement => {
        expect($imageElement).to.have.length(1)
        expect($imageElement.attr('src')).to.match(/.*sid_logo.*png$/i)
      })
  })

  it('Should display Files navigation item', () => {
    cy.get('nav li[title="Files"]').as('navItem')
    cy.get('@navItem').find('> a').invoke('text').should('match', /files/i)
    cy.get('@navItem').find('> a').click()
    cy.get('@navItem').find('ul li').as('menu').should('have.length', 1)

    cy.get('@menu').first().should('be.visible')
    cy.get('@menu').first().find('a').should($submenuElement => {
      expect($submenuElement.text().trim()).to.match(/home directory/i)
      expect($submenuElement.attr('target')).to.equal('_blank')
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
      expect($submenuElement.attr('target')).to.equal('_blank')
    })

    cy.get('@menu').eq(1).should('be.visible')
    cy.get('@menu').eq(1).find('a').should($submenuElement => {
      expect($submenuElement.text().trim()).to.match(/job composer/i)
      expect($submenuElement.attr('target')).to.equal('_blank')
    })
  })

  it('Should display Terminals navigation item', () => {
    cy.get('nav li[title="Clusters"]').as('navItem')
    cy.get('@navItem').find('> a').invoke('text').should('match', /terminals/i)
    cy.get('@navItem').find('> a').click()
    cy.get('@navItem').find('ul li').as('menu').should('have.length', 1)

    cy.get('@menu').first().should('be.visible')
    cy.get('@menu').first().find('a').should($submenuElement => {
      expect($submenuElement.attr('target')).to.equal('_blank')
    })
  })

  it('Should display Interactive Apps navigation item with restricted apps', () => {
    cy.get('nav li[title="Interactive Apps"]').as('navItem')
    cy.get('@navItem').find('> a').invoke('text').should('match', /interactive apps/i)
    cy.get('@navItem').find('> a').click()
    cy.get('@navItem').find('ul li a').as('menu').should('have.length', interactiveApps.length)

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

  it('Should display Sid Support navigation items', () => {
    cy.get('nav li[title="sid about"]').find('> a').should($aboutElement => {
      expect($aboutElement.text().trim()).to.match(/about/i)
      expect($aboutElement.attr('href')).to.equal('https://www.iq.harvard.edu/research-computing#AboutSidNG')
    })

    cy.get('nav li[title="sid documentation"]').find('> a').should($aboutElement => {
      expect($aboutElement.text().trim()).to.match(/documentation/i)
      expect($aboutElement.attr('href')).to.equal('https://docs.rc.fas.harvard.edu/kb/sid-documentation/')
    })

    cy.get('nav li[title="sid support"]').find('> a').should($aboutElement => {
      expect($aboutElement.text().trim()).to.match(/support/i)
      expect($aboutElement.attr('href')).to.equal('https://docs.rc.fas.harvard.edu/kb/getting-help-with-sid/')
    })
  })

  it('Should display Help > Support Ticket navigation item', () => {
    cy.get('nav li[title="Help"] ul.dropdown-menu li').find('> a').should($helpLinks => {
      //SUPPORT TICKET IS FIRST ITEM INSIDE HELP MENU
      expect($helpLinks.first().text().trim()).to.match(/submit support ticket/i)
      expect($helpLinks.first().attr('href')).to.match(/support$/)
    })
  })

})