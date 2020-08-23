'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VoiceChannel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  VoiceChannel.init({
    guildID: DataTypes.STRING,
    channelID: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'VoiceChannel',
  });
  return VoiceChannel;
};