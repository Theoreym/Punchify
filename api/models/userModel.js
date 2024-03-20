const { DataTypes } = require('sequelize');
const config = require('../../config');
const Profil = require('./profilModel');
const bcrypt = require("bcrypt");

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
    },
}, {
    hooks: {
      beforeCreate: (User) => {
        {
          User.password = User.password && User.password != "" ? bcrypt.hashSync(User.password, 10) : ""
        }
      },
      beforeUpdate: (User) => {
        {
          User.password = User.password && User.password != "" ? bcrypt.hashSync(User.password, 10) : ""
        }
      }
    }
  }
  );



User.belongsTo(Profil);
Profil.hasOne(User);

module.exports = User;