const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config');
const Convoke = require('./convokeModel');
const Category = require('./categoryModel');
const EventType = require('./eventTypeModel');

const Event = config.sequelize.define('events', {
    id_event: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    event_wording: {
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
    time_start: {
        type: DataTypes.TIME
    },
    time_end: {
        type: DataTypes.TIME
    },
    place_name: {
        type: DataTypes.STRING(100)
    },
    address_number: {
        type: DataTypes.STRING(50)
    },
    address_wording: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    postal_code: {
        type: DataTypes.INTEGER
    },
    city: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    timestamps: true
})

Category.belongsToMany(Event, {through: Convoke})
Event.belongsToMany(Category, {through: Convoke})

Event.hasOne(EventType)
EventType.belongsToMany(Event)

module.exports = Event