const { Sequelize } = require("sequelize");
const { Situation } = require("../Model/Situation");
const Record = require("../Model/Record");
const Section = require("../Model/Section");
const config = require("./config/database");

async function setupModels(db) {
    Record.init(db);
    Situation.init(db);
    Section.init(db);

    Record.associate(db.models);
    Situation.associate(db.models);
    Section.associate(db.models);
}

async function setupSequelize(cfg) {
    return new Sequelize(cfg);
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
    const db = await setupSequelize(config);
    const auth = db.authenticate();
    return configure(auth, db);
}

module.exports = {
    initializeDatabase,
};
