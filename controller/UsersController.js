const Users = require('../models/Users');
const CPF = require('cpf');
const RolesController = require('./RolesController');
const Utils = require('./Utils');

class UserController {
    static login(req, res) {
        try {
            if (req.session.userid) {
                Utils.Message.redirect(req, res, '/administracao/painel', 'Você já esta autenticado');
                return
            }
            res.render(Utils.Titles.login.name_page, { 'title': Utils.Titles.login.title });
        } catch (error) {
            console.log(error)
        }
    }

    static async loginPost(req, res) {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({
                where: { email: email }
            });
            if (!user) {
                Utils.Message.render(req, res, Utils.Titles.login.name_page, { 'title': Utils.Titles.login.title }, 'Usuário não cadastrado');
                return
            }
            if (password !== user.password) {
                Utils.Message.render(req, res, Utils.Titles.login.name_page, { 'title': Utils.Titles.login.title }, 'Senha invalida');
                return
            }
            req.session.userid = user.id;
            req.session.userrole = user.RoleId;
            req.session.save(() => {
                Utils.Message.redirect(req, res, '/administracao/painel', 'Sejá bem vindo(a) ' + user.full_name + '.');
            })
        } catch (error) {
            console.log(error);
        }
    }

    static logout(req, res) {
        try {
            req.session.destroy();
            res.redirect('/administracao');
        } catch (error) {
            console.log(error)
        }
    }

    static async user(req, res) {
        try {
            if (req.session.userid) {
                const user = await Users.findOne({ where: { id: req.session.userid } });
                res.render('usuario', {
                    title: user.full_name,
                    full_name: user.full_name,
                    cpf: user.cpf,
                    email: user.email
                });
                return
            }
            res.redirect('/administracao');
        } catch (error) {
            console.log(error)
        }
    }

    static async addUser(req, res) {
        if (RolesController.isAdmin(req.session.userrole)) {
            res.render(Utils.Titles.addUser.name_page, { 'title': Utils.Titles.addUser.title, 'allRoles': await RolesController.allRoles() });
            return
        }
        res.redirect('/administracao');
    }

    static async addUserPost(req, res) {
        try {
            if (!RolesController.isAdmin(req.session.userrole)) {
                res.redirect('/administracao');
                return
            }
            let { full_name, cpf, email, password, RoleId } = req.body;
            if (!CPF.isValid(cpf)) {
                Utils.Message.render(req, res, Utils.Titles.addUser.name_page, { 'title': Utils.Titles.addUser.title }, 'CPF invalido.');
                return;
            }
            cpf = CPF.format(cpf);
            const user_test_cpf_exists = await Users.findOne({ where: { cpf: cpf } });;
            const user_test_email_exists = await Users.findOne({ where: { email: email } });;
            if (user_test_cpf_exists || user_test_email_exists) {
                Utils.Message.render(req, res, Utils.Titles.addUser.name_page, { 'title': Utils.Titles.addUser.title }, 'Usuário já cadastrado.');
                return;
            }
            const new_user = await Users.create({
                full_name: full_name,
                cpf: cpf,
                email: email,
                password: password,
                RoleId: RoleId
            });
            new_user.save();
            Utils.Message.redirect(req, res, '/administracao/adicionar_funcionario', 'Funcionario adicionado com sucesso.')
            return
        } catch (error) {
            console.log(error)
        }
    }

    static async userPost(req, res) {
        try {
            let { full_name, cpf, email, password } = req.body;
            if (!CPF.isValid(cpf)) {
                const user = await Users.findOne({ where: { id: req.session.userid } });
                Utils.Message.render(req, res, 'usuario', {
                    title: user.full_name,
                    full_name: user.full_name,
                    cpf: user.cpf,
                    email: user.email
                }, 'CPF invalido.');
                return
            }
            cpf = CPF.format(cpf);
            const result = await Users.update(
                {
                    full_name: full_name,
                    email: email,
                    cpf: cpf,
                    password: password
                },
                { where: { id: req.session.userid } }
            );
            Utils.Message.redirect(req, res, '/administracao/usuario', 'Alteração efetuada com sucesso.')
        } catch (error) {
            console.log(error);
        }
    }

    static async removeUser(req, res) {
        try {
            if (RolesController.isAdmin(req.session.userrole)) {
                const allUsers = await Users.findAll();
                var allUsersSimplified = [];
                allUsers.forEach((id) => {
                    if (id.id !== req.session.userid) {
                        allUsersSimplified.push(
                            {
                                id: id.id,
                                full_name: id.full_name
                            }
                        );
                    }
                });
                res.render(Utils.Titles.removeUser.name_page, { 'title': Utils.Titles.removeUser.title, 'allUsers': allUsersSimplified });
                return
            }
            res.redirect('/administracao');
        } catch (error) {
            console.log(error);
        }
    }

    static async removeUserPost(req, res) {
        try {
            if (req.body.select_employee !== req.session.userid && RolesController.isAdmin(req.session.userrole)) {
                await Users.destroy({
                    where: {
                        id: req.body.select_employee
                    },
                });
                Utils.Message.redirect(req, res, '/administracao/remover_funcionario', 'Funcionario removido com sucesso.');
            }
            Utils.Message.redirect(req, res, '/administracao/remover_funcionario', 'Você tentou remover sua propria conta.');
        } catch (error) {
            console.log(error);
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

    static async setAdmin() {
        try {
            await Users.findOrCreate({
                where: { id: 1 },
                defaults: {
                    full_name: 'Nome do adiministrador',
                    cpf: '000.000.000-00',
                    email: 'admin@email.com',
                    password: 'admin',
                    role: 'adiministrador',
                    RoleId: Utils.Roles.admin.id
                }
            });
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = UserController;