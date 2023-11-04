const express = require('express');
const router = express.Router();
const ServicesController = require('../controller/ServicesController');
const UserController = require('../controller/UsersController');

router.get('/listar_funcionalidades', ServicesController.functionalities);

router.get('/adicionar_servico', ServicesController.addFunctionality);

router.post('/adicionar_servico', ServicesController.addFunctionalityPost);

router.get('/remover_servico', ServicesController.removeFunctionality);

router.post('/remover_servico', ServicesController.removeFunctionalityPost);

router.get('/painel', ServicesController.panel);

router.post('/painel', ServicesController.panelPost);

router.get('/ver_perfil', UserController.user);

router.post('/atualizar_perfil', UserController.userPost);

router.get('/adicionar_funcionario', UserController.addUser);

router.post('/adicionar_funcionario', UserController.addUserPost);

router.get('/remover_funcionario', UserController.removeUser);

router.post('/remover_funcionario', UserController.removeUserPost);

module.exports = router;