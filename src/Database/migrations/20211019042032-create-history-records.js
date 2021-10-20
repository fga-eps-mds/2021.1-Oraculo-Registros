"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("history_records", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      record_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "records", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      history_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "history", key: "id" },
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
    return queryInterface.dropTable("history_records");
  },
};
