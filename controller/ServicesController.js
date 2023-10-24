const Services = require('../models/Services');

class ServicesController {
    static async newService(name, value) {
        const servico = {
            name: name,
            value: value
        };
        await Services.create(servico);
    }
    static async removeServiceById(id) {
        await Services.destroy({
            where: {
                id: id
            },
        });
    }
    static async getTable() {
        return await Services.findAll();
    }
};

module.exports = ServicesController;