export const checkSession = app => {
  const longRunningTimeout = cy.sid.timeout
  //CHECK LAUNCHED APP IN SESSIONS PAGE IS RUNNING
  cy.get('div.alert-success').should('contain.text', 'Session was successfully created')
  //CHECK LAUNCHED APP IN SESSIONS PAGE IS RUNNING
  cy.get('div.alert-success').should('contain.text', 'Session was successfully created')
  cy.get('div[data-toggle="poll"].sessions > div').first().as('currentSession').should('be.visible')
  cy.get('div[data-toggle="poll"].sessions > div:first-of-type .card-heading div.float-right', { timeout: longRunningTimeout }).should('contain.text', 'Running')
  cy.get('@currentSession').find('.card-heading a').invoke('text').should('match', new RegExp(cy.sid.regexEscape(app.name), 'i'))
  //GET ALL PANEL ITEMS
  cy.get('@currentSession').find('.card-body p strong').then($sessionPanelInfoTitles => {
    const titlesArray = $sessionPanelInfoTitles.map((index, $item, c) => $item.innerText.toLowerCase()).get()
    //CHECKING SOME OF THE SESSION TITLES
    expect(titlesArray).to.contain('host:')
    expect(titlesArray).to.contain('created at:')
    expect(titlesArray).to.contain('session id:')
  })
}

export const deleteSession = sessionId => {
  cy.log(`Deleting session: ${sessionId}`)
  cy.get(`div[data-toggle="poll"].sessions > div#${sessionId}`).should('be.visible')
  cy.get(`div[data-toggle="poll"].sessions > div#${sessionId}`).find('div a.btn-delete').click()
  cy.get('div.modal-dialog div.modal-body').should('contain.text', 'Are you sure')
  cy.get('div.modal-dialog button.commit').click()
  cy.get('div.alert-success').should('contain.text', 'Session was successfully')
}

export const cleanupSessions = () => {
  cy.get('nav li[title="My Interactive Sessions"] > a').click()
  cy.get('div[data-toggle="poll"].sessions > div').each( $item => {
    if(!$item.attr('data-hash')) {
      //NOT A SESSION PANEL
      return
    }
    const completedSession = $item.find('div.pull-right:contains("Completed")').length != 0
    if(!completedSession) {
      deleteSession($item.attr('id'))
    }
  })
}