import { administrador } from '../../../support/factories/login'
import tsenhaPage from '../../../support/view/pages/trocar_senha'

describe('Trocar Senha', () => {

    context('quando a troca de senha é feita com sucesso', () => {

        const novaSenha = 'Ffkp1234q@!'

        before(() => {
            cy.preparaBase()
            cy.uiLogin(administrador)
        })

        it('devo conseguir mudar a senha', () => {

            tsenhaPage.go()
            tsenhaPage.form(administrador, novaSenha)
            tsenhaPage.submit()
            tsenhaPage.toast.shouldHaveText('Senha alterada com Sucesso.')
            tsenhaPage.header.userLogOut()
        })

        it('devo conseguir logar com a nova senha', function () {
            cy.uiLogin(administrador, novaSenha)
            tsenhaPage.header.userLogOut()
        })
    })

    context('quando não preencho nenhum dos campos', () => {

        const alertMessages = [
            'Senha atual é obrigatória!',
            'Nova senha é obrigatória!',
            'Confirmação não está igual a nova senha!'
        ]

        before(() => {
            cy.preparaBase()
            cy.uiLogin(administrador)
            tsenhaPage.go()
            tsenhaPage.submit()
        })

        alertMessages.forEach(a => {
            it('deve exibir ' + a, () => {
                tsenhaPage.alert.shouldHaveText(a)
            })
        })
    })

    context('quando as senhas não coincidem', () => {

        const message = 'Confirmação não está igual a nova senha!'
        const novaSenha = 'Ffkp1234q@!'
        const novaSenha2 = 'Ffkp12q@!'

        before(() => {
            cy.preparaBase()
            cy.uiLogin(administrador)
        })

        it('deve exibir mensagem ' + message, () => {
            tsenhaPage.go()
            tsenhaPage.form(administrador, novaSenha, novaSenha2)
            tsenhaPage.submit()
            tsenhaPage.alert.shouldHaveText(message)
        })
    })

    context('quando a senha não cumpre os requisitos', () => {
        before(function () {
            cy.preparaBase()
            cy.uiLogin(administrador)
            tsenhaPage.go()
        })

        it('requisitos devem estar na cor vermelha', () => {
            tsenhaPage.validaSenha('vermelho')
        })

        it('requisitos devem estar na cor verde', () => {
            tsenhaPage.form(administrador, 'Ffkp1234q@!')
            tsenhaPage.validaSenha('verde')
        })

    })
})