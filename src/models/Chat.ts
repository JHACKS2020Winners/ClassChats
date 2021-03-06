import Sequelize = require('sequelize');
import sequelize = require('../connectors/dbConnector');

class Chat extends Sequelize.Model {}
Chat.init(
    {
        link: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
    },
    { sequelize, modelName: 'chat' },
);
import User = require('./User');
import Class = require('./Class');
import Service = require('./Service');
Chat.belongsTo(User, {
    foreignKey: {
        allowNull: false,
    },
});
Chat.belongsTo(Class, {
    foreignKey: {
        allowNull: false,
    },
});
Class.hasMany(Chat);
// allow null in case unknown service
Chat.belongsTo(Service);
export = Chat;
