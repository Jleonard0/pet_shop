const { DataTypes } = require('sequelize');
const db = require('../controller/conn');
const Roles = require('./Roles');

const Services = db.define('Services', {
    name:{
        type: DataTypes.STRING,
        require: true,
        allowNull: false
    },
    value:{
        type: DataTypes.FLOAT,
        require: true,
        allowNull: false
    }
});

Services.belongsTo(Roles, {
    foreignKey: {
        allowNull: false
    }
});

module.exports = Services;