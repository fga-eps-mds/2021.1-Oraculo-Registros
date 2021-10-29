"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("records_tags", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      record_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "records", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      tag_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "tags", key: "id" },
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
    queryInterface.dropTable("records_tags");
  },
};
