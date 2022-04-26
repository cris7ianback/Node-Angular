const auth = require('../models/auth.model')
const bcryptjs = require('bcryptjs');
const conexion = require('../config/conexion');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.EXP_SESSION_CRYPTO);
const jwt = require('jsonwebtoken');

const controllerAuth = {};

module.exports = {

    //INICIO DE SESIÓN
    login: async (req, res) => {
        try {
            //limpiar Cookie & Token.
            res.clearCookie('jwt');
            res.clearCookie('connect.sid');
            const email = req.body.email;
            const password = req.body.password;

            conexion.query('SELECT * FROM users WHERE email =?',
                [email],
                async (error, results) => {
                    if (results.length == 0 || !(await bcryptjs.compare(password, results[0].password))) {
                        res.status(401).send('No Autorizado');
                    } else {
                    
                        req.session.id_user = results[0].id_user;
                        req.session.user = results[0].user;
                        req.session.email = results[0].email;
                        req.session.id_role = results[0].id_role;

                        const rid_ss0 = cryptr.encrypt(req.session.id)
                        const token = jwt.sign({ idr: rid_ss0, email : email }, process.env.JWT_SECRETO, {
                            expiresIn: process.env.JWT_TIEMPO_EXPIRA
                        });

                        const cookiesOptions = {
                            expires: new Date(Date.now() + process.env.JWT_COOKIES_EXPIRES * 24 * 60 * 60 * 1000),
                            httpOnly: true
                        };
                        return res.status(200).json({ token });                
                    }
                });

        } catch (error) {

            console.log(error);
        }
    },

    LogOut: async (req, res) => {
        // res.clearCookie('jwt');
        // res.clearCookie('connect.sid');
        const session_id = await jwt.verify(req.headers.authorization.substr(7), process.env.JWT_SECRETO).idr
        const decryptedString = cryptr.decrypt(session_id)
        await auth.eliminarSession(decryptedString, function () {
            return res.status(200).send('Session Terminada');
        })
    },

    authenticateToeken(req, res, next) {
        const autHeader = req.headers['authorization']
        const token = autHeader && autHeader.split('')[1]
        if (token == null)
            return res.sendStatus(401)

        jwt.verify(token, process.env.JWT_SECRETO, (err, response) => {
            if (err)
                return res.sendStatus(403);
            res.locals = response;
            next()

        })
    }



};



