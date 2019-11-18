require("dotenv/config");
// This file is needed for Migrations work. Migrations still don't understand ES6 syntax
module.exports = {
  dialect: "postgres",
  host: process.env.HOST,
  username: process.env.USER,
  password: process.env.PASS,
  database: process.env.NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
