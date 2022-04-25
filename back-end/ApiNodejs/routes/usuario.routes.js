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

router.post('/cambioPass', (req, res) => {
    const user = req.body;
    const email = res.locals.email;
    var query = "SELECT * FROM users WHERE email =? and password =?";
    conexion.query(query, [email, user.oldPassword], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                return res.status(400).json({ message: "Pass antigua incorrecta" })
            }
            else if (results[0].password == user.oldPassword) {
                query = "UPDATE user set password =? WHERE email =?";
                conexion.query(query, [user.newPassword, email], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "Password actualizada!!" })
                    } else {
                        return res.status(500).json(err)
                    }
                })
            } else {
                return res.status(400).json({ message: "algo fallo favor reintente" });
            }

        } else {
            return res.status(500).json(err);
        }

    })
})
//router.get('/isAdmin', middlewareController.isAuthenticated, middlewareController.isRoleAdmin );
//router.get ('/isEditOrAdmin', middlewareController.isAuthenticated, middlewareController.isAuthRoleEditorAdmin)
module.exports = router;



