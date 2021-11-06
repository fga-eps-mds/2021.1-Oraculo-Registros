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
        allowNull: false,
      },
      destination_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      destination_name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      forwarded_by: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      record_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "records", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
