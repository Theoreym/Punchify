const { DataTypes } = require('sequelize');
const config = require('../../config');

const EventType = config.sequelize.define('eventtypes', {
    id_event_type: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    event_type_wording: {
        type: DataTypes.STRING,
        allowNull: false
    },
})


module.exports = EventType