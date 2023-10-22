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

---

Iniciando banco de dados:

    create database petshop;
    use petshop;
    create table servicos(id int not null auto_increment, nome varchar(255)
not null, valor float not null, primary key(id));

--- 

Iniciar projeto:

    npm run dev
