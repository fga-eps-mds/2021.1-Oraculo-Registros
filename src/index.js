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

initializeDatabase().then(
  () => {
    console.info(`connected to database`);
  },
  () => {
    console.error(`could not connect to database`);
    process.exit(0);
  }
);

module.exports = app;
