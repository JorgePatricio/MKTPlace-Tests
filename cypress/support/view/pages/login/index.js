import { el } from './elements'
import modal from '../../components/modal'
import header from '../../components/header'
import toast from '../../components/toast'


class LoginPage {

    constructor() {
        this.modal = modal
        this.header = header
        this.toast = toast
    }

    go() {
        cy.visit('/')
        cy.contains(el.usuarioLabel)
            .should('be.visible')
    }

    form(login, novaSenha = false) {

        cy.get(el.usuario)
            .clear()
            .type(login.usuario)

        if (novaSenha) {
            cy.get(el.senha)
                .clear()
                .type(novaSenha)
        } else {
            cy.get(el.senha)
                .clear()
                .type(login.senha)
        }
    }

    submit() {
        //cy.get(el.loginButton).invoke('removeAttr', 'disabled')
        cy.get(el.loginButton).click()
    }
}

export default new LoginPage()