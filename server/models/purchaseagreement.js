"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class purchaseAgreement extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	purchaseAgreement.init(
		{
			requester: DataTypes.INTEGER,
			responser: DataTypes.INTEGER,
			title: DataTypes.STRING,
			productName: DataTypes.STRING,
			productInfo: DataTypes.STRING,
			quantity: DataTypes.INTEGER,
			price: DataTypes.INTEGER,
			totalPrice: DataTypes.INTEGER,
			reason: DataTypes.STRING,
			result: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: "purchaseAgreement",
		}
	);
	return purchaseAgreement;
};
