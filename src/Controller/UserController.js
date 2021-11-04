const { User } = require("../Model/User");

async function createUser(req, res) {
  const { name, email, section_id } = req.body;

  try {
    await User.create({ name, email, section_id });
  } catch (err) {
    console.error(`failed to create user: ${err}`);
    return res.status(500).json({ error: "could not create user" });
  }

  return res.status(200).json({ message: "user created successfully" });
}

module.exports = { createUser };
