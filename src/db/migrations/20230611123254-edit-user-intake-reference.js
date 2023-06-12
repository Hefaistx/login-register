'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hapus kolom userId
    await queryInterface.addColumn('UserIntakes', 'userId', {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    await queryInterface.addConstraint('UserIntakes', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_user_intake_user_id',
      references: {
        table: 'Users',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },
  }