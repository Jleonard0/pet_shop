const express = require('express');
const router = express.Router();
const ServicesController = require('../controller/ServicesController');
const UserController = require('../controller/UsersController');
const Utils = require('../controller/Utils');
const ClientsController = require('../controller/ClientsController');
const PetsController = require('../controller/PetsController');

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

router.get('/adicionar_cliente', ClientsController.addClient);

router.post('/adicionar_cliente', ClientsController.addClientPost);

router.get('/remover_cliente', ClientsController.removeClient);

router.post('/remover_cliente', ClientsController.removeClientPost);

router.get('/informacoes_do_cliente/:clientId', ClientsController.infoCliente);

router.post('/informacoes_do_cliente/:clientId', ClientsController.infoClientPost);

router.post('/informacoes_do_pet/:clientId/:petId', PetsController.infoPetPost);
router.post('/autualizar_pet/:clientId/:petId', PetsController.savePet);
router.post('/remover_pet/:clientId/:petId', PetsController.removePet);
router.post('/adicionar_pet/:clientId', PetsController.addPet);

module.exports = router;