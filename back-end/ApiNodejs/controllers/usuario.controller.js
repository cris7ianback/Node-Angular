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
         
        //console.log(req.body)
        console.log(user, email, password, id_role)
        
        if (!user || !email || !password || !id_role) {
            return res.status(501).send('Falta información');
        }else{
            usuarioModule.buscarUsuario(user, email, function (data) {
                console.log('validar si Usuario Existe')
                if (data != undefined) {
                    console.log('aqui no')
                    return res.status(501).send('Usuario y/o Email ya Registrado');                    
                } else {
                    console.log('aqui registra')
                    usuarioModule.registrarUsuario(user, email, passHash, id_role, function (resp) {            
                        return res.status(200).send('Usuario ingresado con exito');
                    });
                }
            });
        
    }
},

};

