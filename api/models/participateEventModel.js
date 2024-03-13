const { DataTypes } = require('sequelize');
const config = require('../../config');

const ParticipateEvent = config.sequelize.define('participateevents', {
    summoned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    present: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
});

module.exports = ParticipateEvent;