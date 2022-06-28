const yup = require('yup')

const schemaCdastro = yup.object().shape({
    nome: yup.string().required(),
    cpf: yup.string().required(),
    email: yup.string().required(),
    senha: yup.string().required()
})

module.exports = schemaCdastro