const express = require("express");
const RecordController = require("./Controller/RecordController");

const routes = express.Router();

routes.get("/records", RecordController.getAllRecords);
routes.get("/records/:id/", RecordController.getRecordByID);
routes.post("/records", RecordController.createRecord);

module.exports = routes;
