const express = require('express'); 
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const app = express();
const AllRoutes = require('./routes/AllRoutes');

dotenv.config({path: '.env'});
const port = process.env.PORT;

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(
    express.static('public'),
    express.urlencoded({
        extended: true
    }),
    express.json()
);

app.use('/', AllRoutes);

app.listen(port, () => {
    console.log('Servidor iníciado...');
});