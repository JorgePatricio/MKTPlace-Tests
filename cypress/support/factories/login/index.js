import _ from 'underscore'

exports.administrador = {
    usuario: 'administradorTI',
    senha: 'Fkp12q@'
}

exports.administradorTrocaSenha = {
    usuario: 'administradorTI',
    senha: 'Fkp12q@',
    novaSenha: 'Ffkp1234q@!'
}

exports.admErrado = {
    usuario: 'administradorTI',
    senha: '123456'
}

exports.emailErrado = {
    email: 'jorge&gmail.com'
}

exports.usuarioBloqueado = {
    usuario: 'usuarioBloq',
    senha: 'Fkp12q@',
    email: 'jorge.patricio@interplayers.com.br',
    IsApproved: true,
    IdGrupoAcesso: 67
}

exports.representante = {
    usuario: 'rep_plk',
    senha: 'Aa123456789@'
}

exports.usuarioNaoCadastrado = {
    usuario: 'user_bad',
    senha: 'Fkp12q@'
}

exports.administradorPerfil = {
    usuario: 'administradorTI',
    senha: 'Fkp12q@',
    email: 'jorge.patricio@interplayers.com.br',
    endereco: {
        cep: '41195410',
        rua: 'Condomínio Solar Orixás da Bahia',
        numero: '460',
        complemento: 'Bloco159B',
        bairro: 'Barreiras',
        uf: 'BA',
        cidade: 'SALVADOR'
    }
}