"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class subscribe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  subscribe.init(
    {
      subscription: DataTypes.TEXT,
      amount: DataTypes.INTEGER,
      interval: DataTypes.INTEGER,
      expDate: DataTypes.INTEGER("long"),
      userID: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Subscribe",
      tableName: "subscription",
    }
  );
  return subscribe;
};
