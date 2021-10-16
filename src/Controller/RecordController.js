const Record = require("../Model/Record");
const Section = require("../Model/Section");
const { recordStatus } = require("../Model/Situation");
const { Op } = require("sequelize");

function generateRegisterNumber() {
  const date = new Date();
  const seq = date.getTime();
  return `${Math.round(seq)}/${date.getFullYear()}`;
}

async function getRecordByID(request, response) {
  const { id } = request.params;

  const record = await Record.findByPk(id);
  if (!record) {
    return response
      .status(400)
      .json({ error: `Could not find record with id ${id}` });
  }

  return response.json(record);
}

async function getAllRecords(request, response) {
  try {
    const records = await Record.findAll();
    if (!records.length) {
      return response.status(204).json({ error: "could not find any record" });
    }

    return response.json(records);
  } catch (failure) {
    console.error(`failed to get all records: ${failure}`);

    return response.status(400).json({ error: "could not find records" });
  }
}

async function createRecord(request, response) {
  const record = ({
    register_number,
    inclusion_date,
    city,
    state,
    requester,
    document_type,
    document_number,
    document_date,
    description,
    sei_number,
    receipt_form,
    contact_info,
    created_by,
  } = request.body);

  try {
    if (Number.parseInt(record.created_by, 10) < 1) {
      throw new Error("created_by -> invalid user id");
    }

    record.register_number = generateRegisterNumber();
    record.inclusion_date = new Date();

    const createdRecord = await Record.create(record);

    createdRecord.createSituation({ status: recordStatus.StatusPending });

    return response.status(200).json(createdRecord);
  } catch (error) {
    return response
      .status(500)
      .json({ error: `could not insert record into database: ${error}` });
  }
}

async function getRecordsByPage(req, res) {
  const { page } = req.params;
  const itemsPerPage = 4;

  try {
    const { rows, count } = await Record.findAndCountAll({
      limit: itemsPerPage,
      offset: page,
    });

    if (count === 0) {
      return res
        .status(204)
        .json({ info: "there are no records matching this query" });
    }

    return res.status(200).json(rows);
  } catch (err) {
    console.error(`error: ${err}`);
    return res.status(500).json({ error: "could not get records" });
  }
}

async function forwardRecord(req, res) {
  const { id } = req.params;
  const { section_id } = req.body;
  const sectionID = Number.parseInt(section_id);

  if (!Number.isFinite(sectionID)) {
    return res.status(400).json({ error: "invalid section id provided" });
  }

  const record = await Record.findByPk(id);
  const section = await Section.findByPk(sectionID);
  if (!record || !section) {
    return res.status(404).json({ error: "session or record not found" });
  }

  await record.addSection(section);

  return res
    .status(200)
    .json({ message: `record forwared to: ${section.name} ` });
}

async function getRecordSectionsByID(req, res) {
  const { id } = req.params;

  const record = await Record.findByPk(id, {
    include: {
      association: "sections",
      attributes: ["id", "name"],
    },
    through: {
      attributes: [],
    },
  });

  if (!record) {
    return res.status(404).json({ error: "record not found" });
  }

  return res.status(200).json(record.sections);
}

async function getTotalNumberOfRecords(req, res) {
  const allRecords = await Record.findAll();
  if (allRecords.length > 0) {
    return res.status(200).json({ count: `${allRecords.length}` });
  }

  return res.status(204).json({ message: "could not find records" });
}

async function getAllSections(req, res) {
  const sections = await Section.findAll({
    where: {
      [Op.gt]: {
        id: 3,
      },
    },
    attributes: ["id", "name"],
  });

  return res.status(200).json(sections);
}

module.exports = {
  getRecordByID,
  getAllRecords,
  createRecord,
  forwardRecord,
  getRecordSectionsByID,
  getRecordsByPage,
  getTotalNumberOfRecords,
  getAllSections,
};
