"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("records", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      register_number: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
        unique: true,
      },
      inclusion_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      city: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      state: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      requester: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      document_type: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      document_number: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      document_date: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      sei_number: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      receipt_form: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      contact_info: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      situation: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      created_by: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      assigned_to: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("records");
  },
};
