const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config');
const Adherent = require('./adherentModel');
const User = require('./userModel');

const Manage = config.sequelize.define('Manage', {
  id_adherant: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Adherent,
      key: 'id_adherant',
    },
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id_user',
    },
  },
}, {
  primaryKey: true,
});

module.exports = Manage;