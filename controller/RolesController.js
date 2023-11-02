const Roles = require('../models/Roles');
const Utils = require('./Utils');

async function __addRole(id, name) {
    try {
        await Roles.findOrCreate({
            where: { id: id },
            defaults: {
                name: name
            }
        });   
    } catch (error) {
        console.log(error);
    }
}

class RolesController {
    static isAdmin(userrole) {
        return userrole === Utils.Roles.admin.id;
    }

    static isReceptionist(userrole) {
        return userrole === Utils.Roles.receptionist.id;
    }

    static isPet_care(userrole) {
        return userrole === Utils.Roles.pet_care.id;
    }

    static isVeterinarian(userrole) {
        return userrole === Utils.Roles.veterinarian.id;
    }

    static async allRoles() {
        try {
            var allRoles = [];
            const roles = await Roles.findAll();
            roles.forEach((role) => {
                allRoles.push(
                    {
                        id: role.id,
                        name: role.name
                    }
                );
            });
            return allRoles;
        } catch (error) {
            console.log(error);
        }
    }

    static async setDefault() {
        try {
            await __addRole(Utils.Roles.admin.id, Utils.Roles.admin.name);
            await __addRole(Utils.Roles.receptionist.id, Utils.Roles.receptionist.name);
            await __addRole(Utils.Roles.pet_care.id, Utils.Roles.pet_care.name);
            await __addRole(Utils.Roles.veterinarian.id, Utils.Roles.veterinarian.name);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = RolesController;