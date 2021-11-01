const { Tag } = require("../Model/Tag");

async function createTag(req, res) {
    const { name, color } = req.body;

    try {
        const newTag = await Tag.create({ name, color });
        return res.status(200).json(newTag);
    } catch (err) {
        return res.status(500).json({ error: "could not create a new tag. try again" });
    }
}

async function listTags(req, res) {
    try {
        const tags = await Tag.findAll({ attributes: ["id", "name", "color"] });
        return res.status(200).json(tags);
    } catch (err) {
        return res.status(500).json({ error: "could not list all tags" });
    }
}

async function editTag(req, res) {
    const { id } = req.params;
    const { name, color } = req.body;

    const existingTag = await Tag.findByPk(id);
    if (!existingTag) {
        return res.status(400).json({ error: "could not find the specified tag" });
    }

    const editedTag = await existingTag.update({ name, color });
    if (!editedTag) {
        return res.status(500).json({ error: "could not edit the specified tag" });
    }

    return res.status(200).json({ message: "the tag has been edited" });
}

module.exports = { createTag, listTags, editTag };
