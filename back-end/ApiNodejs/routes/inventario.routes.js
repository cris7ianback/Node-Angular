const express = require("express");
const router = express.Router();
const controllerInventario = require("../controllers/inventario.controller");
const controllerAuth = require("../controllers/auth.controller");
const middlewareController = require("../middleware/auth.middleware");
const { application } = require("express");
const conexion = require('../config/conexion');

const app = require('express')(),
    multer = require('multer');
    const upload = multer ({storage:multer.memoryStorage()});

router.use(function (res, req, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get  ('/listarInventario', controllerInventario.listarInventario);
router.post ('/registrarInventario', controllerInventario.registrarInventario);
router.get  ('/eliminarInventario/:id_inventario', controllerInventario.eliminarInventario);
router.put  ('/modificarInventario/:id_inventario', controllerInventario.modificarInventario);


// app.post ("/registrarInventario",upload.single('imagenes'),(req, res)=>{
//     nombre = req.body.nombre;
//     console.log('NOMBRE ES:',nombre)
//     cantidad = req.body.cantidad;
//     console.log('CANTIDAD ES:',cantidad)
//     unidad = req.body.unidad;
//     console.log('UNIDAD ES:',unidad)
//     imagenes = req.file
//     console.log('IMAGEN ES:',imagenes)
    
//     q = `INSERT INTO inventario (nombre, cantidad, unidad, imagenes ) VALUES ('${nombre}','${cantidad}', '${unidad}','${imagenes}')`
//     conexion.query(q,[nombre, cantidad, unidad],(err, rows, fields)=>{
//         if (err) throw err;

        
//        console.log("inventario Ingresado")
//     })
// })


module.exports = router;