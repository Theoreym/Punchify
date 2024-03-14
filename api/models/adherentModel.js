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
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING,
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
    email: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    address_number: {
        type: DataTypes.STRING
    },
    address_wording: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postal_code: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isValidate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    size: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: false
    },
    weight: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    tutor_lastname: {
        type: DataTypes.STRING
    },
    tutor_firstname: {
        type: DataTypes.STRING
    },
    tutor_email: {
        type: DataTypes.STRING
    },
    tutor_phone: {
        type: DataTypes.STRING(50)
    }
});

Adherent.belongsToMany(Event, {through: ParticipateEvent});
Event.belongsToMany(Adherent, {through: ParticipateEvent});

Adherent.hasOne(Category);
Category.belongsTo(Adherent);

Adherent.belongsTo(Injury);
Injury.hasOne(Adherent);

Adherent.belongsTo(Team);
Team.hasMany(Adherent);

Adherent.belongsTo(User);
User.hasMany(Adherent);


module.exports = Adherent;