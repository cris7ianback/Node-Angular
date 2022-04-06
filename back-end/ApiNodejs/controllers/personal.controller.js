var personalModule = require('../models/personal.models');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const conexion = require('../config/conexion');



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
        const nombre = req.body.nombre;
        const apellido = req.body.apellido;
        const correo = req.body.correo;

        if (!nombre || !apellido || !correo) {
            return res.status(501).send('Falta información, campos Vacios');
        } else {
            personalModule.buscarPersonal(correo, function (data) {
                if (data != undefined) {                
                    return res.status(501).send('usuario ya Existe');
                } else {
                    personalModule.registrarPersonal(nombre, apellido, correo, function (data) {
                        return res.status(200).send('Personal Ingresado Correctamente');

                    })
                }
            })
        }



        // res.redirect('/');
        // personalModule.registrarPersonal(nombre, apellido, correo, function (data) {
        //     //res.send(data);
        //     console.log("Personal Ingresado Exitosamente");



        // });
    },
    eliminarPersonal: function (req, res) {
        const id_persona = req.params.id_persona;
        personalModule.eliminarPersonal(id_persona, function (data) {
            res.redirect('/');
            console.log("Personal eliminado exitosamente");
        });
    },
    modificarPersonal: function (req, res) {
        const id_persona = req.params.id_persona;
        const nombre = req.body.nombre;
        const apellido = req.body.apellido;
        const correo = req.body.correo;
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
                            const id = results[0].id_user;
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
        // if (req.cookies.jwt) {

        if (req.headers.authorization) {
            try {
                //const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO);
                const decodificada = await jwt.verify(req.headers.authorization.substr(7), process.env.JWT_SECRETO)
                conexion.query('SELECT * FROM users WHERE id_user =?', [decodificada.id_user], async (error, results) => {
                    if (!results) {
                        return res.status(401).send('No Autorizado, Token no encontrado')

                    }

                    req.user = results[0];
                    return next();
                })
            } catch (error) {
                // console.log(error);
                // return next();
                return res.status(401).send('No Autorizado, Token invalido')
            }
        } else {

            return res.status(401).send('No Autorizado, Token no encontrado')
            //res.redirect('/');
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


};

