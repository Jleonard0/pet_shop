const Services = require('../models/Services');

module.exports = class UserController{
    static async newService(nome, valor){
        const servico = {
            nome: nome,
            valor: valor
        };
        await Services.create(servico);
    }
    static async removeServiceById(id){
        await Services.destroy({
            where: {
              id: id
            },
          });
    }
    static async getTable(){
        return await Services.findAll();
    }
};