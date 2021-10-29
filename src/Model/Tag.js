const { Model, Sequelize } = require("sequelize");

class Tag extends Model {
  static init(db) {
    super.init(
      {
        name: { type: Sequelize.TEXT },
        color: { type: Sequelize.TEXT },
      },
      {
        sequelize: db,
        tableName: "tags",
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Record, {
      foreignKey: "tag_id",
      through: "records_tags",
      as: "records",
    });
  }
}

module.exports = { Tag };
