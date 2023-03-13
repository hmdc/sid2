import { NAVIGATION, loadHomepage, navigateToSupport } from "../../support/utils/navigation.js";
import { changeProfile } from "../../support/utils/profiles.js";
import { startInteractiveApplication,  cleanupSessions } from "../../support/utils/sessions.js";

describe('OnDemand Dashboard - Support Ticket', () => {

  const profiles = cy.sid.profiles
  const supportTicket = Cypress.env('support_ticket') || cy.sid.supportTicket
  Cypress.config('baseUrl', NAVIGATION.baseUrl);

  const assertForm = (checkSessionDescription = false) => {
    //BREADCRUMBS
    cy.get('ol.breadcrumb li').eq(0).invoke('text').should('match', /home/i)
    cy.get('ol.breadcrumb li').eq(0).find('a').invoke('attr', 'href').should('match', new RegExp(NAVIGATION.rootPath, 'i'))
    cy.get('ol.breadcrumb li').eq(1).invoke('text').should('match', /support ticket/i)
    //TITLE
    cy.get('div#support-ticket-content-container h2').invoke('text').should('match', /support ticket/i)
    //FIELD TITLES
    cy.get('form#new_support_ticket label[for="support_ticket_username"]').invoke('text').should('match', /username/i)
    cy.get('form#new_support_ticket label[for="support_ticket_email"]').invoke('text').should('match', /email/i)
    cy.get('form#new_support_ticket label[for="support_ticket_cc"]').invoke('text').should('match', /cc/i)
    cy.get('form#new_support_ticket label[for="support_ticket_subject"]').invoke('text').should('match', /subject/i)
    if (checkSessionDescription) {
      cy.get('form#new_support_ticket label[for="support_ticket_session_description"]').invoke('text').should('match', /session description/i)
    }
    cy.get('form#new_support_ticket label[for="support_ticket_attachments"]').invoke('text').should('match', /attachments/i)
    cy.get('form#new_support_ticket label[for="support_ticket_description"]').invoke('text').should('match', /description/i)
  }

  beforeEach(() => {
    //DEFAULT SIZE FOR THESE TESTS
    cy.viewport(cy.sid.screen.largeWidth, cy.sid.screen.height)
    loadHomepage()
  })

  profiles.forEach(profile => {
    it(`${profile}: Should display support ticket page for selected session`, () => {
      changeProfile(profile)
      cleanupSessions()
      startInteractiveApplication({name: 'Rstudio Server'})
      cy.get('div.session-panel[data-id] .card-body p a:contains(support)').click()
  
      assertForm(true)
  
      cy.get('form#new_support_ticket input#support_ticket_session_description').should(($input) => {
        const val = $input.val()
        expect(val).to.include('Rstudio Server')
        expect(val).to.include('running')
      })
    })
  
    it(`${profile}: Should display support ticket page`, () => {
      changeProfile(profile)
      navigateToSupport()
      assertForm()
    })
  
    it(`${profile}: Should show required fields validation errors`, () => {
      changeProfile(profile)
      navigateToSupport()
      //SUBMIT EMPTY FORM
      cy.get('form#new_support_ticket input[type="submit"]').click()
  
      cy.get('form#new_support_ticket input#support_ticket_email:invalid').should('have.length', 1)
      cy.get('form#new_support_ticket input#support_ticket_subject:invalid').should('have.length', 1)
      cy.get('form#new_support_ticket textarea#support_ticket_description:invalid').should('have.length', 1)
    })
  
    it(`${profile}: Should show email fields validation errors`, () => {
      changeProfile(profile)
      navigateToSupport()
      cy.get('form#new_support_ticket input#support_ticket_email').type('invalid_email')
      cy.get('form#new_support_ticket input#support_ticket_cc').type('invalid_email')
      cy.get('form#new_support_ticket input[type="submit"]').click()
  
      cy.get('form#new_support_ticket input#support_ticket_email:invalid').should('have.length', 1)
      cy.get('form#new_support_ticket input#support_ticket_cc:invalid').should('have.length', 1)
    })
  
    it(`${profile}: Should show queue field validation errors`, () => {
      changeProfile(profile)
      navigateToSupport()
      // Submit an otherwise-valid form
      cy.get('form#new_support_ticket input#support_ticket_email').type('sid_automated_test@example.com')
      cy.get('form#new_support_ticket input#support_ticket_subject').type('TEST: Sid automated test')
      cy.get('form#new_support_ticket textarea#support_ticket_description').type('Sid automated test - to delete')
      cy.get('form#new_support_ticket input#support_ticket_queue').then(elem => {
        elem.val('Not_A_Queue')
      })
      cy.get('form#new_support_ticket input[type="submit"]').click()
  
      cy.get('div.alert-danger').contains(/invalid queue selection/i).should($messageElement => {
        expect($messageElement.text()).to.match(/invalid queue selection/i)
      })
    })
  
    it(`${profile}: Should create support ticket`, () => {
      changeProfile(profile)
      cy.task('log', `Support Ticket creationEnabled=${supportTicket.creationEnabled} queue=${supportTicket.queue}`)
  
      if (supportTicket.creationEnabled) {
        navigateToSupport()
        cy.get('form#new_support_ticket input#support_ticket_email').type('sid_automated_test@example.com')
        cy.get('form#new_support_ticket input#support_ticket_subject').type('TEST: Sid automated test')
        cy.get('form#new_support_ticket textarea#support_ticket_description').type('Sid automated test - to delete')
        cy.get('form#new_support_ticket input#support_ticket_queue').then(elem => {
          elem.val(supportTicket.queue)
        })
        cy.get('form#new_support_ticket input[type="submit"]').click()
        cy.get('div.alert-success').should($messageElement => {
          //GENERIC MESSAGE IS DISPLAYED
          expect($messageElement.text()).to.match(/support ticket created/i)
          //TICKET ID IS DISPLAYED
          expect($messageElement.text()).to.match(/ticketid: \d+/i)
        })
      }
      
    })
  })

})
