const { Model, DataTypes } = require("sequelize");

class Department extends Model {
  static init(sequelize) {
    super.init(
      {
        name: { type: DataTypes.TEXT },
        is_admin: { type: DataTypes.BOOLEAN },
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
