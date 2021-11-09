const express = require("express");
const RecordController = require("./Controller/RecordController");
const UserController = require("./Controller/UserController");
const TagController = require("./Controller/TagController");
const SectionController = require("./Controller/SectionController");

const routes = express.Router();

routes.get("/records", RecordController.getAllRecords);
routes.get("/records/fields", RecordController.getFields);
routes.get("/records/with-sei", RecordController.findRecordWithSeiNumber);
routes.get("/records/department/:id", RecordController.getDepartmentRecords);
routes.get("/records/:id", RecordController.getRecordByID);
routes.post("/records", RecordController.createRecord);
routes.get("/records/page/:page", RecordController.getRecordsByPage);
routes.post("/records/:id/forward", RecordController.forwardRecord);
routes.get("/records/:id/sections", RecordController.getRecordSectionsByID);
routes.post("/records/:id/status", RecordController.setRecordSituation);
routes.post("/records/:id/close", RecordController.closeRecord);
routes.post("/records/:id/reopen", RecordController.reopenRecord);
routes.get("/records/:id/history", RecordController.getRecordsHistory);
routes.get("/records/:id/current-section", RecordController.findCurrentSection);
routes.get("/count/records", RecordController.getTotalNumberOfRecords);
routes.post("/tag/new", TagController.createTag);
routes.get("/tags/all", TagController.listTags);
routes.post("/tag/:id/edit", TagController.editTag);
routes.get("/records/:id/tags", RecordController.getRecordTags);
routes.post("/records/:id/add-tag", RecordController.addTagToRecord);
routes.get("/sections", SectionController.listSections);
routes.post("/records/:id/edit", RecordController.editRecord);
routes.post("/users", UserController.createUser);
routes.get("/user/by-mail", UserController.getUserByMail);

module.exports = routes;
