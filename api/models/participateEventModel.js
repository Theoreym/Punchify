const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config');

const ParticipateEvent = config.sequelize.define('participateEvent', {
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
}, {
    timestamps: true
});

module.exports = ParticipateEvent