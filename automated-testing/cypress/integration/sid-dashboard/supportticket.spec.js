describe('Sid Dashboard - Support Ticket', () => {

  const baseUrl = Cypress.env('dashboard_baseUrl')
  const rootPath = Cypress.env('dashboard_rootPath')
  const supportTicket = Cypress.env('support_ticket') || cy.sid.supportTicket
  const auth = cy.sid.auth
  Cypress.config('baseUrl', baseUrl);

  beforeEach(() => {
    //DEFAULT SIZE FOR THESE TESTS
    cy.viewport(cy.sid.screen.largeWidth, cy.sid.screen.height)
  })

  it('Should display support ticket page', () => {
    cy.visit(`${rootPath}/support`, { auth })
    //BREADCRUMBS
    cy.get('ol.breadcrumb li').eq(0).invoke('text').should('match', /home/i)
    cy.get('ol.breadcrumb li').eq(0).find('a').invoke('attr', 'href').should('match', new RegExp(rootPath, 'i'))
    cy.get('ol.breadcrumb li').eq(1).invoke('text').should('match', /submit support ticket/i)
    //TITLE
    cy.get('div.support-ticket-content-container h2').invoke('text').should('match', /sid support ticket/i)
    //FIELD TITLES
    cy.get('form#new_support_ticket label').eq(0).invoke('text').should('match', /user name/i)
    cy.get('form#new_support_ticket label').eq(1).invoke('text').should('match', /your email/i)
    cy.get('form#new_support_ticket label').eq(2).invoke('text').should('match', /cc/i)
    cy.get('form#new_support_ticket label').eq(3).invoke('text').should('match', /subject/i)
    cy.get('form#new_support_ticket label').eq(4).invoke('text').should('match', /session/i)
    cy.get('form#new_support_ticket label').eq(5).invoke('text').should('match', /attachments/i)
    cy.get('form#new_support_ticket label').eq(6).invoke('text').should('match', /description/i)
  })

  it('Should show error message when session_id request parameter has invalid session', () => {
    const qs = {
      session_id: "12345",
    }
    cy.visit(`${rootPath}/support`, { auth, qs })

    cy.get('div.alert-danger').should($messageElement => {
      //GENERIC MESSAGE IS DISPLAYED
      expect($messageElement.text()).to.match(/session: 12345 not found/i)
    })
  })

  it('Should show required fields validation errors', () => {
    cy.visit(`${rootPath}/support`, { auth })
    //SUBMIT EMPTY FORM
    cy.get('form#new_support_ticket textarea#description').clear()
    cy.get('form#new_support_ticket input[type="submit"]').click()

    cy.get('div#email_error').invoke('text').should('match', /email is required/i)
    cy.get('div#subject_error').invoke('text').should('match', /subject is required/i)
    cy.get('div#description_error').invoke('text').should('match', /description is required/i)
  })

  it('Should show valid email fields validation errors', () => {
    cy.visit(`${rootPath}/support`, { auth })
    //SUBMIT EMPTY FORM
    cy.get('form#new_support_ticket input#email').type('invalid_email')
    cy.get('form#new_support_ticket input#cc').type('invalid_email')
    cy.get('form#new_support_ticket input[type="submit"]').click()

    cy.get('div#email_error').invoke('text').should('match', /the email format is invalid. expected a valid email/i)
    cy.get('div#cc_error').invoke('text').should('match', /the cc format is invalid. expected a valid email/i)
  })

  it('Should show queue field validation errors', () => {
    cy.visit(`${rootPath}/support`, { auth })
    // Submit an otherwise-valid form
    cy.get('form#new_support_ticket input#email').type('sid_automated_test@example.com')
    cy.get('form#new_support_ticket input#subject').type('TEST: Sid automated test')
    cy.get('form#new_support_ticket input#queue').then(elem => {
      elem.val('Not_A_Queue')
    })
    cy.get('form#new_support_ticket input[type="submit"]').click()

    cy.get('div.alert-danger').contains(/invalid queue selection/i).should($messageElement => {
      expect($messageElement.text()).to.match(/invalid queue selection/i)
    })
  })

  it('Should create support ticket', () => {
    cy.visit(`${rootPath}/support`, { auth })
    cy.get('form#new_support_ticket input#email').type('sid_automated_test@example.com')
    cy.get('form#new_support_ticket input#subject').type('TEST: Sid automated test')
    cy.get('form#new_support_ticket input#queue').then(elem => {
      elem.val(supportTicket.queue)
    })
    cy.task('log', `Support Ticket creationEnabled=${supportTicket.creationEnabled}`)

    if (supportTicket.creationEnabled) {
      cy.get('form#new_support_ticket input[type="submit"]').click()
      cy.get('div.alert-success').should($messageElement => {
        //GENERIC MESSAGE IS DISPLAYED
        expect($messageElement.text()).to.match(/support ticket created/i)
        //TICKET ID IS DISPLAYED
        expect($messageElement.text()).to.match(/ticket id: \d+/i)
      })
    }
    
  })

})
