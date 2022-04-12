const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const conexion = require('../config/conexion');
const auth = require('../models/auth.model')


const controllerAuth = {};

module.exports = {

    // INICIO DE SESIÓN
    login: async (req, res) => {
        try {
            //limpiar Cookie & Token.
            res.clearCookie('jwt');
            res.clearCookie('connect.sid');
            const email = req.body.email;
            console.log('usuario:' + email)
            const password = req.body.password;

            conexion.query('SELECT * FROM users WHERE email =?',
                [email],
                async (error, results) => {
                    if (results.length == 0 || !(await bcryptjs.compare(password, results[0].password))) {
                        
                        res.status(401).send('No Autorizado');

                    } else {
                        req.session.id_user = results[0].id_user;
                        req.session.user = results[0].user;
                        req.session.email = results[0].email;
                        req.session.id_role = results[0].id_role;
                        rid_ss0 = req.session.id

                        console.log('session:'+ req.session.id,req.session.user,req.session.id_role)

                        const id_user = results[0].id_user;
                        const id_role = results[0].id_role;
                        const token = jwt.sign({ id: id_user, idr: rid_ss0, id_role: id_role }, process.env.JWT_SECRETO, {
                            expiresIn: process.env.JWT_TIEMPO_EXPIRA
                        });

                        const cookiesOptions = {
                            expires: new Date(Date.now() + process.env.JWT_COOKIES_EXPIRES * 24 * 60 * 60 * 1000),
                            httpOnly: true
                        };

                        
                        const roleHash = await bcryptjs.hash(req.session.id_role, 8);
                        return res.status(200).json({ token, cookiesOptions, roleHash, rid_ss0 });

                    }
                });

        } catch (error) {
            console.log(error);
        }
    },
    // //AUTENTIFICACIÓN DE LOGIN
    // AutentificacionUsuario: async (req, res, next) => {
    //     // if (req.cookies.jwt) {

    //     if (req.headers.authorization) {
    //         try {
    //             //const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO);
    //             const decodificada = await jwt.verify(req.headers.authorization.substr(7), process.env.JWT_SECRETO)
    //             conexion.query('SELECT * FROM users WHERE id_user =?', [decodificada.id_user], async (error, results) => {
    //                 if (!results) {
    //                     return res.status(401).send('No Autorizado, Token no encontrado')
    //                 }
    //                 req.user = results[0];
    //                 return next();
    //             })
    //         } catch (error) {

    //             return res.status(401).send('No Autorizado, Token invalido')
    //         }
    //     } else {

    //         return res.status(401).send('No Autorizado, Token no encontrado')

    //     }
    // },
    // auntentificadorRol: async (req, res, next) => {
    //     const id_role = req.session.id_role;
    //     console.log(id_role);
    //     try {
    //         if (id_role == 'admin') {
    //             return next();
    //         } else

    //             res.render('index', {
    //                 alert: true,
    //                 alertTitle: "Advertencia",
    //                 alertMessage: "Uno o más campos están sin completar",
    //                 alertIcon: 'info',
    //                 showConfirmButton: true,
    //                 timer: false,
    //                 ruta: '/register'
    //             });

    //     } catch (error) {
    //         console.log(error);
    //         return next();

    //     }
    // },
    //CIERRA DE SESIÓN
    LogOut: async (req, res) => {
        // res.clearCookie('jwt');
        // res.clearCookie('connect.sid');
        console.log('session a elminar:' + req.header.rid_ss0.substr(7))
        const session_id = req.header.rid_ss0.substr(7)
        await auth.eliminarSession(session_id, function (data) {
            return res.status(200).send('Session Terminada');
        })
    }
};



