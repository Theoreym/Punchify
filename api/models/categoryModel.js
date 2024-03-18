const { DataTypes } = require('sequelize');
const config = require('../../config');

const Category = config.sequelize.define('categories',{
    id_category: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_wording: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    age_min: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    age_max: {
        type: DataTypes.INTEGER
    }
});


module.exports = Category;