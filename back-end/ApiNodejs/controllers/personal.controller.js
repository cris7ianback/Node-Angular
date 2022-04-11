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
        const id_persona = req.params.id_persona;
        personalModule.listarPersonalId(id_persona, function (data) {
            res.send(data);
        });
    },
    registrarPersonal: function (req, res) {
        const nombre = req.body.nombre;
        const apellido = req.body.apellido;
        const correo = req.body.correo;


        personalModule.buscarPersonal(correo, function (data) {
            if (data != undefined) {
                return res.status(501).send('usuario ya Existe');
            } else {
                personalModule.registrarPersonal(nombre, apellido, correo, function (data) {
                    return res.status(200).send('Personal Ingresado Correctamente');
                })
            }
        })


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

};

