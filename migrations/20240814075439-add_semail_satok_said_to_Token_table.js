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
    await queryInterface.addColumn("tokens", "semail", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("tokens", "satok", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("tokens", "said", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
