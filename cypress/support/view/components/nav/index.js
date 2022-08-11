import { el } from './elements'

class Nav {

    navBarShouldBeVisible() {
        cy.get(el.logomarca).should('be.visible')
    }

}

export default new Nav()