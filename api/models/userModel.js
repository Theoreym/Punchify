const { DataTypes } = require('sequelize');
const config = require('../../config');
const Profil = require('./profilModel');
const Enable = require('./enableModel');

const User = config.sequelize.define('users', {
    id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    lastConnection: {
        type: DataTypes.DATE
    }
});

User.hasOne(Profil);
Profil.belongsTo(User);


module.exports = User;
