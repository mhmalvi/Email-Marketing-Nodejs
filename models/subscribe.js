'use strict';
const {
  Model
} = require('sequelize');
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
  subscribe.init({
    id: DataTypes.INTEGER,
    subscription: DataTypes.TEXT,
    amount: DataTypes.INTEGER,
    interval: DataTypes.INTEGER,
    expDate: DataTypes.DATE,
    userID: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'subscribe',
  });
  return subscribe;
};