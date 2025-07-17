const { Sequelize } = require("@sequelize/core");
const { MySqlDialect } = require("@sequelize/mysql");

const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: process.env.DB_NAME || "email_marketing",
  user: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  logging: console.log, // Enable logging for debugging
  define: {
    timestamps: true,
    underscored: false,
  },
});

module.exports = sequelize;
