//Llama libreria MYSQL
const mysql = require('mysql2');
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'db_personal'
});

conexion.connect((err) => {
    if (err) {
        console.log('ha ocurrido un error' + err);
    }
    else {
        console.log('conexión Exitosa');
    }
});

module.exports = conexion;
