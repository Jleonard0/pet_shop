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

async function __removeService(name) {
    await Services.destroy({
        where: {
            name: name
        },
    });
}

class ServicesController {
    static async getTable() {
        return await Services.findAll();
    }

    static async addFunctionality(req, res){
        try {
            if(!RolesController.isAdmin(req.session.userrole)){
                res.redirect('/autenticacao');
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
                res.redirect('/autenticacao');
                return;
            }
            const { name, value, RoleId } = req.body;
            await __newService(name, value, RoleId);
            Utils.Message.redirect(req, res, '/funcionalidade/adicionar_servico', 'Serviço adicionado com sucesso.');
        } catch (error) {
            if(error.errors[0].type && error.errors[0].type === 'unique violation'){
                Utils.Message.redirect(req, res, '/funcionalidade/adicionar_servico', 'Serviço já existente, tente outro nome para o serviço.');
            }
        }
    }
    
    static async removeFunctionality(req, res){
        try {
            if(!RolesController.isAdmin(req.session.userrole)){
                res.redirect('/autenticacao');
                return;
            }
            res.render(Utils.Titles.removeFunctionality.name_page, { 'title': Utils.Titles.removeFunctionality.title});
        } catch (error) {
            console.log(error)
        }
    }

    static async removeFunctionalityPost(req, res){
        try {
            if(!RolesController.isAdmin(req.session.userrole)){
                res.redirect('/autenticacao');
                return;
            }
            const { name, value, RoleId } = req.body;
            await __removeService(name);
            Utils.Message.redirect(req, res, '/funcionalidade/remover_servico', 'Serviço removido com sucesso.');
        } catch (error) {
            console.log(error)
        }
    }

    //a fazer
    static async functionalities(req, res) {
        res.render(Utils.Titles.functionalities.name_page, { 'title': Utils.Titles.functionalities.title });
    }

    //a fazer
    static async panel(req, res) {
        res.render(Utils.Titles.panel.name_page, { 'title': Utils.Titles.panel.title });
    }

    //a fazer
    static async panelPost(req, res) {
        res.render(Utils.Titles.panel.name_page, { 'title': Utils.Titles.panel.title });
    }
};

module.exports = ServicesController;