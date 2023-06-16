'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'age', {
        type: Sequelize.INTEGER,
      });
    
    await queryInterface.addColumn('Users', 'height', {
      type: Sequelize.DOUBLE,
    });

    await queryInterface.addColumn('Users', 'weight', {
      type: Sequelize.DOUBLE
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserIntakes');
  }
};