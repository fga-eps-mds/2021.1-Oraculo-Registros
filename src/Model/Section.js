const { Model, Sequelize } = require("sequelize");

class Section extends Model {
  static init(sequelize) {
    super.init(
      {
        name: { type: Sequelize.TEXT },
        is_admin: { type: Sequelize.BOOLEAN },
      },
      {
        sequelize,
        tableName: "sections",
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Record, {
      foreignKey: "section_id",
      through: "record_sections",
      as: "records",
    });
  }
}

module.exports = { Section };
