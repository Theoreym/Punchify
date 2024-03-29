const { DataTypes } = require('sequelize');
const config = require('../../config');

const Profil = config.sequelize.define('profils', {
    id_profil: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    profil_code: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    profil_wording: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
  });


  module.exports = Profil;