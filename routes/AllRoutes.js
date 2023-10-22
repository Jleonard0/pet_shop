const express = require('express');
const router = express.Router();
const HomeController = require('../controller/HomeController');
const admin_routes = require('./admin');

router.use('/administracao', admin_routes);

router.get('/', HomeController.render)

module.exports = router;