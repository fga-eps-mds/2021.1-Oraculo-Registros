const { Model, Sequelize } = require("sequelize");

class RecordNumber extends Model {
  static init(sequelize) {
    super.init(
      {
        record_seq: { type: Sequelize.INTEGER },
        record_year: { type: Sequelize.INTEGER },
      },
      {
        sequelize,
        tableName: "records_numbers",
      }
    );
  }
}

module.exports = { RecordNumber };
