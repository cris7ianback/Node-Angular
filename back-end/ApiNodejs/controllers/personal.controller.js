var personalModule = require('../models/personal.models');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const conexion = require('../config/conexion');
const { promisify } = require('util');


const { actualizarPersonal } = require('../models/personal.models');

const controllerPersonal = {};

module.exports = {

    listarPersonal: function (req, res) {
        personalModule.listarPersonal(function (data) {
            res.send(data);
        });
    },
    listarPersonalId: function (req, res) {
        let id_persona = req.params.id_persona;
        personalModule.listarPersonalId(id_persona, function (data) {
            // res.render('modificarPersonal', { user: data })
            res.send(data);
        });
    },
    registrarPersonal: function (req, res) {
        var nombre = req.body.nombre;
        var apellido = req.body.apellido;
        var correo = req.body.correo;
        res.redirect('/');
        personalModule.registrarPersonal(nombre, apellido, correo, function (data) {
            //res.send(data);
            console.log("Personal Ingresado Exitosamente");
        });
    },
    eliminarPersonal: function (req, res) {
        var id_persona = req.params.id_persona;
        personalModule.eliminarPersonal(id_persona, function (data) {
            res.redirect('/');
            console.log("Personal eliminado exitosamente");
        });
    },
    modificarPersonal: function (req, res) {
        let id_persona = req.params.id_persona;
        let nombre = req.body.nombre;
        let apellido = req.body.apellido;
        let correo = req.body.correo;
        personalModule.modificarPersonal(id_persona, nombre, apellido, correo, function (data) {
            res.send(data);
            console.log("Datos Actualizados Correctamente");
        });
    },

    // INICIO DE SESIÓN
    login: async (req, res) => {
        try {
            //limpiar Cookie & Token.
            res.clearCookie('jwt');
            res.clearCookie('connect.sid');
            console.log(req.body);
            const email = req.body.email;
            const password = req.body.password;


            if (!email || !password) {
            } else {
                conexion.query('SELECT * From users WHERE email = ?',
                    [email],
                    async (error, results) => {
                        console.log(results[0]);
                        if (results.length == 0 || !(await bcryptjs.compare(password, results[0].password))) {
                            res.status(401).send('No Autorizado');

                        } else {
                            const id = results[0].id;
                            const id_role = results[0].id_role;
                            const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, {
                                expiresIn: process.env.JWT_TIEMPO_EXPIRA
                            });
                            const cookiesOptions = {
                                expires: new Date(Date.now() + process.env.JWT_COOKIES_EXPIRES * 24 * 60 * 60 * 1000),
                                httpOnly: true
                            };

                            role = results[0].id_role;

                            const roleHash = await bcryptjs.hash(role, 8);
                            return res.status(200).json({ token });
                        }
                    });
            }
        } catch (error) {
            console.log(error);
        }
    },
    //AUTENTIFICACIÓN DE LOGIN
    AutentificacionUsuario: async (req, res, next) => {
        if (req.cookies.jwt) {
            try {
                const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO);
                conexion.query('SELECT * FROM users WHERE id =?', [decodificada.id], (error, results) => {
                    if (!results) { return next(); }
                    req.user = results[0];
                    return next();
                })
            } catch (error) {
                console.log(error);
                return next();
            }
        } else {
            res.redirect('/');
        }
    },
    auntentificadorRol: async (req, res, next) => {
        const id_role = req.session.id_role;
        console.log(id_role);
        try {
            if (id_role == 'admin') {
                return next();
            } else

                res.render('index', {
                    alert: true,
                    alertTitle: "Advertencia",
                    alertMessage: "Uno o más campos están sin completar",
                    alertIcon: 'info',
                    showConfirmButton: true,
                    timer: false,
                    ruta: '/register'
                });

        } catch (error) {
            console.log(error);
            return next();

        }
    },
    //CIERRA DE SESIÓN
    LogOut: async (req, res) => {
        res.clearCookie('jwt');
        res.clearCookie('connect.sid');
    },

    validarUsuario: async (req, res) => {
        const user = req.body.user;
        const email = req.body.email;
        const password = req.body.password;
        const id_role = req.body.id_role;
        const passHash = await bcryptjs.hash(password, 8);

        if (!user || !password || !email || !id_role) {
            res.render('register', {
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Uno o más campos están sin completar",
                alertIcon: 'info',
                showConfirmButton: true,
                timer: false,
                ruta: '/register'
            });

        } else {
            User.finduser(user, email, function (data) {
                if (data != undefined) {

                    res.render('register', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o email ya Existe",
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: '/register'
                    });

                } else {
                    User.register(user, email, passHash, id_role, function (resp) {
                        res.render('register', {
                            alert: true,
                            alerTitle: "Registro de Usuario",
                            alertMessage: "Registro de Usuario Exito",
                            alertIcon: 'success',
                            showConfirmButton: false,
                            timer: 1000,
                            ruta: '/'

                        });

                    });
                }
            });

        }

    }


};

