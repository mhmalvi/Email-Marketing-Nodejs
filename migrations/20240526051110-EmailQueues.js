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
    await queryInterface.createTable("Email_queues", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      subject: { type: Sequelize.TEXT, allowNull: false },
      fromName: { type: Sequelize.TEXT, allowNull: false },
      fromEmail: { type: Sequelize.STRING, allowNull: false },
      recipientName: { type: Sequelize.TEXT, allowNull: false },
      recipientEmail: { type: Sequelize.STRING, allowNull: false },
      group: { type: Sequelize.TEXT, allowNull: true },
      templateName: { type: Sequelize.TEXT, allowNull: false },
      templateData: { type: Sequelize.TEXT("long"), allowNull: false },
      campaignID: { type: Sequelize.INTEGER, allowNull: false },
      userID: { type: Sequelize.INTEGER, allowNull: false },
      schedule: { type: Sequelize.STRING, allowNull: true },
      open: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "0=not opened,1=opened",
      },
      click: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "0=not clicked,1=clicked",
      },
      bounce: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "0=not bounced,1=bounced",
      },
      deliver: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "0=not delivered,1=delivered",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("Email_queues");
  },
};
