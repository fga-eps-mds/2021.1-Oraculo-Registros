const { Sequelize } = require("sequelize");
const { Situation } = require("../Model/Situation");
const Record = require("../Model/Record");
const { Section } = require("../Model/Section");
const Field = require("../Model/Field");
const History = require("../Model/History");
const { User } = require("../Model/User");
require("dotenv").config();

const { PROD, DATABASE_URL } = process.env;

function loadEnvironment(testing) {
  let options;

  if (DATABASE_URL === undefined || DATABASE_URL === "" || testing === 1) {
    console.error("DATABASE_URL: empty required environment variable");
    if (testing === 1) {
      return null;
    }

    // we should exit on production or homol environment
    process.exit(1);
  }

  // Checks if we are being deployed at production/homol environment
  if (PROD === "true" || testing === 2) {
    options = {
      dialect: "postgres",
      define: {
        timestamps: true,
        underscored: true,
      },
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: false,
    };
  } else {
    options = {
      dialect: "postgres",
      define: {
        timestamps: true,
        underscored: true,
      },
      logging: false,
    };
  }

  console.info(`environment: ${PROD}`);
  console.info(`database url: ${DATABASE_URL}`);
  console.info(`database settings: ${JSON.stringify(options)}`);

  return options;
}

async function setupModels(db) {
  Record.init(db);
  Situation.init(db);
  Field.init(db);
  History.init(db);
  User.init(db);
  Section.init(db);

  Record.associate(db.models);
  Situation.associate(db.models);
  History.associate(db.models);
  User.associate(db.models);
  Section.associate(db.models);
}

async function setupSequelize() {
  return new Sequelize(DATABASE_URL, loadEnvironment());
}

async function configure(auth, db) {
  return new Promise((resolve, reject) => {
    auth.then(() => {
      setupModels(db);
      resolve(0);
    });
  });
}

async function initializeDatabase() {
  const db = await setupSequelize();
  const auth = db.authenticate();
  return configure(auth, db);
}

module.exports = {
  initializeDatabase,
  loadEnvironment,
};
