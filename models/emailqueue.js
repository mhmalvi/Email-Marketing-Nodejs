"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EmailQueue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmailQueue.init(
    {
      subject: DataTypes.TEXT,
      fromName: DataTypes.TEXT,
      fromEmail: DataTypes.STRING,
      recipientName: DataTypes.TEXT,
      recipientEmail: DataTypes.STRING,
      group: DataTypes.INTEGER,
      templateName: DataTypes.TEXT,
      templateData: DataTypes.TEXT("long"),
      campaignID: DataTypes.INTEGER,
      userID: DataTypes.INTEGER,
      schedule: DataTypes.STRING,
      open: DataTypes.INTEGER,
      click: DataTypes.INTEGER,
      bounce: DataTypes.INTEGER,
      deliver: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },

    {
      sequelize,
      modelName: "EmailQueue",
      tableName: "email_queues",
    }
  );
  return EmailQueue;
};
