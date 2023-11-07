const { where } = require('sequelize');
const Pets = require('../models/Pets');
const RolesController = require('./RolesController')
const { Message } = require('./Utils');
class PetsController {
    static async addPet(req, res) {
        if(!req.session.userid){
            res.redirect('/autenticacao');
            return
        }
        if(!RolesController.isAdmin(req.session.userrole) && !RolesController.isReceptionist(req.session.userrole)){
            Message.redirect(req, res, '/autenticacao', 'Use uma conta de recepicionista ou de administrador para acessar essa página.')
            return;
        }
        if (req.body.pet.name === '' || req.body.pet.species === '' || req.body.pet.year_of_birth === '' || req.body.pet.clientId === '') {
            res.json({
                message: 'Faltou algum dado para completar a operação.'
            });
            return;
        }
        const pet = await Pets.create({
            name: req.body.pet.name,
            species: req.body.pet.species,
            year_of_birth: req.body.pet.year_of_birth,
            ClientId: req.body.pet.clientId
        });
        res.json({ message: 'Pet adicionado com sucesso.', pet: pet })
    }

    static async removePet(req, res) {
        if(!req.session.userid){
            res.redirect('/autenticacao');
            return
        }
        if(!RolesController.isAdmin(req.session.userrole) && !RolesController.isReceptionist(req.session.userrole)){
            Message.redirect(req, res, '/autenticacao', 'Use uma conta de recepicionista ou de administrador para acessar essa página.')
            return;
        }
        await Pets.destroy({
            where: {
                id: req.body.petId,
                ClientId: req.body.clientId
            }
        });
        res.json({ message: 'Pet removido com sucesso.' })
    }

    static async listOfPets(clientId) {
        let list = [];
        const listOfPets = await Pets.findAll({
            where: {
                ClientId: clientId
            }
        });
        listOfPets.forEach((e) => {
            list.push({
                name: e.dataValues.name,
                species: e.dataValues.species,
                age: (new Date()).getFullYear() - e.dataValues.year_of_birth.getFullYear(),
                id: e.dataValues.id,
                clientId: e.dataValues.ClientId
            });
        })
        return list;
    }

    static async infoPetPost(req, res) {
        if(!req.session.userid){
            res.redirect('/autenticacao');
            return
        }
        if(!RolesController.isAdmin(req.session.userrole) && !RolesController.isReceptionist(req.session.userrole)){
            Message.redirect(req, res, '/autenticacao', 'Use uma conta de recepicionista ou de administrador para acessar essa página.')
            return;
        }
        const pet = await Pets.findOne({
            where: {
                id: req.body.petId,
                ClientId: req.body.clientId
            }
        });
        res.json({ pet: pet });
    }

    static async savePet(req, res) {
        if(!req.session.userid){
            res.redirect('/autenticacao');
            return
        }
        if(!RolesController.isAdmin(req.session.userrole) && !RolesController.isReceptionist(req.session.userrole)){
            Message.redirect(req, res, '/autenticacao', 'Use uma conta de recepicionista ou de administrador para acessar essa página.')
            return;
        }
        if (req.body.pet.name === '' || req.body.pet.species === '' || req.body.pet.year_of_birth === '' || req.body.pet.clientId === '') {
            res.json({
                message: 'Faltou algum dado para completar a operação.'
            });
            return;
        }
        await Pets.update(
            {
                name: req.body.pet.name,
                species: req.body.pet.species,
                year_of_birth: req.body.pet.year_of_birth
            },
            {
                where: {
                    ClientId: req.body.pet.clientId,
                    id: req.body.pet.id
                }
            }
        );
        const pet = {
            name: req.body.pet.name,
            species: req.body.pet.species,
            year_of_birth: req.body.pet.year_of_birth,
            ClientId: req.body.pet.clientId,
            id: req.body.pet.id
        }
        res.json({ message: 'Pet atualizado com sucesso.', pet: pet})
    }
}

module.exports = PetsController;