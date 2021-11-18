describe('Sid Dashboard - Footer', () => {

  const baseUrl = Cypress.env('dashboard_baseUrl')
  const rootPath = Cypress.env('dashboard_rootPath')
  const auth = cy.sid.auth
  Cypress.config('baseUrl', baseUrl);

  beforeEach(() => {
    //DEFAULT SIZE FOR THESE TESTS
    cy.viewport(cy.sid.screen.largeWidth, cy.sid.screen.height)
    cy.visit(rootPath, { auth })
  })

  it('Should display footer logos with link', () => {
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

  it('Should display Open OnDemand and Sid Dashboard versions', () => {
    cy.get('footer span.footer_version').should($versions => {
        expect($versions).to.have.length(2)

        expect($versions.eq(0).text()).to.match(/ondemand version:/i)
        expect($versions.eq(1).text()).to.match(/sid version:/i)
      })
  })

})