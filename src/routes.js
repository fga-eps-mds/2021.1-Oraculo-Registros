const express = require("express");
const RecordController = require("./Controller/RecordController");
const UserController = require("./Controller/UserController");
const TagController = require("./Controller/TagController");
const DepartmentController = require("./Controller/DepartmentController");

const routes = express.Router();

routes.get("/records", RecordController.getAllRecords);
routes.get("/records/fields", RecordController.getFields);
routes.post("/records/with-sei", RecordController.findRecordWithSeiNumber);
routes.get("/records/department/:id", RecordController.getDepartmentRecords);
routes.get("/records/:id", RecordController.getRecordByID);
routes.post("/records", RecordController.createRecord);
routes.post("/records/page/:page", RecordController.getRecordsByPage);
routes.post("/records/:id/forward", RecordController.forwardRecord);
routes.get("/records/:id/departments", RecordController.getDepartmentsByID);
routes.post("/records/:id/status", RecordController.setRecordSituation);
routes.post("/records/:id/close", RecordController.closeRecord);
routes.post("/records/:id/reopen", RecordController.reopenRecord);
routes.get("/records/:id/history", RecordController.getRecordsHistory);
routes.get("/records/:id/current-department", RecordController.findCurrentDepartment);
routes.get("/count/records", RecordController.getTotalNumberOfRecords);
routes.post("/tag/new", TagController.createTag);
routes.get("/tags/all", TagController.listTags);
routes.post("/tag/:id/edit", TagController.editTag);
routes.get("/records/:id/tags", RecordController.getRecordTags);
routes.post("/records/:id/add-tag", RecordController.addTagToRecord);
routes.get("/departments", DepartmentController.listDepartments);
routes.post("/records/:id/edit", RecordController.editRecord);
routes.post("/users", UserController.createUser);
routes.post("/user/by-mail/", UserController.getUserByMail);
routes.post("/departments", DepartmentController.createDepartment);
routes.post("/records/with-date", RecordController.findAllRecordsOfOneDate);

module.exports = routes;
