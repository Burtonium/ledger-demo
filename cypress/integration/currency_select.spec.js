describe('Navigating the home page', () => {
  it('Should visit home page', () => {
    cy.visit('/');
  });

  it('Should have the brand logo visible', () => {
    cy.get('[data-cy=brand-title]')
        .should('be.visible');
  })

  it('Should have a currency select with 3 options', () => {
    cy.get('[data-cy=currency-select]')
      .should('be.visible')
      .find('option')
      .should('have.length', 3);
  });

  it('Should display correct conversion results on load', () => {
    cy.get('.conversion-results')
      .should('be.visible')
      .find('.conversion-result')
      .should('have.length.gte', 3)
      .each(($el) => {
        cy.wrap($el).find('.base-asset').should('have.length', 1);
        cy.wrap($el).find('.quote-asset').should('have.length', 1);
        cy.wrap($el).find('.quote-price').should('have.length', 1).contains(/^\d*\.?\d*$/)
      });
  });

  it('Should display LTC when selecting LTC', () => {
    cy.get('[data-cy=currency-select]').select('LTC');

    cy.get('.conversion-results')
      .should('be.visible')
      .find('.conversion-result')
      .should('have.length.gte', 3)
      .each(($el) => {
        cy.wrap($el).find('.base-asset').should('have.length', 1).should('have.text', 'LTC');
        cy.wrap($el).find('.quote-asset').should('have.length', 1);
        cy.wrap($el).find('.quote-price').should('have.length', 1).contains(/^\d*\.?\d*$/)
      });
  });
});