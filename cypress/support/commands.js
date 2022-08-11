// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import loginPage from '../support/view/pages/login'
import homePage from '../support/view/pages/home'
import { apiServer } from '../../cypress.json'


Cypress.Commands.add('preparaBase', () => {
    cy.task('resetAdmin').then((result) => {
        if (result == 1) {
            cy.log('Senha resetada')
        } else {
            cy.log('Senha não resetada')
        }
    })

    // cy.task('deleteBanner').then((result) => {
    //     if (result > 0) {
    //         cy.log('Banner deletado')
    //     } else {
    //         cy.log('Banner não deletado')
    //     }
    // })
})

Cypress.Commands.add('uiLogin', function (user, novaSenha = false) {
    loginPage.go()
    loginPage.form(user, novaSenha)
    loginPage.submit()
    homePage.nav.navBarShouldBeVisible()
})

Cypress.Commands.add('apiLogin', function (user) {
    cy.request({
        method: 'POST',
        url: apiServer + '/token',
        form: true,
        body: {
            grant_type: 'password',
            UserName: user.usuario,
            Password: user.senha
        },
        failOnStatusCode: false
    }).then(function (response) {
        Cypress.env('apiToken', response.body.access_token)
    })
})

Cypress.Commands.add('inserirUsuario', function (user) {
    const payload = {
        Email: user.email,
        IdGrupoAcesso: 67,
        IsApproved: true,
        Login: user.usuario,
        NomeUsuario: user.usuario,
        Senha: user.senha
    }

    cy.task('verificaUsuario', user.usuario)
        .then((result) => {
            console.log(result)
            Cypress.env('resultado', result.rowsAffected[0])
            Cypress.env('idUsuario', result.recordsets[0].UserId)
        })

    if (Cypress.env('resultado') == 0) {
        cy.request({
            method: 'POST',
            url: apiServer + '/api/usuarios/incluir',
            body: payload,
            headers: {
                authorization: 'Bearer ' + Cypress.env('apiToken')
            }
        }).then(function (response) {
            expect(response.status).to.eq(200)
            Cypress.env('idUsuario', response.recordsets[0].UserId)
        })
    }

    cy.task('bloquearUsuario', Cypress.env('idUsuario')).then(function (response) {
        if (response == 1) {
            cy.log('Usuário bloqueado')
        } else {
            cy.log('Usuário não bloqueado')
        }
    })
})

Cypress.Commands.add('desbloquear', function (user) {
    cy.task('verificaUsuario', user.usuario)
        .then((result) => {
            Cypress.env('resultado', result.recordsets[0].UserName)
            Cypress.env('idUsuario', result.recordsets[0].UserId)
        })
    cy.task('desbloquearUsuario', Cypress.env('idUsuario'))
        .then((result) => {
            if (result == 1) {
                cy.log('Usuario desbloqueado')
            } else {
                cy.log('Usuario não desbloqueado')
            }
        })
})