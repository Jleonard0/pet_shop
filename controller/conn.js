const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const { AlertMenssages } = require('./Utils');
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
console.log(AlertMenssages.connectedDatabaseSuccessfully);
} catch (error) {
console.log(AlertMenssages.errorConnectingDatabase, error);
}

module.exports = sequelize;