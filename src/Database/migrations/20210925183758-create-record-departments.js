"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("record_departments", {
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
      section_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "sections", key: "id" },
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
    queryInterface.dropTable("record_departments");
  },
};
