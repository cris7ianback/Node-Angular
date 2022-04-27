var usuarioModule = require('../models/usuario.model');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const conexion = require('../config/conexion');
const { buscarUsuario } = require('../models/usuario.model');
const controllerUsuario = {};

module.exports = {

    //CONSULTAR  TODO EL USUARIO
    listarUsuarios: function (req, res) {
        usuarioModule.listarUsuarios(function (data) {
            res.send(data);
        });
    },
    //CONSULTAR  USUARIO POR ID
    listarUsuariosId: function (req, res) {
        let id_user = req.params.id_user;
        usuarioModule.listarUsuariosId(id_user, function (data) {
            res.send(data);
        });
    },
    //ELIMINAR USUARIO
    eliminarUsuario: function (req, res) {
        var id_user = req.params.id_user;
        usuarioModule.eliminarUsuario(id_user, function (data) {
            res.send(data);
            console.log("Usuario eliminado exitosamente");
        });
    },
    //MODIFICAR USUARIO
    modificarUsuario: async (req, res) => {
        const id_user = req.params.id_user;
        const user = req.body.user;
        const email = req.body.email;
        const password = req.body.password;
        const id_role = req.body.id_role;
        const passHash = await bcryptjs.hash(password, 8);
        usuarioModule.modificarUsuario(id_user, user, email, passHash, id_role, function (data) {
            res.send(data);
            console.log("Datos Actualizados Correctamente");
        });
    },

    registrarUsuario: async (req, res) => {
        const user = req.body.user;
        const email = req.body.email;
        const password = req.body.password;
        const id_role = req.body.id_role;
        const passHash = await bcryptjs.hash(password, 8);

        //buscar si usuario o email Existe
        usuarioModule.buscarUsuario(user, email, function (data) {

            // si  existe usuario o email envia mensaje
            if (data != undefined) {
                return res.status(501).send('Usuario y/o Email ya Registrado');
            } else {
                // si  no existe usuario o email, lo registra
                usuarioModule.registrarUsuario(user, email, passHash, id_role, function (data) {
                    return res.status(200).send('Usuario ingresado con exito');
                });
            }
        });
    },

    // modificarPass: async (req, res) => {
    //     const email = req.body.email;
    //     const password = req.body.password;
    //     const passHash = await bcryptjs.hash(password, 8);
    //     usuarioModule.modificarPass(email, passHash, function (data) {
    //         res.send(data);
    //         console.log("Contraseña Actualizada");
    //     });
    // },

    modificarPass: async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const passHash = await bcryptjs.hash(password, 8);

            conexion.query('SELECT email , password FROM users WHERE email =? ',
                [email],
                async (error, results) => {
                    if (results.length == 0  || !(await bcryptjs.compare(password, results[0].password))) {
                        res.status(401).send('No Autorizado');
                        console.log('Email o contraseña erronea ')
                    } else {
                        usuarioModule.modificarPass(email, passHash, function (data) {
                            res.send(data);
                            console.log("Contraseña Actualizada");
                        });
                    };
                });
        } catch (error) {
            console.log(error);
        }
    }

};

