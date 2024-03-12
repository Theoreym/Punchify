const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config');

const Enable = config.sequelize.define('enable', {
    
}, {
    timestamps: true
});

module.exports = Enable