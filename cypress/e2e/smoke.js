describe('app works', () => {
  it('works', () => {
    cy.visit('/')
      .findByText(/Try out the app!/i)
      .click()
      .findByText(/log in/i)
  })
})
