describe('Sid Dashboard - Interactive Apps', () => {
  const longRunningTimeout = cy.sid.timeout
  const baseUrl = Cypress.env('dashboard_baseUrl')
  const rootPath = Cypress.env('dashboard_rootPath')
  const auth = cy.sid.auth
  const interactiveApps = Cypress.env('dashboard_applications')
  Cypress.config('baseUrl', baseUrl);

  const cancelSession = sessionId => {
    cy.task('log', `Deleting session: ${sessionId}`)
    cy.get(`div[data-toggle="poll"].sessions > div#${sessionId}`).should('be.visible')
    cy.get(`div[data-toggle="poll"].sessions > div#${sessionId}`).find('div a.btn-terminate').click()
    cy.get('div.modal-dialog div.modal-body').should('contain.text', 'Are you sure')
    cy.get('div.modal-dialog button.commit').click()
    cy.get('div.alert-success').should('contain.text', 'Session was successfully')
  }

  const cleanupSessions = () => {
    cy.visit(`${rootPath}/batch_connect/sessions`, { auth })
    cy.get('div[data-toggle="poll"].sessions > div').each( $item => {
      if(!$item.attr('data-hash')) {
        //NOT A SESSION PANEL
        return
      }
      const completedSession = $item.find('div.pull-right:contains("Completed")').length != 0
      if(!completedSession) {
        cancelSession($item.attr('id'))
      }
    })
  }

  beforeEach(() => {
    //DEFAULT SIZE FOR THESE TESTS
    cy.viewport(cy.sid.screen.largeWidth, cy.sid.screen.height)
  })

  it('Should display restricted interactive apps left menu', () => {
    cy.wrap(interactiveApps).each( app => {
      cy.task('log', `Checking interactive app menu: ${app.token}`)
      cy.visit(`${rootPath}/batch_connect/sys/${app.token}/session_contexts/new`, { auth })
      cy.get('div.panel-heading').should($heading => {
        expect($heading.text()).to.match(/interactive apps/i)
      })

      interactiveApps.forEach( app => {
        cy.get('div.panel-heading ~ div.list-group a').filter(`a[data-title="${app.name}"]`).should($appElement => {
          $appElement.is(':visible')
          expect($appElement.text().trim()).to.equal(app.name)
          expect($appElement.attr('href')).to.contain(`/sys/${app.token}`)
        })
      })
    })
  })

  interactiveApps.forEach( app => {
    it(`Should launch interactive application: ${app.token}`, () => {
      cleanupSessions()

      cy.visit(`${rootPath}/batch_connect/sys/${app.token}/session_contexts/new`, { auth })

      cy.get('div[role="main"] h3').should('contain.text', app.name)

      cy.get('form#new_batch_connect_session_context input[type="submit"]').click()
      //CHECK LAUNCHED APP IN SESSIONS PAGE IS RUNNING
      cy.get('div.alert-success').should('contain.text', 'Session was successfully created')
      cy.get('div[data-toggle="poll"].sessions > div').first().as('currentSession').should('be.visible')
      cy.get('div[data-toggle="poll"].sessions > div:first-of-type .panel-title > .pull-right', { timeout: longRunningTimeout }).should('contain.text', 'Running')
      cy.get('@currentSession').find('.panel-title a').invoke('text').should('match', new RegExp(cy.sid.regexEscape(app.name), 'i'))
      //GET ALL PANEL ITEMS
      cy.get('@currentSession').find('.panel-body p strong').then($sessionPanelInfoTitles => {
        const titlesArray = $sessionPanelInfoTitles.map((index, $item, c) => $item.innerText.toLowerCase()).get()
        //CHECKING SOME OF THE SESSION TITLES
        expect(titlesArray).to.contain('host:')
        expect(titlesArray).to.contain('basic parameters:')
        expect(titlesArray).to.contain('problems with this session?')
      })
      //CANCEL SESSION
      cy.get('div[data-toggle="poll"].sessions > div').first().then(sessionElement => {
        cancelSession(sessionElement.attr('id'))
      })
    })
  })

})