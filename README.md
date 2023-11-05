Para iníciar o projeto:

---    

Instalando modulos:
Para instalar os modulos necessários execute o comando,
    
    npm i

---    

Configuração inicial:Este projeto utiliza o arquivo de configuração ".env" na raiz do projeto, com essa estrutura:

    PORT=3000
    DATABASE_HOST=Ip_do_seu_banco_de_dados
    DATABASE_PORT=Porta_do_seu_banco_de_dados
    DATABASE_USER=Seu_usuario
    DATABASE_PASSWORD=Sua_senha
    DATABASE=petshop
    SESSION_NAME=Nome_da_sua_secao
    SESSION_SECRET=Sua_senha

---

Atualizar o banco de dados para o padrão inicial se não for a sua primeira execulção, modifique no arquivo "app.js" na linha ".sync({ force: false })" para force para "true", salve o arquivo execulte o projeto, troque novamente o valor agora para "false".

---

Iniciar projeto:

    npm run dev
