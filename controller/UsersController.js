const Users = require('../models/Users');

class UserController {
    static login(req, res) {
        try {
            if (req.session.userid) {
                res.redirect('/administracao/painel');
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
                req.flash('message', 'Usuário não cadastrado');
                res.render('login', { 'title': 'Autenticação' });
                return
            }
            if (!password === user.password) {
                req.flash('message', 'Senha invalida');
                res.render('login', { 'title': 'Autenticação' });
                return
            }
            req.session.userid = user.id;
            req.flash('message', 'Sejá bem vindo(a) ' + user.full_name + '.');
            req.session.save(() => {
                res.redirect('/administracao/painel');
            })
        } catch (error) {
            console.log(error);
        }
    }

    static logout(req, res) {
        try {
            console.log('remover_autenticacao');
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
        res.render('addUser', { 'title': 'Adicionar novo usuário' });
    }

    static async addUserPost(req, res) {
        try {
            const { full_name, cpf, email, password, role } = req.body;
            await Users.create({
                full_name: full_name,
                cpf: cpf,
                email: email,
                password: password,
                role: role
            })
            res.redirect('/administracao/addUser');
        } catch (error) {
            console.log(error)
        }
    }

    static async updateUser(req, res) {
        try {
            const { full_name, cpf, email, password } = req.body;

            const result = await Users.update(
                {
                    full_name: full_name,
                    email: email,
                    cpf: cpf,
                    password: password
                },
                { where: { id: req.session.userid } }
            );
            res.redirect('/administracao/usuario');
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