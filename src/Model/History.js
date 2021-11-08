const { Model, DataTypes } = require("sequelize");

class History extends Model {
  static init(sequelize) {
    super.init(
      {
        /**
         * Contém o email do usuário que encaminhou o registro
         */
        origin_id: {
          type: DataTypes.INTEGER,
          get() {
            const val = this.getDataValue("origin_id");
            if (!val) {
              return;
            }

            return val;
          },
        },
        origin_name: {
          type: DataTypes.TEXT,
          get() {
            const val = this.getDataValue("origin_name");
            if (!val) {
              return;
            }

            return val;
          },
        },
        destination_id: {
          type: DataTypes.INTEGER,
          get() {
            const val = this.getDataValue("destination_id");
            if (!val) {
              return;
            }

            return val;
          },
        },
        destination_name: {
          type: DataTypes.TEXT,
          get() {
            const val = this.getDataValue("destination_name");
            if (!val) {
              return;
            }

            return val;
          },
        },
        forwarded_by: {
          type: DataTypes.TEXT,
          get() {
            const val = this.getDataValue("forwarded_by");
            if (!val) {
              return;
            }

            return val;
          },
        },
        closed_at: {
          type: DataTypes.DATE,
          get() {
            const val = this.getDataValue("closed_at");
            if (!val) {
              return;
            }

            return val;
          },
        },
        closed_by: {
          type: DataTypes.TEXT,
          get() {
            const val = this.getDataValue("closed_by");
            if (!val) {
              return;
            }

            return val;
          },
        },
        reopened_at: {
          type: DataTypes.DATE,
          get() {
            const val = this.getDataValue("reopened_at");
            if (!val) {
              return;
            }

            return val;
          },
        },
        reopened_by: {
          type: DataTypes.TEXT,
          get() {
            const val = this.getDataValue("reopened_by");
            if (!val) {
              return;
            }

            return val;
          },
        },
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
