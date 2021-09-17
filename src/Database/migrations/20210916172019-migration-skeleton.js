'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return await queryInterface.createTable('processos', {
        registerNumber: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: false,
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
            allowNull: false,
        },

        documentDescription: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
        },

        seiNumber: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
        },

        receivedBy: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
        },

        answerDocument: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
        },

        contactInfo: {
            type: Sequelize.DataTypes.TEXT,
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

    return await queryInterface.dropTable('processos');
  }
};
