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
    await queryInterface.createTable("google_users", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      userName: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      googleId: {
        type: Sequlize.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "1=superadmin,2=admin,3=customer",
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("google_users");
  },
};
