const { app } = require('./index');
const express = require('express');
const ProcessController = require('./Controller/ProcessController');
const check  = require('./Utils/jwt');

const routes = express.Router();

routes.get('/processes', check.verifyJWT, ProcessController.getAllProcesses);
routes.get('/processes/:id/', check.verifyJWT, ProcessController.getProcessByID);
routes.post('/processes', check.verifyJWT, ProcessController.createProcess);

module.exports = routes;
