const Process = require("../Model/Process");

async function getProcessByID(request, response) {
	const { id } = request.params;

	try {
		const process = await Process.findOne(id);

		return response.json(process);
	} catch (failure) {
		console.error(`failed to get process by id: ${failure}`);

		return response.status(400).json({ error: "Invalid ID" });
	}
}

async function getAllProcesses(request, response) {
	try {
		const processes = await Process.findAll();

		return response.json(processes);
	} catch (failure) {
		console.error(`failed to get all processes: ${failure}`);

		return response.status(400).json({ error: "Could not find processes" });
	}
}

async function createProcess(request, response) {
	const {
		regNum,
		originLocation,
		location,
		sourceDocument,
		documentDescription,
		seiNumber,
		receivedBy,
		answerDocument,
		contactInfo,
	} = request.params;

	try {
		const createdProcess = await Process.create({
			regNum,
			originLocation,
			location,
			sourceDocument,
			documentDescription,
			seiNumber,
			receivedBy,
			answerDocument,
			contactInfo,
		});

		return response.json(createdProcess);
	} catch (error) {
		return response
			.status(500)
			.json({ error: "could not insert process into database" });
	}
}

module.exports = {
	getProcessByID,
	getAllProcesses,
	createProcess,
};
