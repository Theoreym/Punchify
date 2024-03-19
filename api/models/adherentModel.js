const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config');
const ParticipateEvent = require('./participateEventModel');
const Event = require('./eventModel');
const Category = require('./categoryModel');
const Injury = require('./injuryModel');
const Team = require('./teamModel');
const User = require('./userModel');

const Adherent = config.sequelize.define('adherents', {
    id_adherent: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    lastname: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING(1),
        allowNull: false
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(50),
    },
    address_number: {
        type: DataTypes.STRING(50)
    },
    address_wording: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    postal_code: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    size: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: false
    },
    weight: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    isValidate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

Adherent.belongsToMany(Event, {through: ParticipateEvent});
Event.belongsToMany(Adherent, {through: ParticipateEvent});

Adherent.belongsTo(Category);
Category.hasOne(Adherent);

Adherent.hasMany(Injury);
Injury.belongsTo(Adherent);

Adherent.belongsTo(Team);
Team.hasOne(Adherent);

Adherent.belongsTo(User);
User.hasOne(Adherent);


module.exports = Adherent;