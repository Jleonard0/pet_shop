const Roles = require('../models/Roles');
const Utils = require('./Utils');

async function __addRole(id, name){
    await Roles.findOrCreate({
        where: { id: id },
        defaults: {
            name: name
        }
    });
}

class RolesController{
    static isAdmin(userrole){
        return userrole === Utils.Roles.admin.id;
    }

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
        await __addRole(Utils.Roles.admin.id, Utils.Roles.admin.name);
        await __addRole(Utils.Roles.receptionist.id, Utils.Roles.receptionist.name);
        await __addRole(Utils.Roles.pet_care.id, Utils.Roles.pet_care.name);
        await __addRole(Utils.Roles.veterinarian.id, Utils.Roles.veterinarian.name);
    }
}

module.exports = RolesController;