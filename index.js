'use strict';

const express = require('express');
const DronesDB = require('./db/drones.db');
const MedicationsDB = require('./db/medications.db');
const { genUniqId } = require("./utils");
const {
  BadRequestError,
  NotFoundError,
  InternalServerError,
  errorHandler
} = require("./utils/error");
const { 
  PORT,
} = require('./config/env');
const { regDroneValidator } = require('./middleware/input.validation');

const app = express();
app.use(express.json());

// DB Operations
const getDrones = () => DronesDB;
const getMeds = () => MedicationsDB;

const registerDrone = (item) => {
  const droneExist = findDroneBySerialNumber(item.serialNumber)

  if (droneExist) {
    throw new BadRequestError("Drone with the given serialNumber exist")
  }

  DronesDB.push(item)

  return findDroneBySerialNumber(item.serialNumber)
}

const findDroneBySerialNumber = (serialNumber) => {
  return getDrones().find((drone) => drone.serialNumber === serialNumber)
}


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
    res.status(200).json({ data: allDrones, status: "success" });
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
    res.status(200).json({ data: allMeds, status: "success" });
  } catch (error) {
    throw new InternalServerError(error.message);
  }
});

/**
 * Registering a drone
 */
app.post('/api/drones/register', regDroneValidator, (req, res) => {
  try {
    const item = {
      ...req.body,
      _id: genUniqId(),
      weightLimitKg: 500,
      batteryCapacityPercentage: 100,
      loadedItems: [],
    }

    const createdDrone = registerDrone(item)
    
    return res.status(201).json({ data: createdDrone, status: "success" })
  } catch (error) {
    throw new InternalServerError(error.message)
  }
});

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});
