const express = require('express');
const router = express.Router();
const UserController = require('../controller/UsersController');
const ServicesController = require('../controller/ServicesController');

router.get('/', UserController.login);

router.post('/', UserController.loginPost);

router.get('/remover_autenticacao', UserController.logout);

router.get('/usuario', UserController.user);

router.post('/atualizar_usuario', UserController.userPost);

router.get('/adicionar_funcionario', UserController.addUser);

router.post('/adicionar_funcionario', UserController.addUserPost);

router.get('/remover_funcionario', UserController.removeUser);

router.post('/remover_funcionario', UserController.removeUserPost);

router.get('/painel', UserController.panel);

router.post('/painel', UserController.panelPost);

router.get('/funcionalidades', UserController.functionalities);

router.get('/adicionar_servico', ServicesController.addFunctionality);

router.post('/adicionar_servico', ServicesController.addFunctionalityPost);

router.get('/remover_servico', ServicesController.removeFunctionality);

router.post('/remover_servico', ServicesController.removeFunctionalityPost);

module.exports = router;