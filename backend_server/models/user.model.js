const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');
const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: 'mysql'
});

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    failed_attempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    locked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    createdAt: {
        type: DataTypes.DATE(3),
        defaultValue: sequelize.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE(3),
        defaultValue: sequelize.NOW,
        onUpdate: sequelize.NOW,
    }
});

module.exports = User;