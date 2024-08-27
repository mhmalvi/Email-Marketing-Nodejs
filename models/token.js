"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Token.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Token.init(
    {
      email: DataTypes.STRING,
      token: DataTypes.STRING,
      semail: DataTypes.STRING,
      satok: DataTypes.STRING,
      said: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      role: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Token",
      tableName: "tokens",
    }
  );
  return Token;
};
