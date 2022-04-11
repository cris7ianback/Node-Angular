const conexion = require('../config/conexion');

module.exports = {

    validarUsuarioId: function (id, callback){
        conexion.query ('SELECT * FROM users WHERE id_user=?',
        [id],
        (err, rows, fields) =>{
            if (err) throw err;
            else {
               // console.log(rows[0])
                return callback(rows[0]);
            }
        })
    },

    validarSesion: function (session_id, callback){
        conexion.query ('SELECT data, expires FROM sessions WHERE session_id=?',
        [session_id],
        (err, rows, fields) =>{
            if (err) throw err;
            else {
                return callback (rows[0]);
            }
        })
    },

    eliminarSession: function (session_id, callback) {
        let sql = 'DELETE FROM sessions WHERE session_id =?';
        conexion.query(sql, session_id, function (err, rows, fields) {
            if (err) throw err;
            else {
                return callback (rows[0]);
            }
        })
    }

}