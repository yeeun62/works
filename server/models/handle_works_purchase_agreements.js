'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class handle_works_purchase_agreements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  handle_works_purchase_agreements.init({
    requester: DataTypes.INTEGER,
    responser: DataTypes.INTEGER,
    title: DataTypes.STRING,
    productName: DataTypes.STRING,
    productInfo: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    reason: DataTypes.STRING,
    result: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'handle_works_purchase_agreements',
  });
  return handle_works_purchase_agreements;
};