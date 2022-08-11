import loginPage from '../../../support/view/pages/login'
import { administrador, usuarioNaoCadastrado, admErrado, usuarioBloqueado } from '../../../support/factories/login'


describe('login', function () {

    before(function () {
        cy.preparaBase()
    })

    context('quando login é feito com sucesso', function () {
        it('deve logar no marketplace', function () {
            loginPage.go()
            loginPage.form(administrador)
            loginPage.submit()
            loginPage.toast.shouldHaveText('Usuário autenticado na plataforma')
            loginPage.header.userLoggedIn(administrador)
        })
    })

    context('quando preencho com informações erradas', function () {
        const message = 'Usuário e/ou senha inválidos.'
        const usuarios = [
            usuarioNaoCadastrado,
            admErrado
        ]

        before(function () {
            loginPage.go()
        })

        usuarios.forEach(function (user) {
            it('deve exibir modal com mensagem: ' + message, function () {
                loginPage.form(user)
                loginPage.submit()
                loginPage.modal.shouldHaveText(message)
            })
        })
    })

    context('quando o usuário está bloqueado', function () {
        const message = 'Usuário bloqueado no sistema.'

        before(function () {
            cy.apiLogin(administrador)
            cy.inserirUsuario(usuarioBloqueado)
        })
        it('deve exibir modal com mensagem: ' + message, function () {
            loginPage.go()
            loginPage.form(usuarioBloqueado)
            loginPage.submit()
            loginPage.modal.shouldHaveText(message)
        })
    })

    context('quando o usuário erra a senha em excesso', function () {
        const message = 'Usuário bloqueado no sistema.'
        const message2 = 'Usuário e/ou senha inválidos.'

        before(function () {
            cy.desbloquear(administrador)
            cy.apiLogin(administrador)
            loginPage.go()
        })
        
        it('deve exibir modal com mensagem: ' + message, function () {
            for (let index = 0; index < 5; index++) {
                loginPage.form(admErrado)
                loginPage.submit()
                loginPage.modal.shouldHaveText(message2)
            }
            loginPage.form(admErrado)
            loginPage.submit()
            loginPage.modal.shouldHaveText(message)
        })
    })
})
