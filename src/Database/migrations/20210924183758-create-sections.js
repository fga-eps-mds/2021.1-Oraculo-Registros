"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const sections = [
            {
                name: "Gerência de identificação",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Unidade de inteligência",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Gerência adjunta",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de cadastramento biográfico e biométrico e emissão de fac",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de inovação em identificação humana",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de capacitação técnica",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de atendimento interno ao cidadão e emissão de certidões",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de identificação criminal",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de comparação facial de imagens",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de comunicação social e eventos",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de programas sociais",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de identificação criminal central de flagrantes",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de retrato falado",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de informática e manutenção",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de codificação e sistematização",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de laboratório de pesquisa,desenvolvimento e levantamento papiloscópico",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de projeção de idade, disfarce e reconstituição facial",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de malote",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de verificação biométrica",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de respostas a ofícios e atestados",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de identificação de pessoas desaparecidas",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de protocoloe expediente",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de verificação biométrica online",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de elaboração de relatórios técnicos",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de necropapiloscopia",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de recursos humanos",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de tratamento de divergências biométricas",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção afis",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de transportes",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de análise cadastral",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção papiloscópica especializada no combate à organização criminosa e lavagem de dinheiro",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de material,patrimônio,almoxarifado e manutenção predial",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de identificação funcional",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção avançada de serviços papiloscópicos",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de projetos estratégicos",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "Seção de postos de identificação biométrica",
                created_at: new Date(),
                updated_at: new Date(),
            },
        ];

        await queryInterface.createTable("sections", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });

        return queryInterface.bulkInsert("sections", sections);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("sections");
    },
};
