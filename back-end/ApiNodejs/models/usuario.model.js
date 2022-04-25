const conexion = require('../config/conexion');
const usuarioController = require('../controllers/personal.controller');

module.exports = {

    listarUsuarios: function (callback) {
        const sql = 'SELECT * FROM users';
        conexion.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },
    listarUsuariosId: function (id_persona, callback) {
        const sql = 'SELECT * FROM users WHERE id_user= ?';
        conexion.query(sql, id_persona, function (err, data) {
            if (err) throw err;
            return callback(data[0]);
        });
    },
    eliminarUsuario: function (id_user, callback) {
        console.log(id_user);
        const sql = 'DELETE FROM users WHERE id_user =?';
        conexion.query(sql, id_user, function (err, rows) {
            if (err) throw err;
            else {
                return callback(rows[0]);
            }
        });

    },
    modificarUsuario: function (id_user, user, email, password, id_role, callback) {
        const sql = `UPDATE users SET
                user = '${user}',
                email = '${email}',
                password = '${password}',
                id_role = '${id_role}'
                WHERE id_user = '${id_user}'`;
        conexion.query(sql, function (err, rows, fields) {
            if (err) throw err;
            return callback(rows);
        });
    },
    registrarUsuario: function (user, email, password, id_role, callback) {
        const sql = `INSERT INTO users (user, email, password, id_role) VALUES ('${user}','${email}','${password}','${id_role}')`;
        conexion.query(sql, function (err, rows, fields) {
            if (err) throw err;
            else {
                return callback(rows);
            }
        });
    },
    
    buscarUsuario: function (user, email, callback) {
        conexion.query('SELECT user, email FROM users WHERE user =? or email =?',
            [user, email] ,
            
            (err, rows, fields) => {
                
                if (err) throw err;
                else {
                    return callback(rows[0]);
                }
            })
    }



};
