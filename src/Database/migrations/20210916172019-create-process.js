"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */

		return queryInterface.createTable("processes", {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
			registerNumber: {
				type: Sequelize.DataTypes.TEXT,
				allowNull: true,
			},
			originLocation: {
				type: Sequelize.DataTypes.TEXT,
				allowNull: false,
			},
			location: {
				type: Sequelize.DataTypes.TEXT,
				allowNull: false,
			},

			sourceDocument: {
				type: Sequelize.DataTypes.TEXT,
				allowNull: true,
			},

			documentDescription: {
				type: Sequelize.DataTypes.TEXT,
				allowNull: true,
			},

			seiNumber: {
				type: Sequelize.DataTypes.INTEGER,
				allowNull: false,
			},

			receivedBy: {
				type: Sequelize.DataTypes.TEXT,
				allowNull: true,
			},

			answerDocument: {
				type: Sequelize.DataTypes.TEXT,
				allowNull: true,
			},

			contactInfo: {
				type: Sequelize.DataTypes.TEXT,
				allowNull: true,
			},

			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},

			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */

		return queryInterface.dropTable("processes");
	},
};
