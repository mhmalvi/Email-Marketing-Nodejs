"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("contacts", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      batchID: { type: Sequelize.STRING, allowNull: false },
      json: { type: Sequelize.STRING, allowNull: false },
      name: { type: Sequelize.INTEGER, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false },
      company: { type: Sequelize.STRING, allowNull: true },
      group: { type: Sequelize.TEXT, allowNull: true },
      company: { type: Sequelize.STRING, allowNull: true },
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
    await queryInterface.dropTable("contacts");
  },
};
