const { DataTypes } = require('sequelize');
const db = require('../controller/conn');

const Clients = db.define('Clients',{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    cpf: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false
    },
    telephone: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false
    }
});

module.exports = Clients;