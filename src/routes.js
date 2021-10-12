const express = require("express");
const RecordController = require("./Controller/RecordController");

const routes = express.Router();

routes.get("/records", RecordController.getAllRecords);
routes.get("/records/:id/", RecordController.getRecordByID);
routes.post("/records", RecordController.createRecord);
routes.get("/records/page/:page", RecordController.getRecordsByPage);

module.exports = routes;
