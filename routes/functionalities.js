const express = require('express');
const router = express.Router();
const ServicesController = require('../controller/ServicesController');
const UserController = require('../controller/UsersController');
const Utils = require('../controller/Utils');

router.get('/listar_funcionalidades', ServicesController.functionalities);

router.get('/adicionar_servico', ServicesController.addService);

router.post('/adicionar_servico', ServicesController.addServicePost);

router.get('/remover_servico', ServicesController.removeService);

router.post('/remover_servico', ServicesController.removeServicePost);

router.get('/painel', ServicesController.panel);

router.post('/painel', ServicesController.panelPost);

router.get('/ver_perfil', UserController.user);

router.post('/atualizar_perfil', UserController.userPost);

router.get('/adicionar_funcionario', UserController.addUser);

router.post('/adicionar_funcionario', UserController.addUserPost);

router.get('/remover_funcionario', UserController.removeUser);

router.post('/remover_funcionario', UserController.removeUserPost);

module.exports = router;