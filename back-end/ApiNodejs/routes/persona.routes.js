const express = require("express");
const conexion = require("../config/conexion");
const router = express.Router();
const controller = require("../controllers/personal.controller");



// rutas para vistas
router.get('/', controller.AutentificacionUsuario, controller.listarPersonal, (req, res) => { res.render('index', { user: req.user }); });
router.get('/login', (req, res) => { res.render('login', { alert: false }); });
router.get('/registrarUsuario', controller.auntentificadorRol, (req, res) => { res.render('register'); });
router.get('/registrarPersonal', controller.auntentificadorRol, (req, res) => { res.render('registrarPersonal'); });
router.get('/actualizarPersonal', (req, res) => { res.render('actualizarPersonal', { alert: false }); });


//rutas para metodos 
router.post('/login', controller.login);
router.get('/logout', controller.LogOut);


//rutas Usuarios
router.get('/listarUsuarios', controller.listarUsuarios);
router.post('/registrarUsuario', controller.registrarUsuario);
router.post('/eliminarUsuario/:id_user', controller.eliminarUsuario)

//rutas Personal
router.get('/listarPersonal', controller.listarPersonal);
router.post('/registrarPersonal', controller.registrarPersonal);
router.post('/actualizarPersonal/:id_persona', controller.actualizarPersonal);
router.post('/eliminarPersonal/:id_persona', controller.eliminarPersonal);
router.get('/listarPersonalId/:id_persona', controller.auntentificadorRol, controller.listarPersonalId);



module.exports = router;
