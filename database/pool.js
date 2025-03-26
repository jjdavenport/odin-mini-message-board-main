require("dotenv").config();
const { Pool } = require("pg");
const HOSTNAME = process.env.DB_HOSTNAME;
const USER = process.env.USER;
const DATABASE = process.env.DATABASE;
const PASSWORD = process.env.PASSWORD;
const PORT = process.env.DB_PORT;
// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
module.exports = new Pool({
  host: HOSTNAME, // or wherever the db is hosted
  user: USER,
  database: DATABASE,
  password: PASSWORD,
  port: PORT,
});
