const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config');
const Adherent = require('./adherentModel');

const Injury = config.sequelize.define('injuries', {
    id_injury: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    injury_wording: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    date_start: {
        type: DataTypes.DATE,
        allowNull: false
    },
    date_end: {
        type: DataTypes.DATE
    },
    id_adherent: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true
})

module.exports = Injury