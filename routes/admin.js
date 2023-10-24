const express = require('express');
const router = express.Router();
const UserController = require('../controller/UsersController');

router.get('/', UserController.login);

router.post('/', UserController.loginPost);

router.get('/remover_autenticacao', UserController.logout);

router.get('/usuario', UserController.user);

// a fazer:
// /novo_usuario
// /usuario
// /painel
// /funcionalidades


module.exports = router;