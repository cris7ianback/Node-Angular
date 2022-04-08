const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('../models/auth.model.js');

module.exports = {

    AutentificacionUsuario: async (req, res, next) => {
        console.log(req.headers.authorization, req.headers.rolekey)
        const rolekey = req.headers.rolekey
        //console.log(roleKey)
        if (req.headers.authorization) {
            try {

                const decodificada = await jwt.verify(req.headers.authorization.substr(7), process.env.JWT_SECRETO)
                console.log(decodificada)
                const id = decodificada.id;
                console.log('id:' + id)
                models.validarUsuarioId(id, function (data) {
                    if (!data) {

                        return res.status(401).send('No Autorizado, Token no encontrado');
                    }
                    else {
                        req.email = data.email;
                        req.rolekey = rolekey;
                        console.log(req.headers.rolekey)
                        return next()
                    }
                })
            } catch (error) {

                console.log('hola')
                return res.status(401).send('No Autorizado, Token invalido 444444')
            }
        } else {
            return res.status(401).send('No Autorizado, Token no encontrado')
        }
    },

    rolAdmin: async (req, res, next) => {
        const rolekey = req.rolekey;
        console.log(req.email)
        try {
            if (await bcryptjs.compare('admin', rolekey.substr(7))) {

                res.status(200).send('Autorizado')
                
            }
            else {
                res.status(401).json({ error: 'No Autorizado' })
            }
        }catch (error) {
            console.log(error);
            res.status(401).json({ error: 'No Autorizado' })
        }
    },

    rolAdminNext: async (req, res, next) => {
        const rolekey = req.rolekey;
        console.log(req.email)
        try {
            if (await bcryptjs.compare('admin', rolekey.substr(7))) {

                return next()
            }
            else {
                res.status(401).json({ error: 'No Autorizado' })
            }
        }catch (error) {
            console.log(error);
            res.status(401).json({ error: 'No Autorizado' })
        }
    

}}