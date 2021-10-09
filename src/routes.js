const express = require("express");
const RecordController = require("./Controller/RecordController");

const routes = express.Router();

async function parseBody(req, res, next) {
    try {
        JSON.parse(req.body);
        next();
    } catch (err) {
        return res
            .status(400)
            .json({ error: "invalid request, please check JSON syntax" });
    }
}

routes.get("/records", RecordController.getAllRecords);
routes.get("/records/:id/", RecordController.getRecordByID);
routes.post("/records", parseBody, RecordController.createRecord);
routes.post("/records/:id/forward", parseBody, RecordController.forwardRecord);
routes.get("/records/:id/sections", RecordController.getRecordSectionsByID);

module.exports = routes;
