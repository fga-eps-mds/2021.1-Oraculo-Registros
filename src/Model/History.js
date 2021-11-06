const { Model, DataTypes } = require("sequelize");

class History extends Model {
  static init(sequelize) {
    super.init(
      {
        /**
         * Contém o email do usuário que encaminhou o registro
         */
        forwarded_by: { type: DataTypes.TEXT },
        origin_id: { type: DataTypes.INTEGER },
        origin_name: { type: DataTypes.TEXT },
        destination_id: { type: DataTypes.INTEGER },
        destination_name: { type: DataTypes.TEXT },
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
