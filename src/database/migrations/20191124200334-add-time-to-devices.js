module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("eletric_devices", "turn_on_time", {
        type: Sequelize.TIME,
        allowNull: false,
        defaultValue: "00:00:00"
      }),
      queryInterface.addColumn("eletric_devices", "turn_off_time", {
        type: Sequelize.TIME,
        allowNull: false,
        defaultValue: "00:00:00"
      }),
      queryInterface.addColumn("locks", "turn_on_time", {
        type: Sequelize.TIME,
        allowNull: false,
        defaultValue: "00:00:00"
      }),
      queryInterface.addColumn("locks", "turn_off_time", {
        type: Sequelize.TIME,
        allowNull: false,
        defaultValue: "00:00:00"
      })
    ]);
  },

  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn("eletric_devices", "turn_on_time"),
      queryInterface.removeColumn("eletric_devices", "turn_off_time"),
      queryInterface.removeColumn("locks", "turn_on_time"),
      queryInterface.removeColumn("locks", "turn_off_time")
    ]);
  }
};
