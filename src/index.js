const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const env  = require('dotenv');
require('./Database');

const app = express();
env.config();
const { APP_PORT } = process.env;

async function start() {
    app.use(cors());
    app.use(express.json());
    app.use(routes);
    return app.listen(APP_PORT);
}

let server = start();

server.then(() => {
    console.log(`Started HTTP server on port ${APP_PORT}`);
}, (rejected) => {
    console.error(`Failed to start HTTP server: ${rejected}`);
});

module.exports = app;
