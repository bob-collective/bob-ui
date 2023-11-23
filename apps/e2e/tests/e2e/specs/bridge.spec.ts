describe('connect wallet spec', () => {
  before(() => {
    cy.visit('/');
  });

  it('should connect wallet with success', () => {
    cy.get('button').contains('Connect Wallet').click();
  });
});
