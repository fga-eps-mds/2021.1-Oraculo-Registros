const { Model, DataTypes } = require("sequelize");

class History extends Model {
  static init(sequelize) {
    super.init(
      {
        forwarded_by: { type: DataTypes.INTEGER },
        origin_id: { type: DataTypes.INTEGER },
        destination_id: { type: DataTypes.INTEGER },
      },
      {
        sequelize,
        tableName: "history",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Record, { foreignKey: "record_id", as: "record" });
  }
}

module.exports = History;
