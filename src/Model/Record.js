const { Model, DataTypes } = require("sequelize");

class Record extends Model {
  static init(sequelize) {
    super.init(
      {
        register_number: { type: DataTypes.TEXT },
        inclusion_date: { type: DataTypes.DATE },
        city: { type: DataTypes.TEXT },
        state: { type: DataTypes.TEXT },
        requester: { type: DataTypes.TEXT },
        document_type: { type: DataTypes.TEXT },
        document_number: { type: DataTypes.TEXT },
        document_date: { type: DataTypes.TEXT },
        description: { type: DataTypes.TEXT },
        sei_number: { type: DataTypes.TEXT },
        receipt_form: { type: DataTypes.TEXT },
        contact_info: { type: DataTypes.TEXT },
        situation: { type: DataTypes.TEXT },
        created_by: { type: DataTypes.TEXT },
        assigned_to: { type: DataTypes.TEXT },
      },
      {
        sequelize,
        tableName: "records",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.History, { foreignKey: "record_id", as: "histories" });
    this.belongsToMany(models.Tag, {
      foreignKey: "record_id",
      through: "records_tags",
      as: "tags",
    });
    this.belongsToMany(models.Department, {
      foreignKey: "record_id",
      through: "record_departments",
      as: "departments",
    });
  }
}

module.exports = Record;
