const { application } = require("express");
const express = require("express");
const conexion = require("../config/conexion");
const router = express.Router();
const controllerUsuario = require("../controllers/usuario.controller");
const authMiddleware = require("../middleware/auth.middleware");
const middlewareController = require("../middleware/auth.middleware")


router.use(function (res, req, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

//rutas Usuarios
router.get('/listarUsuarios', middlewareController.isAuthenticated, controllerUsuario.listarUsuarios);
router.post('/registrarUsuario', middlewareController.isAuthenticated, middlewareController.isAuthRoleAdmin, controllerUsuario.registrarUsuario);
router.get('/eliminarUsuario/:id_user', middlewareController.isAuthenticated, middlewareController.isAuthRoleEditorAdmin, controllerUsuario.eliminarUsuario);
router.put('/modificarUsuario/:id_user', middlewareController.isAuthenticated, middlewareController.isAuthRoleEditorAdmin, controllerUsuario.modificarUsuario);
router.get('/listarUsuariosId/:id_user', middlewareController.isAuthenticated, controllerUsuario.listarUsuariosId);

//router.get('/isAdmin', middlewareController.isAuthenticated, middlewareController.isRoleAdmin );
//router.get ('/isEditOrAdmin', middlewareController.isAuthenticated, middlewareController.isAuthRoleEditorAdmin)
module.exports = router;



