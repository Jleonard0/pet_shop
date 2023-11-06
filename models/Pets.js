const { DataTypes } = require('sequelize');
const db = require('../controller/conn');
const Clients = require('./Clients');

const Pets = db.define('Pets',{
    name: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false
    },
    species: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false
    },
    year_of_birth: {
        type: DataTypes.DATE,
        require: true,
        allowNull: false
    }
});

Pets.belongsTo(Clients, {
    foreignKey: {
        allowNull: false
    }
});

module.exports = Pets;