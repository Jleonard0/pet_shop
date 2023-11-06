const Clients = require("../models/Clients");
const PetsController = require('./PetsController');
const RolesController = require("./RolesController");
const { Message, InfoPage } = require('./Utils');
const CPF = require('cpf');

async function __addClient(name, cpf, telephone, address){
    await Clients.create({
        name: name,
        cpf: cpf,
        address: address,
        telephone: telephone
    });
}

class ClientsController{
    static addClient(req, res){
        if(!RolesController.isReceptionist(req.session.userrole) && !RolesController.isAdmin(req.session.userrole)){
            Message.redirect(req, res, '/autenticacao', 'Utilizer uma conta de atendente ou de administrador para acessar essa página.');
            return
        }
        res.render(InfoPage.addClient.name_page, { title: InfoPage.addClient.title });
    }
    
    static async addClientPost(req, res){
        if(!RolesController.isReceptionist(req.session.userrole) && !RolesController.isAdmin(req.session.userrole)){
            Message.redirect(req, res, '/autenticacao', 'Utilizer uma conta de atendente ou de administrador para acessar essa página.');
            return
        }
        const { name, cpf, address, telephone } = req.body;
        if(!CPF.isValid(cpf)){
            Message.redirect(req, res, '/funcionalidade/adicionar_cliente', 'CPF invalido.');
            return
        }
        await __addClient(name, CPF.format(cpf), telephone, address);
        Message.redirect(req, res, '/funcionalidade/adicionar_cliente', 'Cliente cadastrado com sucesso.');
    }

    static removeClient(req, res){

    }

    static async removeClientPost(req, res){

    }
}

module.exports = ClientsController;