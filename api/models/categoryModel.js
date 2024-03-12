const { DataTypes } = require('sequelize');
const config = require('../../config');

const Category = config.sequelize.define('categories',{
    id_category: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categorie_wording: {
        type: DataTypes.STRING(100),
        allowNull: false
    }

})


module.exports = Category