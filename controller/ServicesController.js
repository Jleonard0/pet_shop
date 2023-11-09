const Services = require('../models/Services');
const RolesController = require('./RolesController');
const {Message, InfoPage, Functionalities, AlertMenssages} = require('./Utils');

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

    static async addService(req, res){
        try {
            if(!RolesController.isAdmin(req.session.userrole)){
                res.redirect('/autenticacao');
                return;
            }
            res.render(InfoPage.addService.name_page, { 'title': InfoPage.addService.title, 'allRoles': await RolesController.allRoles()});
        } catch (error) {
            console.log(error)
        }
    }

    static async addServicePost(req, res){
        try {
            if(!RolesController.isAdmin(req.session.userrole)){
                res.redirect('/autenticacao');
                return;
            }
            const { name, value, RoleId } = req.body;
            await __newService(name, value, RoleId);
            Message.redirect(req, res, '/funcionalidade/adicionar_servico', AlertMenssages.serviceAddSuccessfully);
        } catch (error) {
            if(error.errors[0].type && error.errors[0].type === 'unique violation'){
                Message.redirect(req, res, '/funcionalidade/adicionar_servico', AlertMenssages.serviceAlreadyExists);
            }
        }
    }
    
    static async removeService(req, res){
        try {
            if(!RolesController.isAdmin(req.session.userrole)){
                res.redirect('/autenticacao');
                return;
            }
            res.render(InfoPage.removeService.name_page, { 'title': InfoPage.removeService.title});
        } catch (error) {
            console.log(error)
        }
    }

    static async removeServicePost(req, res){
        try {
            if(!RolesController.isAdmin(req.session.userrole)){
                res.redirect('/autenticacao');
                return;
            }
            const { name, value, RoleId } = req.body;
            await __removeService(name);
            Message.redirect(req, res, '/funcionalidade/remover_servico', 'Serviço removido com sucesso.');
        } catch (error) {
            console.log(error)
        }
    }

    static async functionalities(req, res) {
        if(RolesController.isAdmin(req.session.userrole)){
            res.render(InfoPage.functionalities.name_page, { 'title': InfoPage.functionalities.title, 'listOfFunctionalities': Functionalities.listOfFunctionalities, 'listOfFunctionalitiesOfAdmin':Functionalities.listOfFunctionalitiesOfAdmin, 'listOfFunctionalitiesOfReceptionist': Functionalities.listOfFunctionalitiesOfReceptionist });
            return
        }
        if(RolesController.isReceptionist(req.session.userrole)){
            res.render(InfoPage.functionalities.name_page, { 'title': InfoPage.functionalities.title, 'listOfFunctionalities': Functionalities.listOfFunctionalities, 'listOfFunctionalitiesOfReceptionist': Functionalities.listOfFunctionalitiesOfReceptionist });
            return
        }
        res.render(InfoPage.functionalities.name_page, { 'title': InfoPage.functionalities.title, 'listOfFunctionalities': Functionalities.listOfFunctionalities });
    }

    //a fazer
    static async panel(req, res) {
        res.render(InfoPage.panel.name_page, { 'title': InfoPage.panel.title });
    }

    //a fazer
    static async panelPost(req, res) {
        res.render(InfoPage.panel.name_page, { 'title': InfoPage.panel.title });
    }
};

module.exports = ServicesController;