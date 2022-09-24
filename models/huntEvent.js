'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class huntEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  huntEvent.init({
    eventName: DataTypes.STRING,
    uuid: DataTypes.STRING,
    data: DataTypes.JSON

    // image: DataTypes.STRING, Datapoints stored in data
    // name: DataTypes.STRING,
    // nftTypeId: DataTypes.STRING,
    // creatorTypeId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'huntEvent',
  });
  return huntEvent;
};