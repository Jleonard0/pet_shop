const ServicesController = require('./ServicesController');

class HomeController {
    static async render(req, res){
        res.render(
            'home',
            {
                'title':'Início',
                'tabelas_de_servicos': await ServicesController.getTable()
            }
        );
    }
};

module.exports = HomeController;