"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tags = [
      {
        name: "Urgente",
        color: "#ff0000",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Tramitar",
        color: "#0000aa",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Mudar",
        color: "#faff00",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    return queryInterface.bulkInsert("tags", tags);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("tags", null, {});
  },
};
