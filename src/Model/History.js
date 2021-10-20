const { Model, DataTypes } = require("sequelize");

class History extends Model {
  static init(sequelize) {
    super.init(
      {
        forward_by: { type: DataTypes.INTEGER },
        forward_date: { type: DataTypes.DATE },
      },
      {
        sequelize,
        tableName: "history",
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Record, {
      foreignKey: "history_id",
      through: "history_records",
      as: "history",
    });
  }
}

module.exports = History;
