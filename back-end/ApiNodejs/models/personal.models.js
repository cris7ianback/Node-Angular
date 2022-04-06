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
    //CONSULTA POR ID
    listarPersonalId: function (id_persona, callback) {
        var sql = 'SELECT * FROM persona WHERE id_persona= ?';
        conexion.query(sql, id_persona, function (err, data) {
            if (err) throw err;
            return callback(data[0]);
        });
    },

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
    //MODIFICAR PERSONAL
    modificarPersonal: function (id_persona, nombre, apellido, correo, callback) {
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
    modificarUsuario: function (id_user, user, email, password, id_role, callback) {
        let sql = `UPDATE users SET
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

  

    buscarPersonal: function (correo, callback) {
        conexion.query('SELECT correo FROM persona WHERE correo=?',
            [correo],
            (err, rows, fields) => {
                if (err) throw err;
                else {
                    return callback(rows[0]);
                }
            });
    }
};
