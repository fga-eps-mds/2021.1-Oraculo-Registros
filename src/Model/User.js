const { Model, Sequelize } = require("sequelize");

class User extends Model {
  static init(db) {
    super.init(
      {
        name: { type: Sequelize.TEXT },
        email: { type: Sequelize.TEXT },
        section_id: { type: Sequelize.INTEGER },
      },
      {
        sequelize: db,
        tableName: "users",
      }
    );
  }
}

module.exports = { User };
