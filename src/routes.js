const express = require('express');
const ProcessController = require('./Controller/ProcessController');
const check  = require('./Utils/jwt');

const routes = express.Router();

routes.get('/processos', check.verifyJWT, ProcessController.getAllProcesses);
routes.get('/processos/:id/', check.verifyJWT, ProcessController.getProcessByID);
routes.post('/processos', check.verifyJWT, ProcessController.createProcess);

module.exports = routes;
