const express = require('express'); 
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const app = express();
const AllRoutes = require('./routes/AllRoutes');
const bd = require('./controller/conn');

dotenv.config({path: '.env'});
const port = process.env.PORT;

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/', AllRoutes);


bd
    .sync({ force: false })
    .then(()=>{
        app.listen(port);
        console.log('Servidor iníciado...');
    })
    .catch((err)=>{
        console.log(err);
    });