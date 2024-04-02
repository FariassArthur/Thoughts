const { Sequelize } = require("sequelize");
const pg = require('pg')
require('dotenv').config()

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.SECRET_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectModule: pg
  }
);

try {
  sequelize.authenticate();
  console.log("Conectamos no banco");
} catch (err) {
  console.error("Não foi possível conectar ao banco", err);
}

module.exports = sequelize;
