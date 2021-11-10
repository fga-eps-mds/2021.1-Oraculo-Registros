"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("history", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      origin_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      origin_name: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      destination_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      destination_name: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_by: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      forwarded_by: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      closed_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      closed_by: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      reopened_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      reopened_by: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      record_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "records", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      reason: {
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
    return queryInterface.dropTable("history");
  },
};
