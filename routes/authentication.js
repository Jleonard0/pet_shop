const express = require('express');
const router = express.Router();
const UserController = require('../controller/UsersController');

router.get('/', UserController.login);

router.post('/', UserController.loginPost);

router.get('/remover', UserController.logout);

module.exports = router;