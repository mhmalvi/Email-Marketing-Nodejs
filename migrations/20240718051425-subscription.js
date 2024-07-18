"use strict";

const { INTEGER } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("subscription", {
      id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
      subscription: { type: Sequelize.TEXT, allowNull: true },
      amount: { type: Sequelize.INTEGER, allowNull: true },
      interval: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 30 },
      expDate: { type: Sequelize.DATE, allowNull: true },
      userID: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("subscription");
  },
};
