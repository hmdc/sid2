import { NAVIGATION, loadHomepage } from "../../../support/utils/navigation.js";

describe('OnDemand Dashboard - Footer', () => {

  const profiles = cy.sid.profiles
  Cypress.config('baseUrl', NAVIGATION.baseUrl);

  beforeEach(() => {
    //DEFAULT SIZE FOR THESE TESTS
    cy.viewport(cy.sid.screen.largeWidth, cy.sid.screen.height)
    loadHomepage()
  })

  it('FASRC: Should display footer expected logos with link', () => {
    cy.get('footer a').should($logos => {
        expect($logos).to.have.length(1)

        expect($logos.eq(0).attr('href')).to.equal('https://openondemand.org')
        expect($logos.eq(0).find('img').attr('alt')).to.match(/powered by open ondemand/i)
      })
  })

  it('FASRC: Should display footer expected text elements', () => {
    cy.get('footer span').should($versions => {
        expect($versions).to.have.length(1)

        expect($versions.eq(0).text()).to.match(/ondemand version:/i)
      })
  })

})