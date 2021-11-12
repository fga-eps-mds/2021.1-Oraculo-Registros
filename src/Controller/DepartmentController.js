const { Department } = require("../Model/Department");

async function listDepartments(req, res) {
  const departments = await Department.findAll({
    attributes: ["id", "name"],
    order: [['name', 'ASC']]
  });

  return res.status(200).json(departments);
}

async function createDepartment(req, res) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({
      error: "lacks of information to register department",
    });
  }

  try {
    const newDepartment = await Department.create({ name, is_admin: true });
    return res.status(200).send(newDepartment);
  } catch (error) {
    console.log(`could not create department: ${error}`);
    return res
      .status(500)
      .json({ error: "internal error during department creation" });
  }
}

module.exports = { listDepartments, createDepartment };
