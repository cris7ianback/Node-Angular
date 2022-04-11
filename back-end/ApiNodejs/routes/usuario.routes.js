const { application } = require("express");
const express = require("express");
const conexion = require("../config/conexion");
const router = express.Router();
const controllerUsuario = require("../controllers/usuario.controller");


router.use(function (res, req, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

//rutas Usuarios
router.get ('/listarUsuarios', controllerUsuario.listarUsuarios);
router.post('/registrarUsuario', controllerUsuario.registrarUsuario);
router.get ('/eliminarUsuario/:id_user', controllerUsuario.eliminarUsuario);
router.put ('/modificarUsuario/:id_user', controllerUsuario.modificarUsuario);
router.get ('/listarUsuariosId/:id_user', controllerUsuario.listarUsuariosId);


module.exports = router;



