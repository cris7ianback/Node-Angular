
module.exports = (sequelize, Sequelize) => {

    const Personal = sequelize.define("personal", {
        nombre: { type: Sequelize.STRING },
        apellido: { type: Sequelize.STRING },
        correo: { type: Sequelize.STRING },

    });
    return Personal;
};