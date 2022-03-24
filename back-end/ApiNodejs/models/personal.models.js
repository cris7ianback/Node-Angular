const conexion = require('../config/conexion');
const personalController = require('../controllers/personal.controller');

module.exports = {
    //CONSULTAR PERSONAL
    listarPersonal: function (callback) {
        var sql = 'SELECT * FROM persona';
        conexion.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },
    //CONSULTAR USUARIOS
    listarUsuarios: function (callback) {
        var sql = 'SELECT * FROM users';
        conexion.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },
    //CONSULTA POR ID
    listarPersonalId: function (id_persona, callback) {
        var sql = 'SELECT * FROM persona WHERE id_persona= ?';
        conexion.query(sql, id_persona, function (err, data) {
            if (err) throw err;
            return callback(data[0]);
        });
    },
    //INGRESAR PERSONAL
    registrarPersonal: function (nombre, apellido, correo, callback) {
        let sql = `INSERT INTO persona(nombre, apellido, correo) values('${nombre}', '${apellido}', '${correo}')`;
        conexion.query(sql, function (err, rows, fields) {
            if (err) throw err;
            else {
                return callback(rows);
            }
        });
    },
    // ELIMINAR PERSONAL
    eliminarPersonal: function (id_persona, callback) {
        console.log(id_persona);
        let sql = 'DELETE FROM persona WHERE id_persona =?';
        conexion.query(sql, id_persona, function (err, rows) {
            if (err) throw err;
            else {
                return callback(rows[0]);
            }
        });
    },

    //Eliminar Usuario
    eliminarUsuario: function (id_user, callback) {
        console.log(id_user);
        let sql = 'DELETE FROM users WHERE id_user =?';
        conexion.query(sql, id_user, function (err, rows) {
            if (err) throw err;
            else {
                return callback(rows[0]);
            }
        });

    },
    //MODIFICAR PERSONAL
    actualizarPersonal: function (id_persona, nombre, apellido, correo, callback) {
        let sql = `UPDATE persona SET
                nombre= '${nombre}',
                apellido = '${apellido}',
                correo = '${correo}'
                WHERE id_persona = '${id_persona}'`;
        conexion.query(sql, function (err, rows, fields) {
            if (err) throw err;
            return callback(rows);
        });
    },

    registrarUsuario: function (user, email, password, id_role, callback){
        let sql = `INSERT INTO users (user, email, password, id_role) values ('${user})','${email})','${password})','${id_role})')`;
        conexion.query(sql, function(err, rows, fields){
            if(err) throw err;
            else{
                console.log(rows);
                return callback (rows);
            }
        });
    },

    findUser: function (user, email, callback){
        conexion.query('SELECT user, email FROM users WHERE username=? or email=?',
        [user, email],
        (err,rows, fields)=>{
            if (err) throw err;
            else {
                return callback (rows[0]);
            }
        });
    }
};


// const controller = {};

// controller.list = (req, res) => {
//     req.getConnection((err, conn) => {
//         conexion.query('SELECT * FROM persona', (err, personal) => {
//             if (err) {
//                 res.json(err);
//             }
//             res.render('personal', {
//                 data: personal
//             });
//         });
//     });

// };