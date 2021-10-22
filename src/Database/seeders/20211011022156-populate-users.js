"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const adminUser = [
      {
        name: "administrador do sistema",
        email: "admin@email.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    return queryInterface.bulkInsert("users", adminUser);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
