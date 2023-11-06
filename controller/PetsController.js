const { where } = require('sequelize');
const Pets = require('../models/Pets');

class PetsController{
    static async addPet(clientId, name, species, year_of_birth){
        const pet = await Pets.create({
            name: name,
            species: species,
            year_of_birth: year_of_birth,
            clientId: clientId
        });
        return pet;
    }
    static async removePet(clientId, name){
        await Pets.destroy({
            where: {
                name: name,
                clientId: clientId
            }
        });
    }
}

module.exports = PetsController;