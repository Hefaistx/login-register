'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('UserIntakes', 'userId', {
        type: Sequelize.DATE,
        allowNull: false
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserIntakes');
  }
};