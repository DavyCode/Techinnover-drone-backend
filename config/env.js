const dotenv = require("dotenv");
// Load .env
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
}