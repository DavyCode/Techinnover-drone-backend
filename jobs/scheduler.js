const CronJob = require('cron').CronJob;
const DronesDB = require("../db/drones.db");
const BatterLogsDB = require("../db/batteryLogs.db");
const { genUniqId } = require("../utils");

const scheduleAction = () => {
  const currentDate = new Date();

  DronesDB.forEach(drone => {
    BatterLogsDB.push({
      _id: genUniqId(),
      droneSerialNumber: drone.serialNumber,
      droneBatteryCapacity: drone.batteryCapacityPercentage,
      createdAt: new Date(Date.now()),
    })
  })
  console.log(`Check drones battery levels and create history/audit event log - ${currentDate.getHours()}:${currentDate.getMinutes()}`);
}

const scheduleJob = new CronJob(
  '*/60 * * * * *', // run every 60 seconds
  scheduleAction,
  null,
  true,
  'Europe/Paris'
);

module.exports = scheduleJob;