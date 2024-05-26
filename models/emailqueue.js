'use strict';
const {
  Model
} = require('sequelize');
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
  EmailQueue.init({
    id: DataTypes.INTEGER,
    subject: DataTypes.TEXT,
    fromName: DataTypes.TEXT,
    fromMail: DataTypes.STRING,
    recipientName: DataTypes.TEXT,
    recipientEmail: DataTypes.STRING,
    group: DataTypes.INTEGER,
    templateName: DataTypes.TEXT,
    templateData: DataTypes.TEXT("long"),
    campaignID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
    open: DataTypes.INTEGER,
    click: DataTypes.INTEGER,
    bounce: DataTypes.INTEGER,
    deliver: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'EmailQueue',
  });
  return EmailQueue;
};