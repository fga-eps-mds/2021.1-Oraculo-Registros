const { Model, Sequelize } = require("sequelize");

class Department extends Model {
  static init(sequelize) {
    super.init(
      {
        name: { type: Sequelize.TEXT },
        is_admin: { type: Sequelize.BOOLEAN },
      },
      {
        sequelize,
        tableName: "departments",
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Record, {
      foreignKey: "department_id",
      through: "record_departments",
      as: "records",
    });
  }
}

module.exports = { Department };
