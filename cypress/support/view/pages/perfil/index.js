import { el } from './elements'
import modal from '../../components/modal'
import toast from '../../components/toast'
import alert from '../../components/alert'

class PerfilPage {

    constructor() {
        this.modal = modal
        this.toast = toast
        this.alert = alert
    }

    go() {
        //cy.visit('/#/meuPerfil')
        cy.get(el.menu)
            .click()

        cy.contains(el.dadosPessoais)
            .click()

        cy.contains(el.title)
            .should('be.visible')
    }

    form(usuario, flag = false) {

        switch (flag) {
            case flag = 'apelido':
                cy.get(el.apelido)
                    .clear()
                    .type(usuario.usuario)
                break
            case flag = 'cep':
                cy.get(el.cep)
                    .clear()
                    .type(usuario.endereco.cep)
                cy.contains(el.buscaCep, 'CEP')
                    .click()
                break
            case flag = 'bairro':
                cy.get(el.bairro)
                    .clear()
                    .type(usuario.endereco.bairro)
                break
            case flag = 'uf':
                cy.get(el.opcoesUf)
                    .click()
                cy.contains(el.selecionarComboBox, usuario.endereco.uf)
                    .click()
                break
            case flag = 'cidade':
                cy.get(el.opcoesCidade)
                    .click()
                cy.contains(el.selecionarComboBox, usuario.endereco.cidade)
                    .click()
                break
            case flag = 'numero':
                cy.get(el.numero)
                    .clear()
                    .type(usuario.endereco.numero)
                break
            case flag = 'email':
                cy.get(el.email)
                    .clear()
                    .type(usuario.email)
                break
            case flag = 'nome':
                cy.get(el.nome)
                    .clear()
                    .type(usuario.usuario)
                break
            case flag = false:
                cy.get(el.nome)
                    .clear()
                    .type(usuario.usuario)

                cy.get(el.apelido)
                    .clear()
                    .type(usuario.usuario)

                cy.get(el.email)
                    .clear()
                    .type(usuario.email)

                cy.get(el.cep)
                    .clear()
                    .type(usuario.endereco.cep)

                cy.contains(el.buscaCep, 'CEP')
                    .click()

                cy.get(el.opcoesUf)
                    .click()
                cy.contains(el.selecionarComboBox, usuario.endereco.uf)
                    .click()

                cy.get(el.opcoesCidade)
                    .click()
                cy.contains(el.selecionarComboBox, usuario.endereco.cidade)
                    .click()

                cy.get(el.bairro)
                    .clear()
                    .type(usuario.endereco.bairro)

                cy.get(el.logradouro)
                    .clear()
                    .type(usuario.endereco.rua)

                cy.get(el.numero)
                    .clear()
                    .type(usuario.endereco.numero)

                cy.get(el.complemento)
                    .clear()
                    .type(usuario.endereco.complemento)
                break
        }
    }

    submit() {
        cy.get(el.btnConfirmar)
            .click()
    }

    clean() {
        cy.get(el.btnLimpar)
            .click()
    }

}

export default new PerfilPage()