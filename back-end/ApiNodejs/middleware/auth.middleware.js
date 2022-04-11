const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('../models/auth.model.js');

module.exports = {

    isAuthenticated: async (req, res, next) => {
        const rolekey = req.headers.rolekey
        if (req.headers.authorization) {
            try {
                const decodificada = await jwt.verify(req.headers.authorization.substr(7), process.env.JWT_SECRETO)
                const id = decodificada.id;
                models.validarUsuarioId(id, function (data) {
                    if (!data) {
                        return res.status(401).send('No Autorizado, Token no encontrado');
                    }
                    else {
                        req.email = data.email;
                        req.rolekey = rolekey;
                        return next()
                    }
                })
            } catch (error) {
                return res.status(401).send('No Autorizado, Token invalido')
            }
        } else {
            return res.status(401).send('No Autorizado, Token no encontrado')
        }
    },

    isAdmin: async (req, res, next) => {
        const rolekey = req.rolekey;
        try {
            if (await bcryptjs.compare('admin', rolekey.substr(7))) {

                res.status(200).send('Autorizado')
            }
            else {
                res.status(401).json({ error: 'No Autorizado' })
            }
        } catch (error) {
            console.log(error);
            res.status(401).json({ error: 'No Autorizado' })
        }
    },

    isAuthorizedAdmin: async (req, res, next) => {
        const rolekey = req.rolekey
        try {
            if (await bcryptjs.compare('admin', rolekey.substr(7))) {
                return next()
            }
            else {
                res.statu(401).json({ error: 'No Autorizado' })
            }
        } catch (error) {
            console.log(error)
            res.status(401).json({ error: 'No Autorizado' })
        }
    },


    //validación de Rol desde front End hacia middleware
    isRoleAdmin : async (req, res, next) => {
        const session_id = req.headers.rid_ss0.substr(7)
        try {
            models.validarSesion(session_id, function (data) {
                if (!data) {
                    return res.status(401).send('No Autorizado, session id no encontrada');
                }
                else {
                    let id_role = JSON.parse(data.data).id_role
                    if (id_role === "admin") {
                        res.status(200).send('Es Admin')
                    }
                    else {
                        return res.status(401).send('No Autorizado');
                    }
                }
            })
        } catch (error) {
            console.log(error)
            res.status(401).json({ error: 'No Autorizado' })
        }
    },

    isRoleEditor: async (req, res, next) => {
        const session_id = req.headers.rid_ss0.substr(7)
        try {
            models.validarSesion(session_id, function (data) {
                if (!data) {
                    return res.status(401).send('No autorizado, Session Id no encontrada');
                }
                else {
                    const id_role = JSON.parse(data.data).id_role
                    if (id_role === "editor") {
                        res.status(200).send('Es Editor')
                    }
                    else {
                        return res.status(401).send('No Autorizado');
                    }
                }
            })
        } catch (error) {
            console.log(error)
            res.statu(401).json({ error: ' No Autorizado' })
        }
    },

    isRoleEditorAdmin: async (req, res, next) => {
        const session_id = req.headers.rid_ss0.substr(7)
        
        try {
            models.validarSesion(session_id, function (data) {
                if (!data) {
                    console.log('error session no encontrada')
                    return res.status(401).send('No Autorizado, session id no encontrada');
                }
                else {
                    let id_role = JSON.parse(data.data).role
                    if (id_role === "editor" || id_role === "admin") {
                        res.status(200).send('Autorizado')
                    }
                    else {
                        return res.status(401).send('No Autorizado')
                    }
                }
            })
        }
        catch (error) {
            console.log(error)
            res.status(401).json({ error: 'No Autorizado' })
        }
    },

    isAuthRoleEditorAdmin: async (req, res, next) => {
        const session_id = req.headers.rid_ss0.substr(7)
        try {
            models.validarSesion(session_id, function (data) {
                if (!data) {
                    console.log('error session no encontrada')
                    return res.status(401).send('No Autorizado, session no encontrada');
                }
                else {
                    let id_role = JSON.parse(data.data).role
                    if (id_role === "editor" || id_role === "admin") {
                        return next()
                    }
                    else {
                        console.log('error session no encontrada')
                        return res.status(401).send('No Autorizado');
                    }
                }
            })
        }
        catch (error) {
            console.log(error)
            res.status(401).jswon({ error: ' No Autorizado' })
        }
    },

    isAuthRoleAdmin: async (req, res, next) => {
        const session_id = req.headers.rid_ss0.substr(7)
        try {
            models.validarSesion(session_id, function (data) {
                if (!data) {
                    console.log('error session no encontrada')
                    return res.status(401).send('No Autorizado, session no encontrada');
                }
                else {
                    const id_role = JSON.parse(data.data).id_role
                    if (id_role === "admin") {
                        return next()
                    }
                    else {
                        console.log('error session no encontrada')
                        return res.status(401).send('No Autorizado');
                    }
                }
            })
        }
        catch (error) {
            console.log(error)
            console.log('error session no encontrada')
            res.status(401).jswon({ error: ' No Autorizado' })
        }
    }

}