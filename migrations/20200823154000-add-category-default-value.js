'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'VoiceChannels',
      'category',
      {
        type: Sequelize.STRING,
        defaultValue: 'GENERAL'
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('VoiceChannels', 'category')
  }
};
