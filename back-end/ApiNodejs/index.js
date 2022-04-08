const express = require('express');

const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

//seteamos las variables de entorno
dotenv.config({ path: './env/.env' });

const app = express();


require('./config/conexion');
const bodyParser = require('body-parser');

// const port = (process.env.port || 3000);
const cors = require('cors');

// // setear motor de plantillas
app.set('view engine', 'ejs');

var corsOptions = {
  origin: "http://localhost:4200"
};

// Session Express
var sessionStore = new MySQLStore({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  mysql_port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
}
);

app.use(session({
  secret: process.env.EXP_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
 store: sessionStore,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

//Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
app.use(express.urlencoded({extended:false}));

//conexión que permite enviar datos ( se utilizo con POSTMAN)
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(bodyParser.json());

app.use(function (req, res, next) {
  if (!req.user)
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});


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


 