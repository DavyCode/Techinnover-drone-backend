'use strict';

const express = require('express');
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




/**********************************************
 * ROUTE HANDLER
 ***************************************************/

/**
 * Check API
 */
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Api is up'});
});

exports.default = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});
