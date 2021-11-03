const { Section } = require("../Model/Section");

async function listSections(req, res) {
  const sections = await Section.findAll({
    include: {
      attributes: ["id", "name"],
    },
  });

  return res.status(200).json(sections);
}

module.exports = { listSections };
