const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login', {'title':'Início'});
})

router.post('/', (req, res) => {
    res.render('login', {'title':'Entre na sua conta'});
})

module.exports = router;