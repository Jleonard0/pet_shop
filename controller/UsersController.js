const Users = require('../models/Users');

class UserController {
    static login(req, res) {
        if(req.session.userid){
            res.redirect('/administracao/painel');
            return
        }
        res.render('login', { 'title': 'Autenticação' });
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
        console.log('remover_autenticacao');
        req.session.destroy();
        req.flash('message', 'Você foi desconectado com sucesso.');
        res.redirect('/administracao');
    }

    static async user(req, res) {
        
    }

    static async __newUser(full_name, cpf, email, password, role) {

        await Users.create({
            full_name: full_name,
            cpf: cpf,
            email: email,
            password: password,
            role: role
        })
    }

    static addUser(req, res) {
        res.render('addUser', { 'title': 'Adicionar novo usuário' });
    }

    static addUserPost(req, res) {
        const { full_name, cpf, email, password, role } = req.body;
        this.__newUser(full_name, cpf, email, password, role)
        res.redirect('/administracao/addUser');
    }

    static async __addAdmin(){
        await Users.findOrCreate({
            where: {id: 1},
            defaults: {
                full_name: 'Nome do adiministrador',
                cpf: '000.000.000-00',
                email: 'admin@email.com',
                password: 'admin',
                role: 'adiministrador'
            }
        });
    }
}

UserController.__addAdmin();

module.exports = UserController;