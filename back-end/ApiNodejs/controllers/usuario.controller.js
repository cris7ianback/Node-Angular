var usuarioModule = require('../models/usuario.model');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const conexion = require('../config/conexion');
const { buscarUsuario } = require('../models/usuario.model');
const controllerUsuario = {};
let db = null;

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
            const oldPassword = req.body.oldPassword;
            const password = req.body.password;
            const passHash = await bcryptjs.hash(password, 8);

            conexion.query('SELECT email , password FROM users WHERE email =? ',
                [email],
                async (error, results) => {
                    if (results.length == 0  || !(await bcryptjs.compare(oldPassword, results[0].password))) {
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
    },


    
    // modificarPass2 : (async (req, res, next) => {
    //     const user = await user.buscarUsuario(req.user.id_user).select("+password");
    //     const { newPassword, confirmPassword, oldPassword } = req.body;
    //     const isMatched = await user.comparePassword(oldPassword);
      
    //     if (!isMatched) {
    //       return next(new ErrorHandler("Old password is incorrect", 400));
    //     }
    //     if (newPassword !== confirmPassword) {
    //       return next(new ErrorHandler("Password does not match", 400));
    //     }
      
    //     user.password = newPassword;
    //     await user.save();
      
    //     res.status(200).json({
    //       success: true,
    //       message: "Password changed successfully !",
    //     });
    //   })






    // modificarpass2: async (req, res)=>{
    //     const {email, oldPassword, newPassword } = request.body
    //     const selectUserQuery =  `SELECT email , password FROM users WHERE email = '${email}'; `;
    //     const dbUser = await db.get(selectUserQuery);
    //     id(dbUser === undefined) {
    //         response.status (400);
    //         response.send("Invalid user");
    //     }else{

    //     }
    // }


    // modificarPass2: async (request, response) => {
    //     const { email, oldPassword, newPassword } = request.body;
    //     const selectUserQuery = 'SELECT * FROM users WHERE email =? ';
    //     const dbUser = await db.get(selectUserQuery);
    //     if (dbUser === undefined) {
    //         console.log("entra al if")
    //         response.status(400);
    //       response.send("Invalid user");
    //     } else {
    //         console.log("entra al else")
    //       const isPasswordMatch = await bcrypt.compare(oldPassword, dbUser.password);
    //       if (isPasswordMatch === true) {
    //         if (validatePassword(newPassword)) {
    //           const hashedPassword = await bcrypt.hash(newPassword, 10);
    //           const updateUserQuery = `UPDATE 
    //                 users
    //                 set 
    //                 password = '${hashedPassword}'
    //                 WHERE emmail = '${email}';`;
    //           const user = await db.run(updateUserQuery);
    //           response.send("Password updated");
    //         } else {
    //           response.status(400);
    //           response.send("Password is too short");
    //           console.log(" password cota")
    //         }
    //       } else {
    //         response.status(400);
    //         response.send("Invalid current password");
    //         console.log("invalid password")
    //       }
    //     }
    //   } ,



    //   modificarPass2: async (req, res) =>{

    //     console.log('==Body==', req.body)
    //     let newPassword = req.body.newPassword;
     
    //     usuarioModule.findOne({ email: req.body.email })
    //         .then(user => {
    //             if (user) { 
    //                 bcrypt
    //                     .compare(req.body.oldPassword, user.password)
    //                     .then(isMatch => {
    
    //                         if (isMatch) {
    // console.log("here one")
    //                             bcrypt.genSalt(10, (err, salt) => {
    //                                 bcrypt.hash(newPassword, salt, (err, hash) => {
    //                                 if (err) throw err;
    //                                 user.password = hash;
    //                                 user.save().then(reguser => {
    //                                     res.json({error: false, message:"password updated",user: reguser })
    //                                 }).catch(err => res.status(400).json({ error: err }))
    //                             });
    //                             })
                                
    //                         } else {
    //                             return res.status(400).json({error: true, message:"Old password do not match"});
    //                         }
    //                     })
    //                     .catch(err => console.log(err));
    //                 console.log("here 2");
    //             } else {
    //                 return res.status(400).json({error: true, message:"User does not exist"})
    //             }
    //         })
    // }


};

