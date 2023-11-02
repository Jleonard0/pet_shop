const { DataTypes } = require('sequelize');
const db = require('../controller/conn');
const Roles = require('./Roles');

const Users = db.define('Users',{
    full_name: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false
    }
});

Users.belongsTo(Roles, {
    foreignKey: {
        allowNull: false
    }
});

module.exports = Users;