import { NAVIGATION, loadHomepage } from "../../support/utils/navigation.js";
import { changeProfile } from "../../support/utils/profiles.js";

describe('OnDemand Dashboard - Footer', () => {

  const profiles = cy.sid.profiles
  Cypress.config('baseUrl', NAVIGATION.baseUrl);

  beforeEach(() => {
    //DEFAULT SIZE FOR THESE TESTS
    cy.viewport(cy.sid.screen.largeWidth, cy.sid.screen.height)
    loadHomepage()
  })

  profiles.forEach(profile => {
    it(`${profile}: Should display footer expected logos with link`, () => {
      changeProfile(profile)
      cy.get('footer a').should($logos => {
          expect($logos).to.have.length(3)
  
          expect($logos.eq(0).attr('href')).to.equal('https://osc.github.io/Open-OnDemand/')
          expect($logos.eq(0).find('img').attr('alt')).to.match(/powered by open ondemand/i)
  
          expect($logos.eq(1).attr('href')).to.equal('https://vdi.rc.fas.harvard.edu/pun/sys/dashboard')
          expect($logos.eq(1).find('img').attr('alt')).to.match(/fasrc/i)
  
          expect($logos.eq(2).attr('href')).to.equal('https://www.iq.harvard.edu/')
          expect($logos.eq(2).find('img').attr('alt')).to.match(/iqss/i)
        })
    })
  
    it(`${profile}: Should display footer expected text elements`, () => {
      changeProfile(profile)
      cy.get('footer span.footer_version').should($versions => {
          expect($versions).to.have.length(3)
  
          expect($versions.eq(0).text()).to.match(/you are on/i)
          expect($versions.eq(1).text()).to.match(/ondemand version:/i)
          expect($versions.eq(2).text()).to.match(/config version:/i)
        })
    })
  })
  

})