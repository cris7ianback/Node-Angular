module.exports = {

    listarPersonal: function (callback) {
        var sql = 'SELECT * FROM persona';
        conexion.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

}