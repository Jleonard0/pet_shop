const { DataTypes } = require('sequelize');
const db = require('../controller/conn');

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

Services.sync({force:false});

module.exports = Services;