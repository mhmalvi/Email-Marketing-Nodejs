const { Sequelize } = require("@sequelize/core");
const { MySqlDialect } = require("@sequelize/mysql");

const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: "email_marketing",
  user: "root",
  password: "",
  host: "localhost",
  port: 3306,
});
