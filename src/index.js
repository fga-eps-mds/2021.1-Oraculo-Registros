const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const env = require("dotenv");
const morgan = require("morgan");
const { initializeDatabase } = require("./Database");

const app = express();
env.config();
const { APP_PORT } = process.env;

let corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(morgan("short"));
app.use(express.json());
app.use(routes);
app.disable("x-powered-by");
app.listen(APP_PORT);

console.log(`HTTP server started on port ${APP_PORT}`);

initializeDatabase().catch((reason) => {
  console.error(`could not connect to database: ${reason}`);
  process.exit(1);
});

console.log("connected to database");

module.exports = app;
