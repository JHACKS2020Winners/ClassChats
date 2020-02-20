const Sequelize = require('sequelize');
const sequelize = require('../connectors/dbConnector');

class Class extends Sequelize.Model {}
Class.init({
	section: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null
	},
	daysOfWeek: {
		// Stored as a 7-bit integer where each bit represents a day of the week.
		// Online classes are set to 0.
		type: Sequelize.TINYINT,
		defaultValue: 0
	},
	startTime: {
		type: Sequelize.TIME,
		allowNull: true,
		defaultValue: null
	},
	course_id: {
		type: Sequelize.INTEGER,
		references: {
			model: 'Courses',
			key: 'id'
		}
	},
	room_id: {
		type: Sequelize.INTEGER,
		references: {
			model: 'Rooms',
			key: 'id'
		}
	},
	professor_id: {
		type: Sequelize.INTEGER,
		references: {
			model: 'Professors',
			key: 'id'
		}
	}
}, { sequelize, modelName: 'Class'});

module.exports = Class;