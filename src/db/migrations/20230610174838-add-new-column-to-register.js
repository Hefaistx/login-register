'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'age', {
        type: Sequelize.INTEGER,
      });
    
    await queryInterface.addColumn('users', 'height', {
      type: Sequelize.DOUBLE,
    });

    await queryInterface.addColumn('users', 'weight', {
      type: Sequelize.DOUBLE
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserIntakes');
  }
};