const express = require('express');
const router = express.Router();
const HomeController = require('../controller/HomeController');
const authentication_routes = require('./authentication');
const functionalities_routes = require('./functionalities');
const { Functionalities } = require('../controller/Utils');

router.get('/', HomeController.render);

router.use('/autenticacao', authentication_routes);

router.use(Functionalities.functionalitiesBaseUrl, functionalities_routes);

module.exports = router;