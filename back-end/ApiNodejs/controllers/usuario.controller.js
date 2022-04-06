var usuarioModule = require('../models/usuario.model');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const conexion = require('../config/conexion');
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
            res.redirect('/');
            console.log("Usuario eliminado exitosamente");
        });
    },
    //MODIFICAR USUARIO
    modificarUsuario: function (req, res) {
        let id_user = req.params.id_user;
        let user = req.body.user;
        let email = req.body.email;
        let password = req.body.password;
        let id_role = req.body.id_role;
        usuarioModule.modificarUsuario(id_user, user, email, password, id_role, function (data) {
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
        console.log(user, email, password, email, id_role)

        if (!user || !password || !email || !id_role) {
            return res.status(501).send('Falta información, campos Vacios');
        } else {
            usuarioModule.buscarUsuario(email, function (data) {
                if (data != undefined) {
                    return res.status(501).send('email ya existente');
                    console.log(res)
                } else {
                    usuarioModule.registrarUsuario(user, email, passHash, id_role, function (resp) {
                        return res.status(200).send('Usuario ingresado' + id_role);
                    });
                }
            });
        }
    }
};

