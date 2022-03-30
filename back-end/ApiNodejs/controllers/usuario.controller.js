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
    //REGISTRAR USUARIO
    registrarUsuario: async (req, res) => {
        try {
            const user = req.body.user;
            const email = req.body.email;
            const password = req.body.password;
            const id_role = req.body.id_role;
            let passHash = await bcryptjs.hash(password, 8);
            conexion.query('INSERT INTO users SET ?', { user: user, email: email, password: passHash, id_role: id_role }, (error, results) => {
                if (error) { console.log(error); }
                res.redirect('/login');
            });
        } catch (error) {
            console.log(error);
        }
    }

};

