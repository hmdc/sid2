export const changeProfile = (profile) => {
  cy.get('nav li[title="Help"]').as('navItem')
  cy.get('@navItem').find('> a').invoke('text').should('match', /help/i)
  cy.get('@navItem').find('> a').click()
  cy.get('@navItem').find('ul li a').as('menu')

  cy.get('@menu').filter(`a[title="${profile}"]`).click()
  //PARTIAL TEXT CHECK => BETTER RESILIENCE
  cy.get('div.alert-success').should('contain.text', 'Settings updated')
  cy.get('div.alert-success button').click()
}