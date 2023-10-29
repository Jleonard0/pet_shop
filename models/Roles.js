const { DataTypes } = require('sequelize');
const db = require('../controller/conn');

const Roles = db.define('Roles', {
    name: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false
    }
});

module.exports = Roles;