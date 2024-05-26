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
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      fromMail: { type: DataTypes.STRING },
      fromName: { type: DataTypes.TEXT },
      count: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      modelName: "CampaignQueue",
    }
  );
  return CampaignQueue;
};
