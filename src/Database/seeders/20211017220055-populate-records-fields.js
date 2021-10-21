"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fields = [
      {
        name: "Nº de registro",
        db_field_name: "register_number",
        description: "Número de registro",
        created_by: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Data de inclusão",
        db_field_name: "inclusion_date",
        description: "Data de inclusão do registro",
        created_by: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Cidade",
        db_field_name: "city",
        description: "Cidade",
        created_by: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Estado",
        db_field_name: "state",
        description: "Estado",
        created_by: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Solicitante",
        db_field_name: "requester",
        description: "Órgão solicitante",
        created_by: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Tipo do documento",
        db_field_name: "document_type",
        description: "Tipo do documento (ofício, despacho, etc)",
        created_by: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Número do documento",
        db_field_name: "document_number",
        description: "Contém o número do documento",
        created_by: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Data do documento",
        db_field_name: "document_date",
        description: "Contém a data do documento",
        created_by: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Descrição",
        db_field_name: "description",
        description: "Descrição do documento",
        created_by: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Nº do SEI",
        db_field_name: "sei_number",
        description: "Número de registro no SEI",
        created_by: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Forma de recebimento",
        db_field_name: "receipt_form",
        description: "Meio de recebimento (físico, email, etc)",
        created_by: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Dados de contato",
        db_field_name: "contact_info",
        description: "Dados do contato para resposta",
        created_by: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Situação do registro",
        db_field_name: "situation",
        description: "Situação atual do registro (parado, finalizado, etc)",
        created_by: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Criador",
        db_field_name: "created_by",
        description: "Nome do usuário que criou o campo",
        created_by: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Usuário associado",
        db_field_name: "assigned_to",
        description: "Id do usuário que está responsável pelo registro em questão",
        created_by: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    return queryInterface.bulkInsert("records.fields", fields);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("records.fields", null, {});
  },
};
