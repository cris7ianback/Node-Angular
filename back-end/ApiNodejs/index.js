const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config({ path: './env/.env' });
const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

const cors = require('cors');

const app = express();
app.use(session({
  secret: 'cris7ianback',
  resave: false,
  saveUninitialized: false,
  //cookie: { secure : true }
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

require('./config/conexion');
const bodyParser = require('body-parser');

// const port = (process.env.port || 3000);


// // setear motor de plantillas
app.set('view engine', 'ejs');

const corsOptions = {
  origin: "http://localhost:4200"
};


//Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
//app.use(express.urlencoded({extended:false}));

//conexión que permite enviar datos ( se utilizo con POSTMAN)
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(bodyParser.json());


//seteamos el motor de plantillas
app.set('view engine', 'ejs');

//seteamos la carpeta public para archivos estáticos
app.use(express.static('public'));

//para procesar datos enviados desde forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//para poder trabajar con las cookies
app.use(cookieParser());



//llamar al router
app.use('/', require('./routes/persona.routes'));
app.use('/', require('./routes/usuario.routes'));

//Para eliminar la cache 
app.use(function (req, res, next) {
  if (!req.user)
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});


app.listen(3000, () => {
  console.log('SERVER UP running in http://localhost:3000');
});

app.use(function(req,res,next){
  res.header("Access-control-Allow-Origin", "*");
  res.header("Access-control-Allow-headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

 