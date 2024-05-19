'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Persons', 'phoneNumber', {
      type: Sequelize.BIGINT,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Persons', 'phoneNumber', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  }
};