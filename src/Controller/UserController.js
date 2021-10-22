const { User } = require("../Model/User");

async function createUser(req, res) {
  const { name, email } = req.body;

  try {
    await User.create({ name, email });
  } catch (err) {
    console.error(`failed to create user: ${err}`);
    return res.status(500).json({ error: "could not create user" });
  }

  return res.status(200).json({ message: "user created successfully" });
}

module.exports = { createUser };
