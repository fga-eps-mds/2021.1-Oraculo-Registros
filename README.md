# 2021.1-Oraculo-Processos
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/gpl-3.0.html)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2021.1-Oraculo-Processos&metric=alert_status)](https://sonarcloud.io/dashboard?id=fga-eps-mds_2021.1-Oraculo-Processos)


Essa API faz parte da arquitetura de microsserviços do projeto [`Oráculo`](https://github.com/fga-eps-mds/2021.1-Oraculo), sua funcionalidade é em questão de criar e editar os usuários do sistema.

## Como contribuir?

Gostaria de contribuir com nosso projeto? Acesse o nosso [guia de contribuição](https://fga-eps-mds.github.io/2021.1-Oraculo/CONTRIBUTING/) onde são explicados todos os passos.
Caso reste duvidas você também pode entrar em contato conosco criando uma issue.

## Documentação

A documentação do projeto pode ser acessada pelo nosso site em https://fga-eps-mds.github.io/2021.1-Oraculo/.

## Testes

Todas as funções adicionadas nessa API devem ser testadas, o repositŕorio aceita até 10% do total de linhas não testadas. Para rodar os testes nesse repositŕio deve ser executado o comando:

```bash
docker-compose up -d --build
npm install
npx sequelize-cli db:migrate --config src/Database/config/config.json
npx jest --coverage --forceExit
```

## Como rodar?

O arquivo .env possui configurações iniciais que podem ser alteradas de acordo com a necessidade. São elas:

-   SECRET: chave para criptografia das senhas
-   DB_USER: usuário de acesso ao banco de dados
-   DB_PASS: senha de acesso ao banco de dados
-   DB_NAME: nome da base de dados
-   DB_HOST: host da base de dados

Veja o exemplo abaixo:

```
SECRET=chavedesegredo
DB_USER=api_user
DB_PASS=api_password
DB_NAME=api_database
DB_HOST=db_users
```

Para rodar a API é preciso usar os seguintes comandos usando o docker:

Crie uma network para os containers da API, caso não exista:

```bash
docker network create processos-network
```

Suba o container com o comando:

```bash
docker-compose up
```

A API estará rodando na [porta 8000](http://localhost:3000).

## Rotas

**GET: `/records`**

Endpoint para exibir todos os registros

-   Resposta

```json
[
    {
        "id": 2,
        "register_number": "1633221330438/2021",
        "inclusion_date": "2021-10-03T00:35:30.438Z",
        "city": "df",
        "state": "BA",
        "requester": "policia federal",
        "document_type": "e-mail",
        "document_number": "10/04/2021",
        "document_date": "15/04/2021",
        "description": "ABCDEFGHIJKL",
        "sei_number": "1234",
        "receipt_form": "form",
        "contact_info": "info@gmail.com",
        "situation": 2,
        "created_by": 3,
        "updatedAt": "2021-10-03T00:35:30.438Z",
        "createdAt": "2021-10-03T00:35:30.438Z"
    },
    {
        "id": 3,
        "register_number": "1633221330439/2021",
        "inclusion_date": "2021-10-03T00:39:30.438Z",
        "city": "goiania",
        "state": "GO",
        "requester": "policia federal",
        "document_type": "e-mail",
        "document_number": "10/04/2021",
        "document_date": "15/04/2021",
        "description": "ABCDEFGHIJKL",
        "sei_number": "1234",
        "receipt_form": "form",
        "contact_info": "info1@gmail.com",
        "situation": 2,
        "created_by": 3,
        "updatedAt": "2021-10-03T00:35:30.438Z",
        "createdAt": "2021-10-03T00:35:30.438Z"
    }
]
```

**GET: `/records/:id`**

Retorna os dados de um processo específico, só precisando do id no link

-   Resposta

```json
    register_number: "123121776555673",
    inclusion_date: "14/04/2021",
    city: "df",
    state: "bahia",
    requester: "policia federal",
    document_type: "e-mail",
    document_number: "10/04/2021",
    document_date: "15/04/2021",
    description: "ABCDEFGHIJKL",
    sei_number: "1234",
    receipt_form: "form",
    contact_info: "info@gmail.com",
    situation: 2,
    created_by: 3,

```

**POST: `/records`**

Para criar um registro, envie os dados nesse formato:

-   Requisição

```json
    register_number: "",
    inclusion_date: "",
    city: "",
    state: "",
    requester: "",
    document_type: "",
    document_number: "",
    document_date: "",
    description: "",
    sei_number: "",
    receipt_form: "",
    contact_info: "",
    situation: <numero>,
    created_by: <numero>,
```

-   Resposta

```json
{
    "id": 2,
    "register_number": "1633221330438/2021",
    "inclusion_date": "2021-10-03T00:35:30.438Z",
    "city": "df",
    "state": "bahia",
    "requester": "policia federal",
    "document_type": "e-mail",
    "document_number": "1314/2021",
    "document_date": "15/04/2021",
    "description": "processo de teste",
    "sei_number": "1234",
    "receipt_form": "email",
    "contact_info": "info@gmail.com",
    "situation": 2,
    "created_by": 3,
    "updatedAt": "2021-10-03T00:35:30.438Z",
    "createdAt": "2021-10-03T00:35:30.438Z"
}
```
