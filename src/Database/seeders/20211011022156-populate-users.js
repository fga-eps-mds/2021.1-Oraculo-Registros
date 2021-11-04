"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const commonUsers = [
      {
        name: "william the police",
        email: "william@pcgo.com",
        section_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "cop 2",
        email: "cop@pcgo.com",
        section_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "cop 3",
        email: "cop3@pcgo.com",
        section_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    return queryInterface.bulkInsert("users", commonUsers);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
