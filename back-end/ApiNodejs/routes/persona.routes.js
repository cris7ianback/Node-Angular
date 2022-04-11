const express = require("express");
const router = express.Router();
const controllerPersonal = require("../controllers/personal.controller");
const controllerAuth = require("../controllers/auth.controller");
const middlewareController = require("../middleware/auth.middleware")


router.use(function (res, req, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

//rutas para metodos 
router.post('/login', controllerAuth.login);
router.get('/logout', controllerPersonal.LogOut);

//rutas Personal
router.get ('/listarPersonal', middlewareController.AutentificacionUsuario,  controllerPersonal.listarPersonal);
router.post('/registrarPersonal', middlewareController.AutentificacionUsuario, controllerPersonal.registrarPersonal);
router.get ('/eliminarPersonal/:id_persona', middlewareController.AutentificacionUsuario, middlewareController.rolAdmin, controllerPersonal.eliminarPersonal);
router.put ('/modificarPersonal/:id_persona', middlewareController.AutentificacionUsuario, controllerPersonal.modificarPersonal);
router.get ('/listarPersonalId/:id_persona', middlewareController.AutentificacionUsuario, controllerPersonal.listarPersonalId);



router.get('/isAdmin', middlewareController.AutentificacionUsuario, middlewareController.rolAdmin );

module.exports = router;



