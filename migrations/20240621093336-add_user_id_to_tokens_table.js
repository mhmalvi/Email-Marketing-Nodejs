"use strict";
const User = require('../models').User

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Tokens", "userID", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        tableName: 'users', // name of the source table
        key: "id", // key in the source table that the foreign key references
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("Tokens", "userID");
  },
};
