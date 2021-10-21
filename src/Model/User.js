const { Model, Sequelize } = require("sequelize");

class User extends Model {
  static init(db) {
    super.init(
      {
        name: { type: Sequelize.TEXT },
        email: { type: Sequelize.TEXT },
      },
      {
        sequelize: db,
        tableName: "users",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.History, { foreignKey: "forwarded_by", as: "users" });
  }
}

module.exports = { User };
