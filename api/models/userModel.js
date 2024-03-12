const { DataTypes } = require('sequelize');
const config = require('../../config');
const Profil = require('./profilModel');
const Enable = require('./enableModel');

const User = config.sequelize.define('Users', {
    id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    lastConnection: {
        type: DataTypes.DATE
    },
}, {
    timestamps: true
})

User.belongsToMany(Profil, {through: Enable})
Profil.belongsToMany(User, {through: Enable})

module.exports = User
