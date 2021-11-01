"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const sections = [
      {
        name: "Divisão Administrativa",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: true,
      },
      {
        name: "Divisão Biométrica Civil",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: true,
      },
      {
        name: "Divisão Biométrica Criminal",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: true,
      },
      {
        name: "Divisão de Tecnologia, Pesquisa e Desenvolvimento",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: true,
      },
      {
        name: "Gerência Adjunta",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: true,
      },
      {
        name: "Gerência de Identificação",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: true,
      },
      {
        name: "Seção AFIS",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção Avançada de Serviços Papiloscópicos",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Análise Cadastral",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Atendimento Interno ao Cidadão e Emissão de Certidões",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Cadastramento Biográfico e Biométrico e Emissão de FAC",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Capacitação Técnica",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Codificação e Sistematização",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Comparação Facial de Imagens",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Comunicação Social e Eventos",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Elaboração de Relatórios Técnicos",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Identificação Criminal",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Identificação Criminal Central de Flagrantes",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Identificação de Pessoas Desaparecidas",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Identificação Funcional",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Informática e Manutenção",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Inovação em Identificação Humana",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Laboratório de Pesquisa, Desenvolvimento e Levantamento Papiloscópico",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Malote",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Material, Patrimônio, Almoxarifado e Manutenção Predial",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Necropapiloscopia",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Postos de Identificação Biométrica",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Programas Sociais",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Projeção de Idade, Disfarce e Reconstituição Facial",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Projetos Estratégicos",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Protocolo e Expediente",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Recursos Humanos",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Respostas a Ofícios e Atestados",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Retrato Falado",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Transportes",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Tratamento de Divergências Biométricas",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Verificação Biométrica",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção de Verificação Biométrica Online",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Seção Papiloscópica Especializada no Combate à Organização Criminosa e Lavagem de Dinheiro",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
      {
        name: "Unidade de Inteligência",
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
      },
    ];

    return queryInterface.bulkInsert("sections", sections);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("sections", null, {});
  },
};
