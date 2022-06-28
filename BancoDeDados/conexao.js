const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 5432,
        user: 'postgres',
        password: '240608041009',
        database: 'pic_pay'
    }
})

module.exports= knex