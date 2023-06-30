'use strict';

const express = require('express');
const DronesDB = require('./db/drones.db');
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

exports.default = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});
