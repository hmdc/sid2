export const startPinnedApp = app => {
  const longRunningTimeout = cy.sid.timeout
  cy.get('nav > a.navbar-brand').click()
  //LAUNCH SESSION
  cy.get(`div[data-toggle="launcher-button"] a[href="${app.url}"]`).should('be.visible')
  cy.get(`div[data-toggle="launcher-button"] a[href="${app.url}"]`).click()

  cy.get('div.alert-success').should('contain.text', 'Session was successfully')
  cy.get('div.alert-success button').click()

  cy.get('div.session-panel[data-id]', { timeout: longRunningTimeout }).should('be.visible')
  cy.get('div.session-panel[data-id]').should('have.length', 1)
  //WAIT UNTIL RUNNING
  cy.get('div.session-panel[data-id] div.card-heading div.float-right', { timeout: longRunningTimeout }).should('contain.text', 'Running')
  cy.get('div.session-panel[data-id] div.card-heading a').invoke('text').should('match', new RegExp(app.name, 'i'))
}

export const startInteractiveApplication = ({position = 0, name} = {}) => {
  const longRunningTimeout = cy.sid.timeout
  cy.get('nav li[title="Interactive Apps"] > a').click()
  const linkAttribute = name ? `title="${name}"`: 'title'
  cy.get(`nav li[title="Interactive Apps"] ul a[${linkAttribute}]`).eq(position).click().then($appLink =>{
    cy.get('form#new_batch_connect_session_context input[type="submit"]').click()
    cy.get('div.session-panel[data-id] div.card-heading div.float-right', { timeout: longRunningTimeout }).should('contain.text', 'Running')
  })
}

export const checkSession = app => {
  //THERE SHOULD BE ONLY CURRENT SESSION RUNNING
  // CALL cleanupSessions BEFORE STARTING THE CURRENT ONE
  const longRunningTimeout = cy.sid.timeout

  cy.get('div.session-panel[data-id]', { timeout: longRunningTimeout }).should('be.visible')
  cy.get('div.session-panel[data-id]').should('have.length', 1)
  //WAIT UNTIL RUNNING
  cy.get('div.session-panel[data-id] div.card-heading div.float-right', { timeout: longRunningTimeout }).should('contain.text', 'Running')
  cy.get('div.session-panel[data-id] div.card-heading a').invoke('text').should('match', new RegExp(app.name, 'i'))

  //GET ALL PANEL ITEMS
  cy.get('div.session-panel[data-id]').find('.card-body p strong').then($sessionPanelInfoTitles => {
    const titlesArray = $sessionPanelInfoTitles.map((index, $item, c) => $item.innerText.toLowerCase()).get()
    //CHECKING SOME OF THE SESSION TITLES
    expect(titlesArray).to.contain('host:')
    expect(titlesArray).to.contain('created at:')
    expect(titlesArray).to.contain('time remaining:')
    expect(titlesArray).to.contain('session id:')
    expect(titlesArray).to.contain('problems with this session?')
  })
}

export const deleteSession = sessionId => {
  cy.on('window:confirm',function(confirmationText){
    expect(confirmationText).to.contain('Are you sure')
  })
  cy.log(`Deleting session: ${sessionId}`)
  cy.get(`div#batch_connect_sessions div[data-id="${sessionId}"]`).should('be.visible')
  cy.get(`div#batch_connect_sessions div[data-id="${sessionId}"]`).then($session => {
    if ($session.find('div button.btn-cancel').length > 0) {
      $session.find('div button.btn-cancel').click()
      cy.get('div.alert-success').should('contain.text', 'Session was successfully')
      cy.get('div.alert-success button').click()
    }

    cy.get(`div#batch_connect_sessions div[data-id="${sessionId}"]`).should('be.visible')
    cy.get(`div#batch_connect_sessions div[data-id="${sessionId}"]`).find('div button.btn-delete').click()
    //PARTIAL TEXT CHECK => BETTER RESILIENCE
    cy.get('div.alert-success').should('contain.text', 'Session was successfully')
    cy.get('div.alert-success button').click()
  })
}

export const cleanupSessions = () => {
  cy.get('nav li[title="My Interactive Sessions"] > a').click()
  cy.get("body").then($body => {
    const $sessions = $body.find("div#batch_connect_sessions div.session-panel")
    if ($sessions.length == 0){
      return
    }

    cy.log(`sessions to cancel: ${$sessions.length}`)
    const sessionId = $sessions.first().attr('data-id')
    deleteSession(sessionId)

    cleanupSessions()
  })
}