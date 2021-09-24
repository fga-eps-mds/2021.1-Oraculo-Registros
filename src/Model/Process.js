const { Model, DataTypes } = require("sequelize");

class Process extends Model {
	static init(sequelize) {
		super.init(
			{
				registerNumber: { type: DataTypes.TEXT },
				originLocation: { type: DataTypes.TEXT },
				location: { type: DataTypes.TEXT },
				sourceDocument: { type: DataTypes.TEXT },
				documentDescription: { type: DataTypes.TEXT },
				seiNumber: { type: DataTypes.INTEGER },
				receivedBy: { type: DataTypes.TEXT },
				answerDocument: { type: DataTypes.TEXT },
				contactInfo: { type: DataTypes.TEXT },
			},
			{
				sequelize,
			}
		);
	}
}

module.exports = Process;
