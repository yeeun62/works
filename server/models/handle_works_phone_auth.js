'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class handle_works_phone_auth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  handle_works_phone_auth.init({
    phoneNumber: DataTypes.STRING,
    authNumber: DataTypes.STRING,
    time: DataTypes.STRING,
    result: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'handle_works_phone_auth',
  });
  return handle_works_phone_auth;
};