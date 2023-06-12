'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('food', 'note', {
        type: Sequelize.STRING,
        allowNull: false
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('food');
  }
};

