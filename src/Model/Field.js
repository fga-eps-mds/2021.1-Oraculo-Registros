const { Model, DataTypes } = require("sequelize");

class Field extends Model {
  static init(sequelize) {
    super.init(
      {
        /**
         * Nome do campo
         */
        name: { type: DataTypes.TEXT },
        /**
         * nome exato do campo na tabela de registros
         */
        db_field_name: { type: DataTypes.TEXT },
        /**
         * Descrição do campo
         */
        description: { type: DataTypes.TEXT },
        /**
         * possui o id do usuário que criou o campo. Terá o valor 0 caso seja um campo default
         */
        created_by: { type: DataTypes.INTEGER },
      },
      {
        sequelize,
        tableName: "records_fields",
      }
    );
  }
}

module.exports = Field;
