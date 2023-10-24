const express = require('express');
const router = express.Router();
const UserController = require('../controller/UsersController');

router.get('/', UserController.login);

router.post('/', UserController.loginPost);

router.get('/remover_autenticacao', UserController.logout);

router.get('/usuario', UserController.user);

router.post('/atualizar_usuario', UserController.userPost);

router.get('/adicionar_funcionario', UserController.addUser);

router.post('/adicionar_funcionario', UserController.addUserPost);

// a fazer:
// /novo_usuario
// /painel
// /funcionalidades


module.exports = router;