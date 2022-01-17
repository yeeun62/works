'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('handle_works_purchase_agreements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      requester: {
        type: Sequelize.INTEGER
      },
      responser: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      productName: {
        type: Sequelize.STRING
      },
      productInfo: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      reason: {
        type: Sequelize.STRING
      },
      result: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('handle_works_purchase_agreements');
  }
};