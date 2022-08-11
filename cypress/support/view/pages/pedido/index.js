import { el } from './elements'

class PedidoPage {

    go(resetPedido) {
        cy.visit('/#/pedido?resetPedido=' + resetPedido)
        cy.contains(el.title)
            .should('be.visible')
    }

    form(pdv) {
        cy.get(el.pesquisar)
            .type(pdv)
        cy.contains(el.escolha, pdv)
            .click()
    }

    request(pedido, tabloide=false) {

        switch(pedido) {
            case pedido = 'Padrão':
                cy.get(el.padrao)
                    .click()
                break;
            case pedido = 'Rep':
                cy.get(el.rep)
                    .click()
                break;
            case pedido = 'Especial':
                cy.contains(el.especial)
                    .click()
                cy.get('div[title="'+ tabloide +'"]')
                    .click()
                break;
            case pedido = 'Flex':
                cy.contains(el.flex)
                    .click()
                break;
        }
        
    }
}

export default new PedidoPage()