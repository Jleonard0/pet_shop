const express = require('express'); 
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const app = express();
const AllRoutes = require('./routes/AllRoutes');
const bd = require('./controller/conn');
const flash = require('express-flash');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

dotenv.config({path: '.env'});
const port = process.env.PORT;
const hbs = exphbs.create({
    partialsDir: ['views/partials']
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.use(
    session({
        name: process.env.SESSION_NAME,
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: ()=>{},
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 86400000,
            expires: new Date(Date.now() + 86400000),
            httpOnly: true
        }
    })
);
app.use(flash());
app.use((req, res, next)=>{
    console.log(req.session.userid);
    if(req.session.userid){
        res.locals.session = req.session;
    }
    next();
});
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