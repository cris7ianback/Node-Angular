const conexion = require('../config/conexion');


module.exports = {

    buscarInventario: function (nombre, callback) {
        conexion.query('SELECT nombre FROM inventario WHERE nombre =?',
            [nombre],
            (err, rows, fields) => {
                if (err) throw err;
                else {
                    return callback(rows[0]);
                }
            });
    },

    eliminarInventario: function (id_inventario, callback) {
        console.log(id_inventario);
        const sql = 'DELETE FROM inventario WHERE id_inventario =?';
        conexion.query(sql, id_inventario, function (err, rows) {
            if (err) throw err;
            else {
                return callback(rows[0]);
            }
        });
    },

    listarInventario: function (callback) {
        const sql = 'SELECT * FROM inventario';
        conexion.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data);
        })
    },

    modificarInventario: function (id_inventario, nombre, cantidad, unidad, callback) {
        console.log('aqui')
        const sql = `UPDATE inventario SET
        nombre = '${nombre}',
        cantidad = '${cantidad}',
        unidad = '${unidad}'
        WHERE id_inventario = '${id_inventario}'`;
        conexion.query(sql, function (err, rows, fields) {
            if (err) throw err;
            return callback(rows);
        });

    },

    registrarInventario: function (nombre, cantidad, unidad, callback) {
        const sql = `INSERT INTO inventario(nombre, cantidad, unidad) VALUES('${nombre}', '${cantidad}','${unidad}')`;
        conexion.query(sql, function (err, rows, fields) {
            if (err) throw err;
            else {
                return callback(rows);
            }
        });
    }
}

