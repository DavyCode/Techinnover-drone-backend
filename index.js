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

const loadDrone = (droneId, medication) => {

  getDrones().forEach(drone => {
    if (drone._id === droneId) {

      checkDroneWeight(drone, medication);

      if (drone.state !== "LOADING") {
        throw new BadRequestError("Drone is not currently loading");
      }

      if (drone.batteryCapacityPercentage < 25) {

        drone.state = "IDLE";

        throw new BadRequestError("Drone out of battery capacity, recharge!");
      }

      drone.loadedWeightsKg += medication.weight;

      if (drone.loadedWeightsKg === drone.weightLimitKg) {
        drone.state = "LOADED"
      }

      drone.loadedItems.push(medication);
    }
  });

  return findDroneById(droneId)
}

const findMedByCode = (code) => {
  return getMeds().find((med) => med.code === code)
}

const findDroneById = (droneId) => {
  return getDrones().find((drone) => drone._id === droneId)
}

const checkDroneWeight = (drone, medication) => {
  const totalWeight = drone.loadedWeightsKg + medication.weight;

  if (totalWeight > drone.weightLimitKg){
    throw new BadRequestError("Drone overload, please use another drone");
  }
}

const getLoadingDrones = () => {
  return getDrones().filter(drone => drone.state === "LOADING")
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

/**
 * Load a drone with medication items
 */
app.post('/api/drones/:droneId/load/:medCode', (req, res) => {
  try {
    // find the med
    const medication = findMedByCode(req.params.medCode);
    if (!medication) {
      throw new NotFoundError("Medication with the given code not found")
    }

    // find the drone to load
    const drone = findDroneById(req.params.droneId);
    if (!drone) {
      throw new NotFoundError("Drone with the given droneId not found")
    }

    // load med to drone
    const loadedDrone = loadDrone(drone._id, medication);

    return res.status(200).json({ data: loadedDrone });
  } catch (error) {
    throw new InternalServerError(error.message)
  }
});

/**
 * checking loaded medication items for a given drone
 */
app.get('/api/drones/:droneId/items', (req, res) => {
  try {
    const drone = findDroneById(req.params.droneId);
    if (!drone) {
      throw new NotFoundError("Drone not found");
    }

    return res.status(200).json({ data: drone.loadedItems });
  } catch (error) {
    throw new InternalServerError(error.message)
  }
});

/**
 * check available drones for loading
 */
app.get('/api/drones/available', (req, res) => {
  try {
    const drone = getLoadingDrones();
    if (drone.length < 1) {
      throw new NotFoundError("All drones are busy at this time");
    }

    return res.status(200).json({ data: drone });
  } catch (error) {
    throw new InternalServerError(error.message)
  }
})

/**
 * check drone battery level for a given drone
 */
app.get('/api/drones/:droneId/battery', (req, res) => {
  try {
    const drone = findDroneById(req.params.droneId);
    if (!drone) {
      throw new NotFoundError("Drone not found");
    }

    return res.status(200).json({ data: { 
      batteryCapacityPercentage: drone.batteryCapacityPercentage
    }});
  } catch (error) {
    throw new InternalServerError(error.message)
  }
})

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});
