const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config');

const Convoke = config.sequelize.define('convoke', {
    
}, {
    timestamps: true
});

module.exports = Convoke