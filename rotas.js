const express = require('express')
const rotas = express()
const usuarios = require('../controladores/usuarios')
const cadastroUsuario = require('./src/controladores/usuarios')


rotas.post('/cadastro', cadastroUsuario )
rotas.post('/login', loginUsuario)