'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserProfiles');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserIntakes');
  }
};