const Users = require('../models/Users');
const CPF = require('cpf');

function __render_with_message(req, res, page, variables_of_page, message) {
    req.flash('message', message);
    res.render(page, variables_of_page);
}

function __redirect_with_message(req, res, url, message) {
    req.flash('message', message);
    res.redirect(url);
}

class UserController {
    static login(req, res) {
        try {
            if (req.session.userid) {
                __redirect_with_message(req, res, '/administracao/painel', 'Você já esta autenticado');
                return
            }
            res.render('login', { 'title': 'Autenticação' });
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
                __render_with_message(req, res, 'login', { 'title': 'Autenticação' }, 'Usuário não cadastrado');
                return
            }
            if (!password === user.password) {
                __render_with_message(req, res, 'login', { 'title': 'Autenticação' }, 'Senha invalida');
                return
            }
            req.session.userid = user.id;
            req.session.userrole = user.role;
            req.session.save(() => {
                __redirect_with_message(req, res, '/administracao/painel', 'Sejá bem vindo(a) ' + user.full_name + '.');
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

    static addUser(req, res) {
        if (req.session.userid && req.session.userrole === 'adiministrador') {
            res.render('addUser', { 'title': 'Adicionar novo funcionário' });
            return
        }
        res.redirect('/administracao');
    }

    static async addUserPost(req, res) {
        try {
            if (req.session.userid && req.session.userrole === 'adiministrador') {
                let { full_name, cpf, email, password, role } = req.body;
                if (!CPF.isValid(cpf)) {
                    __render_with_message(req, res, 'addUser', { 'title': 'Adicionar novo funcionário' }, 'CPF invalido.');
                    return;
                }
                cpf = CPF.format(cpf);
                const user_test_cpf_exists = await Users.findOne({ where: { cpf: cpf } });;
                const user_test_email_exists = await Users.findOne({ where: { email: email } });;
                if (user_test_cpf_exists || user_test_email_exists) {
                    __render_with_message(req, res, 'addUser', { 'title': 'Adicionar novo funcionário' }, 'Usuário já cadastrado.');
                    return;
                }
                const new_user = await Users.create({
                    full_name: full_name,
                    cpf: cpf,
                    email: email,
                    password: password,
                    role: role
                });
                new_user.save();
                __redirect_with_message(req, res, '/administracao/adicionar_funcionario', 'Funcionario adicionado com sucesso.')
                return
            }
            res.redirect('/administracao');
        } catch (error) {
            console.log(error)
        }
    }

    static async userPost(req, res) {
        try {
            let { full_name, cpf, email, password } = req.body;
            if (!CPF.isValid(cpf)) {
                const user = await Users.findOne({ where: { id: req.session.userid } });
                __render_with_message(req, res, 'usuario', {
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
            __redirect_with_message(req, res, '/administracao/usuario', 'Alteração efetuada com sucesso.')
        } catch (error) {
            console.log(error);
        }
    }

    static async removeUser(req, res) {
        try {
            if (req.session.userid && req.session.userrole === 'adiministrador') {
                const allUsers = await Users.findAll();
                var allUsersSimplified = [];
                allUsers.forEach((id) => {
                    allUsersSimplified.push(
                        {
                            id: id.id,
                            full_name: id.full_name
                        }
                    );

                });
                res.render('removeUser', { 'title': 'Remover funcionário', 'allUsers': allUsersSimplified });
                return
            }
            res.redirect('/administracao');
        } catch (error) {
            console.log(error);
        }
    }

    static async removeUserPost(req, res) {
        try {
            await Users.destroy({
                where: {
                    id: req.body.select_employee
                },
            });
            __redirect_with_message(req, res, '/administracao/remover_funcionario', 'Funcionario removido com sucesso.');
        } catch (error) {
            console.log(error);
        }
    }

    static async __addAdmin() {
        try {
            await Users.findOrCreate({
                where: { id: 1 },
                defaults: {
                    full_name: 'Nome do adiministrador',
                    cpf: '000.000.000-00',
                    email: 'admin@email.com',
                    password: 'admin',
                    role: 'adiministrador'
                }
            });
        } catch (error) {
            console.log(error)
        }
    }
}

UserController.__addAdmin();

module.exports = UserController;