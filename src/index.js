const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const env = require("dotenv");
const morgan = require("morgan");
const { initializeDatabase } = require("./Database");

const app = express();
env.config();
const { PORT, APP_PORT, CORS } = process.env;

let corsOptions = {
  origin: (CORS === "") ? "http://localhost:3000" : `${CORS}`,
};

app.use(cors());
app.use(morgan("short"));
app.use(express.json());
app.use(routes);
app.disable("x-powered-by");

if (PORT === undefined) {
  app.listen(APP_PORT);
  console.log(`HTTP server started on port ${APP_PORT}`);
} else {
  app.listen(PORT);
  console.log(`HTTP server started on port ${PORT}`);
}

initializeDatabase().then(() => {
  console.info("connected to database");
});

module.exports = app;
