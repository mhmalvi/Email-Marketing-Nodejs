import { Sequelize } from "@sequelize/core";
import { MySqlDialect } from "@sequelize/mysql";

const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: "email_marketing",
  user: "root",
  password: "",
  host: "localhost",
  port: 3306,
});
