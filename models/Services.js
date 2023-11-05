const { DataTypes } = require('sequelize');
const db = require('../controller/conn');
const Roles = require('./Roles');

const Services = db.define('Services', {
    name:{
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
        unique: true
    },
    value:{
        type: DataTypes.FLOAT,
        require: true,
        allowNull: false
    }
});

Services.belongsTo(Roles, {
    foreignKey: {
        require: true,
        allowNull: false
    }
});

module.exports = Services;