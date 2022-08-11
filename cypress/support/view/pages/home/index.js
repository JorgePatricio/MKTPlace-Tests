import header from "../../components/header";
import nav from '../../components/nav'

class HomePage {
    constructor() {
        this.header = header
        this.nav = nav
    }

    go() {
        cy.visit('/#/home')
    }
}

export default new HomePage()