const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const env = require("dotenv");
const morgan = require("morgan");
const { initializeDb } = require("./Database");

const app = express();
env.config();
const { APP_PORT } = process.env;

app.use(cors());
app.use(morgan("short"));
app.use(express.json());
app.use(routes);

if (require.main == module) {
	app.listen(APP_PORT);
	console.log(`HTTP server started on port ${APP_PORT}`);
	initializeDb();
}

module.exports = app;
