const express = require('express')
const knex = require('../../BancoDeDadosBanco/conexao')
const jwt = require('jsonwebtoken')
const schemaCdastro = require('../validacoes/schemaCadastro')
const schemaLogin = require('../validacoes/schemaLogin')
const chaveSecreta = require('../../chaveSecreta')

const cadastroUsuario = async (req, res) => {
    const {nome, cpf, email, senha} = req.body

   try {
    await schemaCdastro.validate({nome, cpf, email, senha})
    

    const localizaUsuarioExistente = await knex('usuarios').where({ email }).first()

    if (localizaUsuarioExistente) {
      return res.status(400).json({ mensagem: 'o email informado já existe' })
    }
const hash = (await pwd.hash(Buffer.from(senha))).toString("hex")
    const cadastrarUsuario = await knex('usuarios').insert({
        nome,
        cpf,
        email,
        senha: hash})
        if(!cadastrarUsuario){
            res.status(404).json({
                mensagem: 'Usuario não foi cadastrado'
            })
        }
        return res.status(200).json({ mensagem: 'Usuario cadastrado com sucesso'})
   } catch (error) {
    return res.status(400).json({error: error.message})
   }
}

const loginUsuario = async (req, res) => {
    const {email, senha} = req.body

    try {
        await schemaLogin.validate({email, senha})
        const usuario = await knex('usuarios').where({ email }).first()
        if (!usuario) {
            return res.status(400).json({ mensagem: 'O email informado não existe' })
        }
        const senhaCorreta = await pwd.compare(Buffer.from(senha), Buffer.from(usuario.senha))
        if (!senhaCorreta) {
            return res.status(400).json({ mensagem: 'Email ou senha inválido' })
        }
        switch (senhaCorreta) {
            case securePassword.INVALID_UNRECOGNIZED_HASH:
            case securePassword.INVALID:
                return res.status(400).json('Email ou senha incorretos')
            case securePassword.VALID:
                break;
            case securePassword.VALID_NEEDS_REHASH:
                try {
                    const hash = (await pwd.hash(Buffer.from(senha))).toString("hex");
                    const query = await knex('usuarios').where({ email }).update({ senha: hash })
                    if (!query) {
                        return res.status(400).json({ mensagem: 'Não foi possível atualizar a senha' })
                    }
                } catch {
                }
                break
        }
        const token = jwt.sign({ id: usuario.id, nome: usuario.nome }, chaveSecreta, { expiresIn: '7d' })
        const usuarioLogado = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            token
        }
        return res.status(200).json(usuarioLogado)
    }
     catch (error) {
        return res.status(400).json({error: error.message})
    }
        
    }


module.exports = {
    cadastroUsuario,
    loginUsuario
}