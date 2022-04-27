const express = require('express');
const path = require('path');
const Exphbs = require('express-handlebars');
const Handlebars =require('handlebars');
const methodOverride = require('method-override');
const expressSesion= require('express-session');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const flash= require('connect-flash');
//const { join } = require('path');
const eclass = require('./Educados'); // requiero la instancia
const Educados = require('./Educados');

const app = express();


app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

app.engine('hbs', Exphbs.engine({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partial'),
    extname:'.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
}));

app.set('view engine', '.hbs');

//middlewares
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(expressSesion({
    secret: 'mysecretAPP',
    resave: true,
    saveUninitialized: true,
}));



app.use(flash());


//Global Variables
app.use((req, res, next)=>{
    res.locals.succes_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.list=req.flash('list');
    next();
});


//Routes
app.use(require('./routes/index'));
app.use(require('./routes/Casa'));
app.use(require('./routes/Educado'));
app.use(require('./routes/login'));

//Statick Files
app.use(express.static(path.join(__dirname,'public')));


Educados.prueba;
// init server
app.listen(app.get('port'), () => {
    console.log('Servidor escuchando en el puerto', app.get('port'));
});

