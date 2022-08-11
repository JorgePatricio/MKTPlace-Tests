import perfilPage from '../../../support/view/pages/perfil'
import { administradorPerfil, emailErrado } from '../../../support/factories/login'

describe('Minha Conta', function () {

    before(function () {
        cy.preparaBase()
    })

    context('quando usuario não tem informações no perfil', function () {

        it('devo cadastrar os dados e endereço com sucesso', function () {

            cy.uiLogin(administradorPerfil)
            perfilPage.go()
            perfilPage.form(administradorPerfil)
            perfilPage.submit()
            perfilPage.toast.shouldHaveText('Perfil salvo com sucesso!')
        })
    })

    context('quando não preencho os campos obrigatórios', function () {

        const alertMessages = [
            'Nome é obrigatório!',
            'E-mail é obrigatório!',
            'Como deseja ser chamado é obrigatório!',
            'CEP é obrigatório!',
            'Bairro é obrigatório!',
            'UF é obrigatória!',
            'Cidade é obrigatória!',
            'Endereço é obrigatório!',
            'Número é obrigatório!'
        ]

        before(function () {
            cy.uiLogin(administradorPerfil)
            perfilPage.go()
            perfilPage.clean()
        })

        alertMessages.forEach(a => {
            it('deve exibir modal com mensagem ' + a, () => {
                perfilPage.submit()
                perfilPage.alert.shouldHaveText(a)
            })
        })
    })

    context('quando e-mail é inválido', function(){

        const alertMessage = 'Por favor, digite um e-mail válido'

        before(function () {
            cy.uiLogin(administradorPerfil)
            perfilPage.go()
            perfilPage.clean()
        })

        it('devo exibir alerta ' + alertMessage, function(){
            perfilPage.form(emailErrado, 'email')
            cy.contains('label', 'E-mail').click()
            perfilPage.alert.shouldHaveText(alertMessage)
        })
    })
})