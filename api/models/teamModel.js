const { DataTypes } = require('sequelize');
const config = require('../../config');

const Team = config.sequelize.define('teams', {
    id_team: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    team_wording: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    weight_min: {
        type: DataTypes.DECIMAL(5, 2)
    },
    weight_max: {
        type: DataTypes.DECIMAL(5, 2)
    }
});


module.exports = Team;