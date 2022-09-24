'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hunt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Hunt.init({
    eventUUID: DataTypes.STRING, 
    ticketId: DataTypes.STRING, 
    data: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Hunt',
  });
  return Hunt;
};