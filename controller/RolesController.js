const Roles = require('../models/Roles');
const UtilsRoles = require('./Utils').Roles;

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
        return userrole === UtilsRoles.admin.id;
    }

    static isReceptionist(userrole) {
        return userrole === UtilsRoles.receptionist.id;
    }

    static isPet_care(userrole) {
        return userrole === UtilsRoles.pet_care.id;
    }

    static isVeterinarian(userrole) {
        return userrole === UtilsRoles.veterinarian.id;
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
            await __addRole(UtilsRoles.admin.id, UtilsRoles.admin.name);
            await __addRole(UtilsRoles.receptionist.id, UtilsRoles.receptionist.name);
            await __addRole(UtilsRoles.pet_care.id, UtilsRoles.pet_care.name);
            await __addRole(UtilsRoles.veterinarian.id, UtilsRoles.veterinarian.name);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = RolesController;