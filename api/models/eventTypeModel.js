const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config');

const EventType = config.sequelize.define('EventTypes', {
    id_event_type: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    event_type_wording: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true
})

module.exports = EventType