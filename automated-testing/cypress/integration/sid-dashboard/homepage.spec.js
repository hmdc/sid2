describe('Sid Dashboard - Homepage', () => {
  const longRunningTimeout = cy.sid.timeout
  const baseUrl = Cypress.env('dashboard_baseUrl')
  const rootPath = Cypress.env('dashboard_rootPath')
  const auth = cy.sid.auth
  const quickLaunchButtons = Cypress.env('dashboard_applications')
  Cypress.config('baseUrl', baseUrl);
  
  const deleteSession = sessionId => {
    cy.log(`Deleting session: ${sessionId}`)
    cy.get(`div#sessions-container > div#${sessionId}`).should('be.visible')
    cy.get(`div#sessions-container > div#${sessionId}`).find('div a.btn-delete').click()
    cy.get('div.modal-dialog div.modal-body').should('have.text', 'Are you sure?')
    cy.get('div.modal-dialog button.commit').click()
    cy.get('div.alert-success').should('contain.text', 'Session was successfully deleted')
  }

  const cleanupSessions = () => {
    cy.get('div#sessions-container').then($sessionsContainer => {
      const numberOfSessions = $sessionsContainer.children().length
      if (numberOfSessions == 0){
        return
      }

      cy.log(`sessions to delete: ${numberOfSessions}`)
      const sessionId = $sessionsContainer.children().first().attr('id')
      deleteSession(sessionId)

      cleanupSessions()
    })
  }

  beforeEach(() => {
    //DEFAULT SIZE FOR THESE TESTS
    cy.viewport(cy.sid.screen.largeWidth, cy.sid.screen.height)
    cy.visit(rootPath, { auth })
  })

  quickLaunchButtons.forEach( app => {
    it(`Quick launch button: ${app.id}`, () => {
      cleanupSessions()
      let currentSessionData = { sessionId: null }
  
      //INTERCEPT REQUEST TO CREATE SESSION TO GRAB SESSION ID
      cy.intercept('POST', '**/ws/sessions', (req) => {
        req.continue(res => {
          expect(res.statusCode).to.equal(200)
          currentSessionData.sessionId = res.body.id
        })
      }).as('postSession')
  
      //LAUNCH SESSION
      cy.get(`div#${app.id.toLowerCase()}`).should('be.visible')
      cy.get(`div#${app.id.toLowerCase()}`).click()
      cy.wait('@postSession')
      cy.wrap(currentSessionData).then(session => {
        cy.get(`div#${session.sessionId}`).as('currentSession').should('be.visible')
        //WAIT UNTIL RUNNING
        cy.get(`div#${session.sessionId} .panel-title > .pull-right`, { timeout: longRunningTimeout }).should('contain.text', 'Running')
        cy.get(`div#${session.sessionId} .panel-title a`).invoke('text').should('match', new RegExp(app.name, 'i'))
        //GET ALL PANEL ITEMS
        cy.get(`div#${session.sessionId} .panel-body p strong`).then($sessionPanelInfoTitles => {
          const titlesArray = $sessionPanelInfoTitles.map((index, $item, c) => $item.innerText.toLowerCase()).get()
          //CHECKING SOME OF THE SESSION TITLES
          expect(titlesArray).to.contain('host:')
          expect(titlesArray).to.contain('basic parameters:')
          expect(titlesArray).to.contain('problems with this session?')
        })
  
        //CLEANUP
        deleteSession(session.sessionId)
      })
    })
  })

  it('Quick link buttons', () => {
    cy.get('div.launch-button-container-flex').eq(1).find('div.launch-button-container').as('quickLinks')
    cy.get('@quickLinks').should('have.length', 3)

    //LAUNCH TERMINAL LINK
    cy.get('@quickLinks').eq(0).find('a').should($quickLinkElement => {
      expect($quickLinkElement.attr('href')).to.match(/.pun.sys.shell.ssh./i)
      expect(cy.sid.normalize($quickLinkElement.text())).to.match(/start a web based terminal session/i)
    })

    //INTERACTIVE SESSIONS LINK
    cy.get('@quickLinks').eq(1).find('a').should($quickLinkElement => {
      expect($quickLinkElement.attr('href')).to.match(/.batch_connect.sessions/i)
      expect(cy.sid.normalize($quickLinkElement.text())).to.match(/view all interactive apps/i)
    })

    //CONNECT TO FASSE LINK
    cy.get('@quickLinks').eq(2).find('a').should($quickLinkElement => {
      expect($quickLinkElement.attr('href')).to.equal('https://fasseood.rc.fas.harvard.edu/')
      expect($quickLinkElement.attr('target')).to.equal('_blank')
      expect(cy.sid.normalize($quickLinkElement.text())).to.match(/medium risk data .* connect to fasse/i)
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