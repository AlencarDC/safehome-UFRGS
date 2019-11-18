// This file is needed for Migrations work. Migrations still don't understand ES6 syntax
module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "safehome",
  database: "safehome",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
