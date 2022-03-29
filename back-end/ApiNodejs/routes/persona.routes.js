const { application } = require("express");
const express = require("express");
const conexion = require("../config/conexion");
const router = express.Router();
const controller = require("../controllers/personal.controller");


router.use(function (res, req, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

//rutas para metodos 
router.post('/login', controller.login);
router.get ('/logout', controller.LogOut);

//rutas Usuarios
router.get ('/listarUsuarios', controller.listarUsuarios);
router.post('/registrarUsuario', controller.registrarUsuario);
router.get ('/eliminarUsuario/:id_user', controller.eliminarUsuario);
router.put ('/modificarUsuario/:id_user', controller.modificarUsuario);
router.get ('/listarUsuariosId/:id_user', controller.listarUsuariosId);

//rutas Personal
router.get ('/listarPersonal', controller.listarPersonal);
router.post('/registrarPersonal', controller.registrarPersonal);
router.get ('/eliminarPersonal/:id_persona', controller.eliminarPersonal );
router.put ('/modificarPersonal/:id_persona', controller.modificarPersonal);
router.get ('/listarPersonalId/:id_persona', controller.listarPersonalId);



module.exports = router;



