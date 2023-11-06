const RolesDefault = Object.freeze({
    admin: {
        id: 10,
        name: 'administrador'
    },
    receptionist: {
        id: 1,
        name: 'recepcionista'
    },
    pet_care: {
        id: 2,
        name: 'cuidador'
    },
    veterinarian: {
        id: 3,
        name: 'veterinario'
    }
});

const Functionalities = Object.freeze({
    functionalitiesBaseUrl: '/funcionalidade',
    listOfFunctionalities: [
        {
            title: 'Painel',
            description: 'É um painel com as informações mais relevantes para seu cargo.',
            url: 'painel',
        },
        {
            title: 'Seu Perfil',
            description: 'Contem suas informações e onde você pode atualizalas',
            url: 'ver_perfil',
        }
    ],
    listOfFunctionalitiesOfAdmin:[
        {
            title: 'Adicionar funcionario',
            description: 'Adiciona um novo funcionario a sua empresa.',
            url: 'adicionar_funcionario'
        },
        {
            title: 'Adicionar serviço',
            description: 'Adiciona um novo serviço a sua empresa.',
            url: 'adicionar_servico'
        },
        {
            title: 'Remover funcionario',
            description: 'Remove um funcionario da sua empresa.',
            url: 'remover_funcionario'
        },
        {
            title: 'Remover serviço',
            description: 'Remove um serviço da sua empresa.',
            url: 'remover_servico'
        }
    ],
    listOfFunctionalitiesOfReceptionist: [
        {
            title: 'Adicionar cliente',
            description: 'Adiciona um novo cliente.',
            url: 'adicionar_cliente'
        },
        {
            title: 'Remover cliente',
            description: 'Remove um cliente.',
            url: 'remover_cliente'
        }
    ]
});

const InfoPage = Object.freeze({
    login: {
        name_page: 'login',
        title: 'Autenticação'
    },
    addUser: {
        name_page: 'addUser',
        title: 'Adicionar novo funcionário'
    },
    removeUser: {
        name_page: 'removeUser',
        title: 'Remover funcionário'
    },
    functionalities: {
        name_page: 'functionalities',
        title: 'Funcionalidades',
    },
    panel: {
        name_page: 'panel',
        title: 'Painel'
    },
    addService: {
        name_page: 'addService',
        title: 'Adicionar novo serviço'
    },
    removeService: {
        name_page: 'removeService',
        title: 'Remover serviço'
    },
    addClient: {
        name_page: 'addClient',
        title: 'Adicionar cliente'
    },
    removeClient: {
        name_page: 'removeClient',
        title: 'Remover cliente'
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
    InfoPage: InfoPage,
    Functionalities: Functionalities
});

module.exports = Utils;