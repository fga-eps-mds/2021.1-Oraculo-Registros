const { Model, DataTypes } = require("sequelize");

class Situation extends Model {
    static init(sequelize) {
        return super.init(
            {
                status: { type: DataTypes.TEXT },
            },
            {
                sequelize,
                tableName: "situations",
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Record, {
            foreignKey: "record_id",
        });
    }
}

const records_status = {
    StatusPending: "pending",
    StatusFinished: "finished",
    StatusRunning: "running",
};

module.exports = { Situation, records_status };
