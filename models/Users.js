const { DataTypes } = require('sequelize');
const db = require('../controller/conn');

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
    },
    role: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false
    },
});

module.exports = Users;