"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */

        return queryInterface.createTable("situations", {
            id: {
                primaryKey: true,
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
            status: {
                type: Sequelize.TEXT,
                allowNull: false,
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
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */

        return queryInterface.dropTable("situations");
    },
};
