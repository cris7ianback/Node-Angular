const express = require("express");
const router = express.Router();
const controllerInventario = require("../controllers/inventario.controller");
const controllerAuth = require("../controllers/auth.controller");
const middlewareController = require("../middleware/auth.middleware")

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

module.exports = router;