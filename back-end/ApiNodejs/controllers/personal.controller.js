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
                    return res.status(501).send('Personal ya Existe');
                } else {
                    personalModule.registrarPersonal(nombre, apellido, correo, function (data) {
                        return res.status(200).send('Personal Ingresado Correctamente');

                    })
                }
            })
        }

    },
    eliminarPersonal: function (req, res) {
        const id_persona = req.params.id_persona;
        personalModule.eliminarPersonal(id_persona, function (data) {
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

