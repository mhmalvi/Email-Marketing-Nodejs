"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subadmin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Subadmin.init(
    {
      email: DataTypes.TEXT,
      userName: DataTypes.TEXT,
      password: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      userID: DataTypes.TEXT,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Subadmin",
      tableName: "subadmins",
    }
  );
  return Subadmin;
};
