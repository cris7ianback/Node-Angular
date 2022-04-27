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
router.get('/logout', controllerAuth.LogOut);

//rutas Personal
router.get ('/listarPersonal', middlewareController.isAuthenticated,  controllerPersonal.listarPersonal);
router.post('/registrarPersonal', middlewareController.isAuthenticated, middlewareController.isAuthRoleEditorAdmin, controllerPersonal.registrarPersonal);
router.get ('/eliminarPersonal/:id_persona', middlewareController.isAuthenticated, middlewareController.isAuthRoleEditorAdmin, controllerPersonal.eliminarPersonal);
router.put ('/modificarPersonal/:id_persona', middlewareController.isAuthenticated, middlewareController.isAuthRoleEditorAdmin , controllerPersonal.modificarPersonal);
router.get ('/listarPersonalId/:id_persona', middlewareController.isAuthenticated, controllerPersonal.listarPersonalId);




router.get('/isAdmin', middlewareController.isAuthenticated, middlewareController.isRoleAdmin );
router.get ('/isEditOrAdmin', middlewareController.isAuthenticated, middlewareController.isRoleEditorAdmin)
module.exports = router;



