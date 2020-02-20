const Sequelize = require('sequelize');
const sequelize = require('../connectors/dbConnector');

class Service extends Sequelize.Model {}
Service.init({
	name: {
		type: Sequelize.STRING,
		unique: true, // Unique so it can be used as a CSS class
	},
}, { sequelize, modelName: 'Service'});

module.exports = Service;