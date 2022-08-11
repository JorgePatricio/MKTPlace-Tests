import { administrador, admErrado } from '../../../support/factories/login'

describe('Sessão de usuário', function () {

    before(function () {
        cy.preparaBase()
    })

    context('quando uso credenciais válidas', function () {

        it('devo gerar um token', function () {
            cy.apiLogin(administrador).then(response => {
                expect(response.status).to.eq(200)
            })
            cy.log(Cypress.env('apiToken'))
        })
    })

    context('quando uso credenciais inválidas', function () {

        it('não deve gerar um token', function () {
            cy.apiLogin(admErrado).then((response) => {
                expect(response.status).to.eq(400)
            })
        })
    })
})