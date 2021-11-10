const { Department } = require("../Model/Department");

async function listDepartments(req, res) {
  const departments = await Department.findAll({
    attributes: ["id", "name"],
  });

  return res.status(200).json(departments);
}

module.exports = { listDepartments };
