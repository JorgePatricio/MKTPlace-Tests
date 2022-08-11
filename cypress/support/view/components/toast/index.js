import { el } from './elements'

class Toast {

    shouldHaveText(expectText) {
        cy.contains(el.toast, expectText)
            .should('be.visible', { timeout: 7000 })
    }
}

export default new Toast()