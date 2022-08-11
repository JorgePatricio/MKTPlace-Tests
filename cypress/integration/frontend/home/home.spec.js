import { administrador } from '../../../support/factories/login'
import homePage from '../../../support/view/pages/home'

describe('home', function () {

    before(function () {
        cy.preparaBase()
    })

    context('quando estou logado', function () {

        it('devo ver a barra de navegação', function () {

            cy.uiLogin(administrador)
            homePage.nav.navBarShouldBeVisible()
            
        })
    })
})