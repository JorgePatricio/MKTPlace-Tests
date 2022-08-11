import { el } from './elements'

class Modal {
    shouldHaveText(expectText) {
        cy.contains(el.modal, expectText)
            .should('be.visible')
        cy.contains(el.btnConfirmar)
            .click()
    }

    shouldWaitLoading(expectText) {
        cy.contains(el.loading, expectText)
            .should('be.hidden')
    }
}

export default new Modal()