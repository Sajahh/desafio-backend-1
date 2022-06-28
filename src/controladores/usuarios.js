const express = require('express')
const knex = require('../../BancoDeDadosBanco/conexao')
const schemaCdastro = require('../validacoes/schemaCadastro')


const cadastroUsuario = async (req, res) => {
    const {nome, cpf, email, senha} = req.body


   try {
    const validadados = await schemaCdastro.validate({nome, cpf, email, senha})
    const cadastrarUsuario = await knex('usuarios').insert({
        nome,
        cpf,
        email,
        senha})
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