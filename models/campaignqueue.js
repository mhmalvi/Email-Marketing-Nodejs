"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CampaignQueue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CampaignQueue.init(
    {
      fromMail: DataTypes.STRING,
      fromName: DataTypes.TEXT,
      count: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "CampaignQueue",
    }
  );
  return CampaignQueue;
};
