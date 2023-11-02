const Services = require('../models/Services');
const RolesController = require('./RolesController');
const Utils = require('./Utils');

async function __newService(name, value, roleId) {
    const servico = {
        name: name,
        value: value,
        RoleId: roleId
    };
    await Services.create(servico);
}

class ServicesController {
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

    static async addFunctionality(req, res){
        try {
            if(!RolesController.isAdmin(req.session.userrole)){
                res.redirect('/administracao');
                return;
            }
            res.render(Utils.Titles.addFunctionality.name_page, { 'title': Utils.Titles.addFunctionality.title, 'allRoles': await RolesController.allRoles()});
        } catch (error) {
            console.log(error)
        }
    }

    static async addFunctionalityPost(req, res){
        try {
            if(!RolesController.isAdmin(req.session.userrole)){
                res.redirect('/administracao');
                return;
            }
            const { name, value, RoleId } = req.body;
            await __newService(name, value, RoleId);
            Utils.Message.redirect(req, res, '/administracao/adicionar_servico', 'Serviço adicionado com sucesso.');
        } catch (error) {
            console.log(error)
        }
    }
    
    static async removeFunctionality(req, res){
        try {
            
        } catch (error) {
            console.log(error)
        }
    }

    static async removeFunctionalityPost(req, res){
        try {
            
        } catch (error) {
            console.log(error)
        }
    }
};

module.exports = ServicesController;