"use strict";
const { Model } = require("sequelize");
const { Table } = require("@sequelize/core/decorators-legacy");
module.exports = (sequelize, DataTypes) => {
  Table({ tableName: "Campaign_queues" });
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
      userID: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "CampaignQueue",
      tableName: "Campaigns_queues",
    }
  );
  return CampaignQueue;
};
