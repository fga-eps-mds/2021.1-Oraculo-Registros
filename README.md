# 2021.1-Oraculo-Registros

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/gpl-3.0.html)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2021.1-Oraculo-Processos&metric=alert_status)](https://sonarcloud.io/dashboard?id=fga-eps-mds_2021.1-Oraculo-Registros)

Essa API faz parte da arquitetura de microsserviços do projeto [`Oráculo`](https://github.com/fga-eps-mds/2021.1-Oraculo), e foi criada com a finalidade de gerenciar os usuários

## Como contribuir?

Gostaria de contribuir com nosso projeto? Acesse o nosso [guia de contribuição](https://fga-eps-mds.github.io/2021.1-Oraculo/CONTRIBUTING/) onde são explicados todos os passos.
Caso reste duvidas você também pode entrar em contato conosco criando uma issue.

## Documentação

A documentação do projeto pode ser acessada pelo nosso site em https://fga-eps-mds.github.io/2021.1-Oraculo/.

## Testes

Todas as funções adicionadas nessa API devem ser testadas, o repositŕorio aceita até 10% do total de linhas não testadas. Para rodar os testes nesse repositŕio deve ser executado o comando:

```bash
yarn run db:up
yarn run db:migrate
yarn run test
```

**Importante**: o padrão da variável DATABASE_URL é: `postgres://oraculo:oraculo123@localhost:5431/oraculo`

## Como rodar?

O arquivo `.env` possui configurações iniciais que podem ser alteradas de acordo com a necessidade. São elas:

- SECRET: chave para criptografia das senhas
- DB_USER: usuário de acesso ao banco de dados
- DB_PASS: senha de acesso ao banco de dados
- DB_NAME: nome da base de dados
- DB_HOST: host da base de dados

Veja o exemplo abaixo:

```
SECRET=chavedesegredo
DB_USER=api_user
DB_PASS=api_password
DB_NAME=api_database
DB_HOST=db_users
```

Para rodar a API é preciso usar os seguintes comandos usando o docker:

Suba o container com o comando:

```bash
yarn run docker:up
```

Suba as tabelas do banco de dados

```bash
yarn run db:migrate
```

**Importante**: lembre-se de editar o arquivo `.env`

A API estará rodando na [porta 8001](http://localhost:8001).

## Rotas

**GET: `/records`**

Endpoint para exibir todos os registros

- Resposta

```json
[
  {
    "id": 2,
    "register_number": "",
    "inclusion_date": "",
    "city": "",
    "state": "",
    "requester": "",
    "document_type": "",
    "document_number": "",
    "document_date": "",
    "description": "",
    "sei_number": "",
    "receipt_form": "",
    "contact_info": "",
    "situation": 2,
    "created_by": 3,
    "updatedAt": "",
    "createdAt": ""
  },
  {
    "id": 2,
    "register_number": "",
    "inclusion_date": "",
    "city": "",
    "state": "",
    "requester": "",
    "document_type": "",
    "document_number": "",
    "document_date": "",
    "description": "",
    "sei_number": "",
    "receipt_form": "",
    "contact_info": "",
    "situation": 1,
    "created_by": 1,
    "updatedAt": "",
    "createdAt": ""
  }
]
```

**GET: `/records/:id`**

Retorna os dados de um registro específico, só precisando do id no link

- Resposta

```json
{
  "id": 1,
  "register_number": "",
  "inclusion_date": "",
  "city": "",
  "state": "",
  "requester": "",
  "document_type": "",
  "document_number": "",
  "document_date": "",
  "description": "",
  "sei_number": "",
  "receipt_form": "",
  "contact_info": "",
  "situation": 2,
  "created_by": 3,
  "updatedAt": "",
  "createdAt": ""
}
```

**POST: `/records`**

Para criar um registro, envie os dados nesse formato:

- Requisição

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

- Resposta

```json
{
  "id": 2,
  "register_number": "",
  "inclusion_date": "",
  "city": "",
  "state": "",
  "requester": "",
  "document_type": "",
  "document_number": "",
  "document_date": "",
  "description": "",
  "sei_number": "",
  "receipt_form": "",
  "contact_info": "",
  "situation": 2,
  "created_by": 3,
  "updatedAt": "",
  "createdAt": ""
}
```

**POST: `/records/:id/forward`**

Para encaminhar um registro, basta envie os dados nesse formato:

```json
{
  "section_id": 1
}
```

- **id** é o id do registro a ser encaminhado
- **section_id** é o id da seção de destino

**GET: `/records/:id/sections`**

Para obter o histórico de seções por onde um registro passou, envie uma request
contendo o **id** do registro do qual você quer obter o histórico de seções

**GET: `/records/page/:page`**

Caso queira retornar os registros de forma paginada, envie
uma request no formato acima, aonde:

- :page: é o número da página que você deseja acessar. Esse número
  deverá ser incrementado de acordo com o limite de registros por página.

Exemplo:

- **GET: `/records/page/0`** irá retornar os 4 primeiros registros
- **GET: `/records/page/4`** irá retornar os 4 registros seguintes

**POST: `/records/:id/situation`**

Caso queira atualizar o status de um processo, envie os dados no formato a seguir:

```json
{
  "situation": ""
}
```

**GET: `/records/fields`**

Retorna dados sobre os campos dos registros

Resposta:

```json
{
  "name": "",
  "description": "",
  "created_by": 0
}
```

Se o `created_by` for zero, então significa que ele é um campo "default"

**GET: `/records/:id/history`**

Retorna todo o histórico de movimentação de um registro

```json
{
  "id": 0,
  "forwarded_by": 0,
  "origin_id": 0,
  "destination_id": 0,
  "createdAt": "",
  "updatedAt": "",
  "record_id": 0
}
```

**GET: `/records/:id/current-section`**

Retorna a localização da seção atual

```json
{
  "current_section": 0
}
```

**POST: `/users`**

Registra um novo usuário

```json
{
  "name": "",
  "email": ""
}
```
