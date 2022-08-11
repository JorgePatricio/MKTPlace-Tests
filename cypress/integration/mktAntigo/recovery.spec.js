import recoveryPage from '../../support/pages/recovery'
import { administrador, representante } from '../../support/factories/login'

describe('resgate de senha', function () {

    context('quando o usuario esquece a senha', function () {

        it('deve poder resgatar por email', function () {
            recoveryPage.go()
            recoveryPage.escolha('Envie-me um link de redefinição por e-mail')
            recoveryPage.form(representante.usuario)
            recoveryPage.submit()

        })
    })
})