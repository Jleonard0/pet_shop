const Roles = require('../models/Roles');

async function __addRole(id, name){
    await Roles.findOrCreate({
        where: { id: id },
        defaults: {
            name: name
        }
    });
}

class RolesController{
    static async allRoles(){
        var allRoles = [];
        const roles =  await Roles.findAll();
        roles.forEach((role) => {
            allRoles.push(
                {
                    id: role.id,
                    name: role.name
                }
            );
        });
        return allRoles;
    }

    static async setDefault(){
        await __addRole(10, 'administrador');
        await __addRole(1, 'recepcionista');
        await __addRole(2, 'cuidador');
        await __addRole(3, 'veterinario');
    }
}

module.exports = RolesController;