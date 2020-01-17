describe('todo list test start', function () {
  it('visit web page', function () {
    cy.visit('localhost:3000')
    cy.get('button').contains('新增')
  })
})
