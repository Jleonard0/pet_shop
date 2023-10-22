const Services = require('../models/Services');

module.exports = class UserController{
    static async newServices(nome, valor){
        const servico = {
            nome: nome,
            valor: valor
        };
        await Services.create(servico);
    }
};