const { express } = require('express');
const { cors } = require('cors');
const { routes } = require('./routes');
const { Sequelize } = require('sequelize');
const { env } = require('dotenv');
const { Process } = require('./Model/Process');

env.config();

const {
    DB_USER,
    DB_PASS,
    DB_HOSTNAME,
    DB_PORT,
    DB_NAME,
} = process.env;

const app = express();

const db = new Sequelize({
        dialect: "postgres",
        host: `postgres://${DB_USER}:${DB_PASS}@${DB_HOSTNAME}:${DB_PORT}/${DB_NAME}`
    }
);

Process.init(db);

try {
    db.authenticate();
} catch(error) {
    console.error(`failed to connect with database: ${error}`);
}

app.listen(8000);
app.use(cors());
app.use(express.json());
app.use(routes);

module.exports = app;
