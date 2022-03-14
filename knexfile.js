require('dotenv').config();

const knexStringcase = require('knex-stringcase');

const connection = process.env.DB_URL;

console.log(connection);

const config = {
  client: 'pg',
  connection,
  migrations: {
    directory: './src/knex/migrations',
  },
  seeds: {
    directory: './src/knex/seeds',
  },
  pool: { min: 0, max: 50 },
};

module.exports = knexStringcase(config);


