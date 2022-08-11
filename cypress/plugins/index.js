/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
const sql = require('mssql')

module.exports = (on, config) => {
  const appPool = new sql.ConnectionPool(config.env.dbConfig)

  on('task', {
    resetAdmin() {
      return new Promise(function (resolve) {
        appPool.connect().then((pool) => {
          return pool.query`update aspnet_Membership set password='Fkp12q@', IsLockedOut = 0,PasswordFormat = 0 where UserId = 'F14DC3E3-7B85-46AC-8E93-4F04AE800009'`
        }).then(result => {
          resolve(result.rowsAffected[0])
        }).catch(err => {
          // ... error checks
          console.dir(err)
        })
      })
    },

    verificaUsuario(usuario) {
      return new Promise(function (resolve) {
        appPool.connect().then((pool) => {
          return pool.query`SELECT * from aspnet_Users where UserName = ${usuario}`
        }).then(result => {
          resolve(result)
        }).catch(err => {
          // ... error checks
          console.dir(err)
        })
      })
    },

    deleteBanner() {
      return new Promise(function (resolve) {
        appPool.connect().then((pool) => {
          return pool.query`update GerenciamentoConteudo.TB_BannerPopUp set isDeleted = 1`
        }).then(result => {
          resolve(result.rowsAffected[0])
        }).catch(err => {
          // ... error checks
          console.dir(err)
        })
      })
    },

    bloquearUsuario(idUsuario) {
      return new Promise(function (resolve) {
        appPool.connect().then((pool) => {
          return pool.query`update aspnet_Membership set IsLockedOut = 1 where UserId = ${idUsuario}`
        }).then(result => {
          resolve(result.rowsAffected[0])
        }).catch(err => {
          // ... error checks
          console.dir(err)
        })
      })
    },

    desbloquearUsuario(idUsuario) {
      return new Promise(function (resolve) {
        appPool.connect().then((pool) => {
          return pool.query`update aspnet_Membership set IsLockedOut = 0,PasswordFormat = 0 where UserId = ${idUsuario}`
        }).then(result => {
          resolve(result.rowsAffected[0])
        }).catch(err => {
          // ... error checks
          console.dir(err)
        })
      })
    }
  }),

  on('after:run', () => {
    appPool.close()
  })
}


