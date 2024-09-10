"use strict";
const { Model, TEXT } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contact.init(
    {
      json: DataTypes.JSON,
      batchID: DataTypes.STRING,
      company: DataTypes.TEXT,
      name: DataTypes.TEXT,
      email: DataTypes.TEXT,
      user_id: DataTypes.INTEGER,
      group: DataTypes.TEXT,
      untitled1: DataTypes.STRING,
      untitled2: DataTypes.STRING,
      untitled3: DataTypes.STRING,
      untitled4: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Contact",
    }
  );
  return Contact;
};
