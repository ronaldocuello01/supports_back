const { Pool } = require('pg')

const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    password: 'r12345*',
    database: 'test'
});

module.exports = pool;