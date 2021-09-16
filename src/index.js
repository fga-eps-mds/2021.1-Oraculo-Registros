const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const {Sequelize} = require('sequelize');
const env  = require('dotenv');
const Process = require('./Model/Process');

env.config();

const {
    DB_USER,
    DB_PASS,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    APP_PORT,
} = process.env;

const app = express();

const db = new Sequelize({
        username: `${DB_USER}`,
        password: `${DB_PASS}`,
        database: `${DB_NAME}`,
        port: `${DB_PORT}`,
        dialect: "postgres",
        host: Number.parseInt(`${DB_HOST}`),
        define: {
            timestamps: true,
            underscored: true,
        }
    }
);

db.authenticate().catch((reason) => {
    console.error(`failed to authenticate: ${reason}`);
});

Process.init(db);

app.listen(APP_PORT);
app.use(cors());
app.use(express.json());
app.use(routes);

module.exports = app;
