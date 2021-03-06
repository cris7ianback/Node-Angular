const bcryptjs = require('bcryptjs');
const conexion = require('../config/conexion');
const inventarioModule = require('../models/inventario.model');
const jwt = require('jsonwebtoken');


module.exports = {

    eliminarInventario: function (req, res) {
        const id_inventario = req.params.id_inventario;
        inventarioModule.eliminarInventario(id_inventario, function (data) {
            res.send(data)
            console.log("Producto Eliminado Exitosamente");
        });
    },

    listarInventario: function (req, res) {
        inventarioModule.listarInventario(function (data) {
            res.send(data);
        });
    },

    modificarInventario: function (req, res) {
        console.log('aqui entra')
        const id_inventario = req.params.id_inventario;
        const nombre = req.body.nombre;
        const cantidad = req.body.cantidad;
        const unidad = req.body.unidad;
        inventarioModule.modificarInventario(id_inventario, nombre, cantidad, unidad, function (data){
            res.send(data);
            console.log ("Inventario Actualizados Correctamente")
        });

    },


    registrarInventario: async (req, res) => {
        const nombre = req.body.nombre;
        const cantidad = req.body.cantidad;
        const unidad = req.body.unidad;
        const imagenes = req.body.imagenes;

        inventarioModule.buscarInventario(nombre, function (data) {
            if (data != undefined) {
                return res.status(501).send('Producto ya existente en inventario');
            } else {
                inventarioModule.registrarInventario(nombre, cantidad, unidad, imagenes, function (data) {
                    return (res.status(200).send('Producto Ingresado con exito'))
                })
            }
        })
    }

}