const { application } = require("express");
const express = require("express");
const conexion = require("../config/conexion");
const router = express.Router();
const controllerPersonal = require("../controllers/personal.controller");


router.use(function (res, req, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

//rutas para metodos 
router.post('/login', controllerPersonal.login);
router.get ('/logout', controllerPersonal.LogOut);

//rutas Personal
router.get ('/listarPersonal', controllerPersonal.listarPersonal);
router.post('/registrarPersonal', controllerPersonal.registrarPersonal);
router.get ('/eliminarPersonal/:id_persona', controllerPersonal.eliminarPersonal );
router.put ('/modificarPersonal/:id_persona', controllerPersonal.modificarPersonal);
router.get ('/listarPersonalId/:id_persona', controllerPersonal.listarPersonalId);

module.exports = router;



