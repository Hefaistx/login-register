'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserIntakes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      id: {
        type: Sequelize.BIGINT
      },
      userId: {
        type: Sequelize.INTEGER
      },
      day: {
        type: Sequelize.DATE
      },
      carbohydrates: {
        type: Sequelize.INTEGER
      },
      sugar: {
        type: Sequelize.DOUBLE
      },
      proteins: {
        type: Sequelize.DOUBLE
      },
      calories: {
        type: Sequelize.DOUBLE
      },
      fat: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserIntakes');
  }
};