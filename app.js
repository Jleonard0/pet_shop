const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql');
const dotenv = require('dotenv');
const app = express();

dotenv.config({path: '.env'});
const port = process.env.PORT;
let db = mysql.createConnection({
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

db.connect()

db.query('select 1+1 as solucao', function(err, rows, fields) {
    if (err) throw err;
    console.log('conectado ao banco de dados com sucesso');
});

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(
    express.static('public'),
    express.urlencoded({
        extended: true
    }),
    express.json()
);

app.get('/', (req, res)=>{
    db.query('select * from servicos', function(err, rows, fields) {
        if (err) throw err;
        res.render('home', {'title':'Início','tabelas_de_servicos': rows})
    });
})

app.listen(port, () => {
    console.log('Servidor iníciado...');
});