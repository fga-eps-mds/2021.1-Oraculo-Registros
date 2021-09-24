const { Sequelize } = require("sequelize");
const Process = require("../Model/Process");
const config = require("./config/database");

async function initializeDb() {
	const db = new Sequelize(config);

	let auth = db.authenticate();

	return new Promise((resolve, reject) => {
		auth.then(
			() => {
				Process.init(db);

				resolve(0);
			},
			(rejected) => {
				console.error(`failed to authenticate: ${rejected}`);
				reject(1);
			}
		).catch((reason) => {
			console.error(`Failed to connect: ${reason}`);
			reject(1);
		});
	});
}

module.exports = {
	initializeDb,
};
