const Record = require("../Model/Record");
const Field = require("../Model/Field");
const History = require("../Model/History");
const { User } = require("../Model/User");
const { Situation } = require("../Model/Situation");
const { Tag } = require("../Model/Tag");
const {
  ERR_RECORD_NOT_FOUND,
  ERR_NO_ERROR,
  ERR_STATUS_ALREADY_SET,
} = require("../Constants/errors");
const { formatRecordSequence, getNextRecordNumber } = require("./RecordNumberController");
const { Op } = require("sequelize");
const { Department } = require("../Model/Department");

async function findCurrentDepartment(req, res) {
  const { id } = req.params;
  const recordID = Number.parseInt(id);

  if (!Number.isFinite(recordID)) {
    return res.status(400).json({ error: "invalid record id" });
  }

  const history = await History.findAll({
    where: {
      record_id: recordID,
    },
  });

  const lastEntry = history[history.length - 1];

  return res.status(200).json({
    current_department: lastEntry.destination_id,
    current_department_name: lastEntry.destination_name,
  });
}

async function getRecordByID(request, response) {
  const { id } = request.params;
  const recordID = Number.parseInt(id);

  if (!Number.isFinite(recordID)) {
    return response.status(400).json({ error: "invalid record id" });
  }

  const record = await Record.findByPk(recordID);
  if (!record) {
    return response
      .status(404)
      .json({ error: `Could not find record with id ${recordID}` });
  }

  return response.json(record);
}

async function getAllRecords(request, response) {
  const records = await Record.findAll();
  if (!records.length) {
    return response.status(204).json({ error: "could not find any record" });
  }

  // FIXME: we need to limit this
  return response.json(records);
}

async function createRecord(req, res) {
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
  } = req.body);

  try {
    // find email of user who created record
    const createdBy = String(record.created_by);
    const user = await User.findOne({ where: { email: createdBy } });
    if (!user) {
      return res
        .status(404)
        .json({ error: "could not find user who created the record" });
    }

    const sequence = await getNextRecordNumber();

    record.register_number = formatRecordSequence(
      sequence.record_seq,
      sequence.record_year
    );

    record.inclusion_date = new Date();
    record.assigned_to = createdBy;
    record.situation = Situation.StatusPending;

    const departmentID = Number.parseInt(user.department_id);
    const createdRecord = await Record.create(record);
    const department = await Department.findByPk(departmentID);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    // Adds entry to history
    const history = {
      created_by: createdBy,
      created_at: new Date(),
      origin_id: department.id,
      origin_name: department.name,
      record_id: createdRecord.id,
    };

    const tag = await Tag.findOne({ where: { name: "Tramitar" } });
    await createdRecord.setDepartments([department]);
    await createdRecord.setTags([tag]);

    await History.create(history);

    const fullRecord = await Record.findByPk(createdRecord.id, {
      include: [{ association: "tags" }, { association: "departments" }],
    });

    return res.status(200).json(fullRecord);
  } catch (error) {
    console.error(`could not insert record: ${error}`);
    return res.status(500).json({ error: `could not insert record into database` });
  }
}

async function getRecordsByPage(req, res) {
  const { page } = req.params;
  const itemsPerPage = 30;

  try {
    const { rows, count } = await Record.findAndCountAll({
      limit: itemsPerPage,
      offset: page,
    });

    if (count === 0) {
      return res.status(204).json({ info: "there are no records matching this query" });
    }

    return res.status(200).json(rows);
  } catch (err) {
    console.error(`error: ${err}`);
    return res.status(500).json({ error: "could not get records" });
  }
}

async function forwardRecord(req, res) {
  const { id } = req.params;
  const { destination_id, origin_id, forwarded_by } = req.body;
  const recordID = Number.parseInt(id);
  const originID = Number.parseInt(origin_id);
  const destinationID = Number.parseInt(destination_id);
  const forwardedBy = String(forwarded_by);

  if (!Number.isFinite(originID) || !Number.isFinite(destinationID)) {
    return res.status(400).json({ error: "invalid Department id provided" });
  }

  const record = await Record.findByPk(recordID);
  const originDepartment = await Department.findByPk(originID);
  const destinationDepartment = await Department.findByPk(destinationID);
  if (!record || !destinationDepartment || !originDepartment) {
    return res.status(404).json({ error: "session or record not found" });
  }

  // find user in database
  const user = await User.findOrCreate({ where: { email: forwardedBy } });
  if (!user) {
    return res
      .status(404)
      .json({ error: "record cannot be forwarded by a inexistent user" });
  }

  if (user.department_id !== originID) {
    return res.status(400).json({
      error: `department mismatch for '${user.name}': ${user.department_id} is not ${originID}`,
    });
  }

  const history = {
    forwarded_by: forwardedBy,
    origin_id: originID,
    origin_name: originDepartment.name,
    destination_id: destinationID,
    destination_name: destinationDepartment.name,
    record_id: recordID,
  };

  // updates history
  // forward record to department
  await record.addDepartment(destinationDepartment);
  await History.create(history);

  return res.status(200).json({
    forwarded_by: `${user.email}`,
    forwarded_by_name: `${user.name}`,
    forwarded_from: `${originDepartment.name}`,
    forwarded_to: `${destinationDepartment.name}`,
  });
}

async function getDepartmentsByID(req, res) {
  const { id } = req.params;

  const record = await Record.findByPk(id, {
    include: {
      association: "departments",
      attributes: ["id", "name"],
    },
    through: {
      attributes: [],
    },
  });

  if (!record) {
    return res.status(404).json(ERR_RECORD_NOT_FOUND);
  }

  return res.status(200).json(record.departments);
}

async function updateRecordStatus(situation, id) {
  const record = await Record.findByPk(id);
  if (!record) {
    return ERR_RECORD_NOT_FOUND;
  }

  if (record.situation === situation) {
    return ERR_STATUS_ALREADY_SET;
  }

  record.situation = situation;
  await record.save();

  return ERR_NO_ERROR;
}

function isValidSituation(situation) {
  return (
    situation === Situation.StatusPending ||
    situation === Situation.StatusRunning ||
    situation === Situation.StatusFinished
  );
}
async function setRecordSituation(req, res) {
  const { id } = req.params;
  const { situation } = req.body;
  const recordID = Number.parseInt(id);

  if (!isValidSituation(situation)) {
    return res.status(400).json({ error: "invalid situation provided" });
  }

  const result = await updateRecordStatus(situation, recordID);
  if (result === ERR_RECORD_NOT_FOUND) {
    return res.status(404).json(result);
  }

  const updatedRecord = await Record.findByPk(recordID);

  return res.status(200).json({
    message: "successfully changed situation",
    record: updatedRecord,
  });
}

async function getFields(req, res) {
  Field.findAll({
    attributes: ["name", "description", "created_by"],
  }).then((fields) => {
    return res.status(200).json(fields);
  });
}

async function getRecordsHistory(req, res) {
  const { id } = req.params;
  const recordID = Number.parseInt(id);

  const record = await Record.findByPk(recordID);
  if (!record) {
    return res.status(404).json(ERR_RECORD_NOT_FOUND);
  }

  const recordHistory = await History.findAll({
    where: {
      record_id: recordID,
    },
  });

  return res.status(200).json(recordHistory);
}

async function getTotalNumberOfRecords(req, res) {
  const allRecords = await Record.findAll();
  if (allRecords.length > 0) {
    return res.status(200).json({ count: `${allRecords.length}` });
  }

  return res.status(204).json({ message: "could not find records" });
}

async function getDepartmentRecords(req, res) {
  const { id } = req.params;
  const departmentID = Number.parseInt(id);

  const department = await Department.findByPk(departmentID, {
    include: ["records"],
  });
  if (!department) {
    return res.status(404).json({ error: "department not found" });
  }

  const records = await department.getRecords();
  if (records.length === 0) {
    return res.status(204).json({
      message: "no records could be found on the specified department",
    });
  }

  return res.status(200).json(records);
}

async function getRecordTags(req, res) {
  const { id } = req.params;
  const recordID = Number.parseInt(id);

  const record = await Record.findByPk(recordID);

  if (!record) {
    return res.status(404).json(ERR_RECORD_NOT_FOUND);
  }

  const tags = await record.getTags();
  if (tags.length === 0) {
    return res.status(204).json({ message: "this record has no associated tags" });
  }

  return res.status(200).json(tags);
}

async function addTagToRecord(req, res) {
  const { tag_id } = req.body;
  const { id } = req.params;
  const tagID = Number.parseInt(tag_id);
  const recordID = Number.parseInt(id);

  try {
    const record = await Record.findByPk(recordID);
    if (!record) {
      return res.status(404).json(ERR_RECORD_NOT_FOUND);
    }

    const tag = await Tag.findByPk(tagID);
    if (!tag) {
      return res.status(404).json({ error: "tag not found" });
    }

    await record.addTag(tag);

    return res
      .status(200)
      .json({ message: `tag added to record ${record.register_number}` });
  } catch (err) {
    console.error(`internal error during tag search: ${err}`);
    return res.status(500).json({ error: "internal error while searching for tag" });
  }
}

async function editRecord(req, res) {
  const { id } = req.params;
  const recordID = Number.parseInt(id);

  const newInfo = ({
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
  } = req.body);

  try {
    const record = await Record.findByPk(recordID);
    if (!record) {
      return res.status(404).json({ error: "record not found" });
    }

    record.inclusion_date = newInfo.inclusion_date;
    record.city = newInfo.city;
    record.state = newInfo.state;
    record.requester = newInfo.requester;
    record.document_type = newInfo.document_type;
    record.document_number = newInfo.document_number;
    record.document_date = newInfo.document_date;
    record.description = newInfo.description;
    record.sei_number = newInfo.sei_number;
    record.receipt_form = newInfo.receipt_form;
    record.contact_info = newInfo.contact_info;

    await record.save();

    const editedRecord = await Record.findByPk(recordID);

    return res.status(200).json(editedRecord);
  } catch (err) {
    console.error(`could not edit record: ${err}`);
    return res.status(500).json({ error: "could not edit record" });
  }
}

async function closeRecord(req, res) {
  const { id } = req.params;
  const { closed_by, reason } = req.body;
  const recordID = Number.parseInt(id);

  if (!reason) {
    return res
      .status(400)
      .json({ error: "you should specify a reason to close a record" });
  }

  try {
    const result = await updateRecordStatus(Situation.StatusFinished, recordID);
    if (result === ERR_RECORD_NOT_FOUND) {
      return res.status(404).json(result);
    } else if (result === ERR_STATUS_ALREADY_SET) {
      return res.status(400).json(result);
    }

    if (!closed_by) {
      return res.status(400).json({ error: "invalid user information provided" });
    }

    const user = await User.findOne({ where: { email: closed_by } });
    if (!user) {
      return res
        .status(404)
        .json({ error: `user '${closed_by}' is not registered here` });
    }

    await History.create({
      closed_by,
      closed_at: new Date(),
      record_id: recordID,
      reason,
    });

    return res.status(200).json({ message: "record closed successfully" });
  } catch (err) {
    return res.status(500).json({ error: "internal server error while closing record" });
  }
}

async function reopenRecord(req, res) {
  const { id } = req.params;
  const { reopened_by, reason } = req.body;
  const recordID = Number.parseInt(id);

  if (!reason) {
    return res
      .status(400)
      .json({ error: "you should specify a reason to close a record" });
  }

  try {
    const result = await updateRecordStatus(Situation.StatusRunning, recordID);
    if (result === ERR_RECORD_NOT_FOUND) {
      return res.status(404).json(result);
    } else if (result === ERR_STATUS_ALREADY_SET) {
      return res.status(400).json(result);
    }

    if (!reopened_by) {
      return res.status(400).json({ error: "invalid user information provided" });
    }

    const user = await User.findOne({ where: { email: String(reopened_by) } });
    if (!user) {
      return res
        .status(404)
        .json({ error: `user '${reopened_by}' is not registered here` });
    }

    await History.create({
      reopened_by,
      reopened_at: new Date(),
      record_id: recordID,
      reason,
    });

    return res.status(200).json({ message: "record reopened successfully" });
  } catch (err) {
    return res.status(500).json({ error: "internal server error during record reopen" });
  }
}

async function findRecordWithSeiNumber(req, res) {
  const { sei_number } = req.body;
  const seiNumber = String(sei_number);

  if (seiNumber.length === 0) {
    return res.status(400).json({ error: "empty sei number provided" });
  }

  const record = await Record.findOne({ where: { sei_number: seiNumber } });
  if (!record) {
    return res.status(200).json({ found: false });
  }

  return res.status(200).json({ found: true });
}

module.exports = {
  getRecordByID,
  getAllRecords,
  createRecord,
  forwardRecord,
  getDepartmentsByID,
  getRecordsByPage,
  setRecordSituation,
  getFields,
  getRecordsHistory,
  findCurrentDepartment,
  getTotalNumberOfRecords,
  getDepartmentRecords,
  getRecordTags,
  addTagToRecord,
  editRecord,
  closeRecord,
  reopenRecord,
  findRecordWithSeiNumber,
};
