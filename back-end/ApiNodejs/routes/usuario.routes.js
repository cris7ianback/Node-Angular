const { application } = require("express");
const express = require("express");
const conexion = require("../config/conexion");
const router = express.Router();
const controllerUsuario = require("../controllers/usuario.controller");
const authMiddleware = require("../middleware/auth.middleware");
const middlewareController = require("../middleware/auth.middleware");
const controllerAuth = require("../controllers/auth.controller");

const jwt = require ('jsonwebtoken');
const authController = require("../controllers/auth.controller");

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


router.post('/cambioPass', authController.authenticateToeken, (req, res) => {
    const user = req.body;
    const email = res.locals.email;
    console.log("user: " + user);
    console.log("user: " + email);
    var query = "SELECT * FROM users WHERE email =? and password =?";
    conexion.query(query, [email, user.oldPassword], (err, results) => {
        if (!err) {
            console.log("user: " + user.oldPass);
            console.log("Email a modificar: " + email);
            if (results.length <= 0) {
                return res.status(400).json({ message: "Pass antigua incorrecta" })
            }
            else if (results[0].password == user.oldPassword) {
                query = "UPDATE user set password =? WHERE email =?";
                conexion.query(query, [user.newPassword, email], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "Password actualizada!!" })
                    } else {

                        console.log("error aqí")
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

// router.post('/login', (req, res) => {
//     const user = req.body;
//     query = "SELECT * FROM users WHERE email=?";
//     conexion.query(query, [user.email], (err, results) => {
//         if (!err) {
//             if (results.length <= 0 || results[0].password != user.password) {
//                 return res.status(401).json({ message: "INCORRECT USERNAME OR PASSWORD" });
//             }
//             else if (results[0].status === 'false') {
//                 return res.status(401).json({ message: "WAIT for Admin Approval" });
//             }
//             else if (results[0].password == user.password) {
//                 const response = { email: results[0].email, role: results[0].role };
//                 const accessToken = jwt.sign(response, process.env.JWT_SECRETO)
//                 res.status(200).json({ token: accessToken });

//             } else {
//                 return res.status(401).json({ message: "error inesperado" });

//             }
//         } else {
//             return res.status(500).json(err);
//         }
//     })

// })
//router.get('/isAdmin', middlewareController.isAuthenticated, middlewareController.isRoleAdmin );
//router.get ('/isEditOrAdmin', middlewareController.isAuthenticated, middlewareController.isAuthRoleEditorAdmin)
module.exports = router;



