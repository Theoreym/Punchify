const { DataTypes } = require('sequelize');
const config = require('../../config');

const Injury = config.sequelize.define('injuries', {
    id_injury: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    injury_wording: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    date_start: {
        type: DataTypes.DATE,
        allowNull: false
    },
    date_end: {
        type: DataTypes.DATE
    },
});


module.exports = Injury;