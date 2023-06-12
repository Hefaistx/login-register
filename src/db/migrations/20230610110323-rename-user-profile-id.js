'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('UserProfiles', 'id', 'userId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('UserProfiles', 'userId', 'id');
  }
};
