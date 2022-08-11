import { el } from './elements'
import toast from '../../components/toast'
import alert from '../../components/alert'
import header from '../../components/header'
import modal from '../../components/modal'
import { administrador } from '../../../factories/login'


class TrocarSenhaPage {

    constructor() {
        this.toast = toast
        this.alert = alert
        this.header = header
        this.modal = modal
    }

    go() {
        cy.visit('/#/alterar-senha')
        //cy.get('#foto-perfil').click()
        //cy.contains('div p', 'Configurações').click()
        //cy.contains(el.title).should('be.visible')
    }

    form(user, novaSenha, novaSenha2 = false) {
        cy.get(el.senhaAtual)
            .clear({ force: true })
            .type(user.senha)
        cy.get(el.novaSenha)
            .clear()
            .type(novaSenha)
        if (novaSenha2) {
            cy.get(el.repNovaSenha)
                .clear()
                .type(novaSenha2)
        } else {
            cy.get(el.repNovaSenha)
                .clear()
                .type(novaSenha)
        }

    }

    submit() {
        cy.contains(el.btnEnviar).click()
    }

    validaSenha(cor) {
        const requisitos = [
            'Deve conter pelo menos 11 caracteres!',
            'Deve conter pelo menos 1 número!',
            'Deve conter pelo menos 1 letra maiúscula!',
            'Deve conter pelo menos 1 letra minúscula!',
            'Deve conter pelo menos 1 caractere especial!'
        ]

        requisitos.forEach(r => {
            if (cor == 'vermelho')
                cy.contains('.font-color-error', r).should('have.css', 'color', 'rgb(239, 68, 68)')
            if (cor == 'verde')
                cy.contains('.font-color-valid', r).should('have.css', 'color', 'rgb(21, 87, 36)')
        })
    }
}

export default new TrocarSenhaPage()