'use strict';

const express = require('express');
const DronesDB = require('./db/drones.db');
const MedicationsDB = require('./db/medications.db');
const {
  BadRequestError,
  NotFoundError,
  InternalServerError
} = require("./utils/error");
const { 
  PORT,
} = require('./config/env');

const app = express();
app.use(express.json());

// DB Operations
const getDrones = () => DronesDB;
const getMeds = () => MedicationsDB;

/**********************************************
 * ROUTE HANDLER
 ***************************************************/

/**
 * Check API
 */
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Api is up'});
});

/**
 * Get all drones
 */
app.get('/api/drones', (req, res) => {
  try {
    const allDrones = getDrones();
    res.status(200).json({ data: allDrones });
  } catch (error) {
    throw new InternalServerError(error.message);
  }
});

/**
 * Get all medications
 */
app.get('/api/medications', (req, res) => {
  try {
    const allMeds = getMeds();
    res.status(200).json({ data: allMeds });
  } catch (error) {
    throw new InternalServerError(error.message);
  }
});

exports.default = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});
