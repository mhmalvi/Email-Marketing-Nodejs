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
    await queryInterface.addColumn("Users", "amount", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
    await queryInterface.addColumn("Users", "interval", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 30,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
    //  * await queryInterface.dropTable('users');
     */
    await queryInterface.dropColumn("Users", "amount");
    await queryInterface.dropColumn("Users", "interval");
  },
};
