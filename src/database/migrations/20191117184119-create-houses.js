module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("houses", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      cameras_status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      alarm_status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable("houses")
};
