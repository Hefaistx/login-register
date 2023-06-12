'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hapus foreign key yang salah
    await queryInterface.removeConstraint('UserIntakes', 'UserIntakes_userId_fkey');

    // Tambahkan foreign key baru dengan referensi yang benar
    await queryInterface.addConstraint('UserIntakes', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'UserIntakes_userId_fkey',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
