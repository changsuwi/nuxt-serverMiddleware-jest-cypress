describe('todo list test start', function () {
  const serverURL = Cypress.env('api_server') || 'localhost:3000'
  it('visit web page', function () {
    cy.visit(serverURL)
    cy.get('button').contains('新增')
  })
})
