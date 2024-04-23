const sequelize = require("sequelize");
const db = require("../../db/db");
var user = db.define(
  "user",
  {
    id: { type: sequelize.INTEGER, primaryKey: true },
    username: { type: sequelize.STRING },
    password: { type: sequelize.STRING },
    google_id: { type: sequelize.STRING },
    token: { type: sequelize.STRING },
  },
  {
    // freeze name table not using *s on name
    freezeTableName: true,
    // dont use createdAt/update
    timestamps: true,
  }
);
module.exports = user;
