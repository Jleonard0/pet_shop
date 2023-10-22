const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({path: '.env'});
const sequelize = new Sequelize(
    database = process.env.DATABASE,
    username = process.env.DATABASE_USER,
    password = process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        dialect: 'mysql'
    }
);

try {
sequelize.authenticate();
console.log('Conectado ao banco de dados com sucesso');
} catch (error) {
console.log('Erro ao conectar ao banco de dados!', error);
}

module.exports = sequelize;