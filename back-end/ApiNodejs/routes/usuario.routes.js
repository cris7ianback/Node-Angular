const express = require("express");
const router = express.Router();
const controllerUsuario = require("../controllers/usuario.controller");
const middlewareController = require("../middleware/auth.middleware")


router.use(function (res, req, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

//rutas Usuarios
router.get ('/listarUsuarios',              middlewareController.AutentificacionUsuario, controllerUsuario.listarUsuarios   );
router.post('/registrarUsuario',            middlewareController.AutentificacionUsuario, middlewareController.rolAdmin, controllerUsuario.registrarUsuario );
router.get ('/eliminarUsuario/:id_user',    middlewareController.AutentificacionUsuario, controllerUsuario.eliminarUsuario  );
router.put ('/modificarUsuario/:id_user',   middlewareController.AutentificacionUsuario, controllerUsuario.modificarUsuario );
router.get ('/listarUsuariosId/:id_user',   middlewareController.AutentificacionUsuario, middlewareController.rolAdmin, controllerUsuario.listarUsuariosId );

router.get('/isAdmiUn', middlewareController.AutentificacionUsuario, middlewareController.rolAdmin );

module.exports = router;



