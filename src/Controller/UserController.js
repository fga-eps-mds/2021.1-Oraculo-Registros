const { User } = require("../Model/User");

async function createUser(req, res) {
  const { name, email, department_id } = req.body;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "invalid email provided" });
  }

  try {
    await User.create({ name, email, department_id });
  } catch (err) {
    console.error(`failed to create user: ${err}`);
    return res.status(500).json({ error: "could not create user" });
  }

  return res.status(200).json({ message: "user created successfully" });
}

async function getUserByMail(req, res) {
  const { email } = req.params;

  try{
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error(`failed to search user: ${err}`);
    return res.status(404).json({ error: "could not find user" });
  }
}

module.exports = { createUser, getUserByMail };
