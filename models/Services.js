const { DataTypes } = require('sequelize');
const db = require('../controller/conn');

const Servicos = db.define('Servicos', {
    nome:{
        type: DataTypes.STRING,
        require: true,
        allowNull: false
    },
    valor:{
        type: DataTypes.FLOAT,
        require: true,
        allowNull: false
    }
});

module.exports = Servicos;