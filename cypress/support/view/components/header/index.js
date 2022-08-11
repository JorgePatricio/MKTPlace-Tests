import { el } from './elements'

class Header {
    userLoggedIn(userName) {
        cy.contains(el.userName, userName.usuario)
            .should('be.visible')
    }

    userLogOut() {
        cy.get(el.menu)
            .click()
        cy.contains(el.logoutButton)
            .click()
        cy.contains(el.usuarioLabel)
            .should('be.visible')
    }
}

export default new Header()