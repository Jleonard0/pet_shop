const Services = require('../models/Services');

class HomeController {
    static async render(req, res){
        const tableServices = await Services.findAll();
        res.render('home', {'title':'Início','tabelas_de_servicos': tableServices})
    }
};

module.exports = HomeController;