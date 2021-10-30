const express = require("express");
const RecordController = require("./Controller/RecordController");
const UserController = require("./Controller/UserController");
const TagController = require("./Controller/TagController");

const routes = express.Router();

routes.get("/records", RecordController.getAllRecords);
routes.get("/records/fields", RecordController.getFields);
routes.get("/records/department/:id", RecordController.getDepartmentRecords);
routes.get("/records/:id", RecordController.getRecordByID);
routes.post("/records", RecordController.createRecord);
routes.get("/records/page/:page", RecordController.getRecordsByPage);
routes.post("/records/:id/forward", RecordController.forwardRecord);
routes.get("/records/:id/sections", RecordController.getRecordSectionsByID);
routes.post("/records/:id/status", RecordController.setRecordSituation);
routes.get("/records/:id/history", RecordController.getRecordsHistory);
routes.get("/records/:id/current-section", RecordController.findCurrentSection);
routes.post("/users", UserController.createUser);
routes.get("/count/records", RecordController.getTotalNumberOfRecords);
routes.post("/tag/new", TagController.createTag);
routes.get("/tags/all", TagController.listTags);
routes.post("/tag/:id/edit", TagController.editTag);
routes.get("/records/:id/tags", RecordController.getRecordTags);
routes.post("/records/:id/add-tag", RecordController.addTagToRecord);

module.exports = routes;
