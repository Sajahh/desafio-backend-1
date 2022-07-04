const knex = require('../database/connection');
const jwt = require('jsonwebtoken');
const chaveSecreta = 'chaveSecreta';

const verificarLogin = async (req, res, next) => {
    const {auth} = req.headers;

    if (!auth) {
        return res.status(401).json({mensagem: 'Não autorizado'});
    }

    try {
        const token = auth.replace('Bearer', '').trim()
        const {id} = jwt.verify(token, chaveSecreta);

        await knex('usuarios').where('id', id).first().then(usuario => {
            if (!usuario) {
                return res.status(401).json({mensagem: 'Email ou senha incorreto'});
            }
        })

        const {senha, ...usuario} = await knex('usuarios').where('id', id).first();
        req.usuario = usuario;
        next();
    } catch (error) {
        return res.status(401).json({mensagem: 'Não autorizado'});
    }
        
    }

    modulue.exports = verificarLogin;
