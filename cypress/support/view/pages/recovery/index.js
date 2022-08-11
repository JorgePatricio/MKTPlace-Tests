import { el } from './elements'

class RecoveryPage {
    go() {
        cy.visit('/#/usuarios/recuperarSenha')
        cy.contains('a', 'Esqueci minha senha').click()
        cy.contains(el.title)
            .should('be.visible')
    }

    escolha(choice) {
        cy.contains(el.recoveryChoice, choice)
                .click()

    }

    form(perfil) {
        cy.get(el.usuario).type(perfil)
    }  
    
    submit() {
        cy.contains(el.buttonRecuperarSenha)
            .click()
    }
}

export default new RecoveryPage()