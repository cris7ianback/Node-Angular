const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const conexion = require('../config/conexion');
const auth = require('../models/auth.model')


const controllerAuth = {};

module.exports = {

    // INICIO DE SESIÓN
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
                        rid_ss0 = req.session.id
                        req.session.id_user = results[0].id_user;
                        req.session.user = results[0].user;
                        req.session.email = results[0].email;
                        req.session.id_role = results[0].id_role;
                        

                        

                        const id_user = results[0].id_user;
                        const id_role = results[0].id_role;
                        const token = jwt.sign({ id: id_user, idr: rid_ss0, id_role: id_role }, process.env.JWT_SECRETO, {
                            expiresIn: process.env.JWT_TIEMPO_EXPIRA
                        });

                        const cookiesOptions = {
                            expires: new Date(Date.now() + process.env.JWT_COOKIES_EXPIRES * 24 * 60 * 60 * 1000),
                            httpOnly: true
                        };

                        
                        const roleHash = await bcryptjs.hash(req.session.id_role, 8);
                        return res.status(200).json({ token, cookiesOptions, roleHash, rid_ss0 });

                    }
                });

        } catch (error) {
            console.log(error);
        }
    },
  
    LogOut: async (req, res) => {
        // res.clearCookie('jwt');
        // res.clearCookie('connect.sid');
        console.log('session a elminar:' + req.header.rid_ss0.substr(7))
        const session_id = req.header.rid_ss0.substr(7)
        await auth.eliminarSession(session_id, function (data) {
            return res.status(200).send('Session Terminada');
        })
    }
};



