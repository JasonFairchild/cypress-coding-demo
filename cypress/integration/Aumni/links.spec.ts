/// <reference types="cypress" />

describe('Home page links', () => {
  type Link = {
    name: string;
    href: string;
  }
  // This is just a sample of the many links that could be tested
  // My thought is that whatever the set, the test could be data driven and short
  const links: Link[] = [
    {name: 'The Basics', href: '/solutions/the-basics'},
    {name: 'Investment', href: '/solutions/investment'},
    {name: 'Finance', href: '/solutions/finance'},
    {name: 'Legal', href: '/solutions/legal'},
    {name: 'Analytics', href: '/solutions/analytics'},
    {name: 'About Aumni', href: '/about'},
    {name: 'Press Room', href: '/press-room'},
    {name: 'Leadership', href: '/leadership'},
    {name: 'Careers', href: '/careers'},
    {name: 'Partnerships', href: '/partnerships'}
  ]
  /*  
    I decide not to visit the links since I believe 
    it is low value with high test time cost. If the 
    hrefs are known to be correct, then whether the link 
    works is usually a matter of server uptime for which 
    there are better ways to monitor. If the content 
    of the page the link leads to is to be tested, they'd 
    be visited in other tests. Visiting each link could
    be done quite easily though if needed.
  */ 
  it('Verifies href of many links', () => {
    cy.visit('/');
    links.forEach((link) => {
      cy.findByRole('link', { name: link.name })
        .should('have.attr', 'href', link.href);
    })
    cy.findAllByRole('link', { name: 'home' })
      .each((link) => {
        expect(link).to.have.attr('href', '/');
      })
  })
})