const Users = require('../models/Users');
const CPF = require('cpf');
const RolesController = require('./RolesController');
const {Message, InfoPage, Roles, AlertMenssages} = require('./Utils');

class UserController {
    static login(req, res) {
        try {
            if (req.session.userid) {
                Message.redirect(req, res, '/funcionalidade/painel', AlertMenssages.youAreAlreadyAuthenticated);
                return
            }
            res.render(InfoPage.login.name_page, { 'title': InfoPage.login.title });
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
                Message.render(req, res, InfoPage.login.name_page, { 'title': InfoPage.login.title }, AlertMenssages.userNotRegistered);
                return
            }
            if (password !== user.password) {
                Message.render(req, res, InfoPage.login.name_page, { 'title': InfoPage.login.title }, AlertMenssages.invalidPassword);
                return
            }
            req.session.userid = user.id;
            req.session.userrole = user.RoleId;
            req.session.save(() => {
                Message.redirect(req, res, '/funcionalidade/painel', AlertMenssages.welcome + user.full_name + '.');
            })
        } catch (error) {
            console.log(error);
        }
    }

    static logout(req, res) {
        try {
            req.session.destroy();
            res.redirect('/autenticacao');
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
            res.redirect('/autenticacao');
        } catch (error) {
            console.log(error)
        }
    }

    static async addUser(req, res) {
        if (RolesController.isAdmin(req.session.userrole)) {
            res.render(InfoPage.addUser.name_page, { 'title': InfoPage.addUser.title, 'allRoles': await RolesController.allRoles() });
            return
        }
        res.redirect('/autenticacao');
    }

    static async addUserPost(req, res) {
        try {
            if (!RolesController.isAdmin(req.session.userrole)) {
                res.redirect('/autenticacao');
                return
            }
            let { full_name, cpf, email, password, RoleId } = req.body;
            if (!CPF.isValid(cpf)) {
                Message.render(req, res, InfoPage.addUser.name_page, { 'title': InfoPage.addUser.title }, AlertMenssages.invalidCPF);
                return;
            }
            cpf = CPF.format(cpf);
            const user_test_cpf_exists = await Users.findOne({ where: { cpf: cpf } });;
            const user_test_email_exists = await Users.findOne({ where: { email: email } });;
            if (user_test_cpf_exists || user_test_email_exists) {
                Message.render(req, res, InfoPage.addUser.name_page, { 'title': InfoPage.addUser.title }, AlertMenssages.userAlreadyRegistered);
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
            Message.redirect(req, res, '/funcionalidade/adicionar_funcionario', AlertMenssages.employeeAddedSuccessfully)
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
                Message.render(req, res, 'usuario', {
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
            Message.redirect(req, res, '/funcionalidade/ver_perfil', AlertMenssages.changeMadeSuccessfully)
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
                res.render(InfoPage.removeUser.name_page, { 'title': InfoPage.removeUser.title, 'allUsers': allUsersSimplified });
                return
            }
            res.redirect('/autenticacao');
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
                Message.redirect(req, res, '/funcionalidade/remover_funcionario', AlertMenssages.employeeRemovedSuccessfully);
            }
            Message.redirect(req, res, '/funcionalidade/remover_funcionario', AlertMenssages.youTriedRemoveYourAccount);
        } catch (error) {
            console.log(error);
        }
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
                    role: 'administrador',
                    RoleId: Roles.admin.id
                }
            });
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = UserController;