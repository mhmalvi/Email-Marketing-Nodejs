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
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      subject: { type: DataTypes.TEXT },
      fromName: { type: DataTypes.TEXT },
      fromMail: { type: DataTypes.STRING },
      recipientName: { type: DataTypes.TEXT },
      recipientEmail: { type: DataTypes.STRING },
      group: { type: DataTypes.INTEGER },
      templateName: { type: DataTypes.TEXT },
      templateData: { type: DataTypes.TEXT("long") },
      campaignID: { type: DataTypes.INTEGER },
      userID: { type: DataTypes.INTEGER },
      open: { type: DataTypes.INTEGER },
      click: { type: DataTypes.INTEGER },
      bounce: { type: DataTypes.INTEGER },
      deliver: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      modelName: "EmailQueue",
    }
  );
  return EmailQueue;
};
