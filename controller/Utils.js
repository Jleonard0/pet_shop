const RolesDefault = Object.freeze({
    admin:{
        id:10,
        name:'administrador'
    },
    receptionist:{
        id:1,
        name:'recepcionista'
    },
    pet_care:{
        id:2,
        name:'cuidador'
    },
    veterinarian:{
        id:3,
        name:'veterinario'
    }
});

const Titles = Object.freeze({
    login: {
        name_page:'login',
        title: 'Autenticação'
    },
    addUser: {
        name_page: 'addUser',
        title:'Adicionar novo funcionário'
    },
    removeUser: {
        name_page: 'removeUser',
        title: 'Remover funcionário'
    },
    functionalities: {
        name_page: 'functionalities',
        title: 'Funcionalidades'
    },
    panel: {
        name_page: 'panel',
        title: 'Painel'
    }
});

class Message {
    static render(req, res, page, variables_of_page, message) {
        req.flash('message', message);
        res.render(page, variables_of_page);
    }
    
    static redirect(req, res, url, message) {
        req.flash('message', message);
        res.redirect(url);
    }
}

const Utils = Object.freeze({
    Roles: RolesDefault,
    Message: Message,
    Titles: Titles
});

module.exports = Utils;