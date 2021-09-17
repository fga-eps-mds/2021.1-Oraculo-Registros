const { Sequelize } = require('sequelize');
const Process = require('../Model/Process');
const config = require('./config/database');

console.log("Starting database client");

const db = new Sequelize(config);

let auth = db.authenticate();

auth.then(()=> {
    console.log(`connected to database`);

    Process.init(db);

}, (rejected) => {
    console.error(`failed to authenticate: ${rejected}`);
});

module.exports = db;
