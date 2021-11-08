const { Model, DataTypes } = require("sequelize");

class History extends Model {
  static init(sequelize) {
    super.init(
      {
        /**
         * Contém o email do usuário que encaminhou o registro
         */
        origin_id: { type: DataTypes.INTEGER },
        origin_name: { type: DataTypes.TEXT },
        destination_id: { type: DataTypes.INTEGER },
        destination_name: { type: DataTypes.TEXT },
        forwarded_by: { type: DataTypes.TEXT },
        closed_at: { type: DataTypes.DATE },
        closed_by: { type: DataTypes.TEXT },
        reopened_at: { type: DataTypes.DATE },
        reopened_by: { type: DataTypes.TEXT },
        reason: { type: DataTypes.TEXT },
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
