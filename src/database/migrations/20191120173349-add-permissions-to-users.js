module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("users", "manage_locks", {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }),
      queryInterface.addColumn("users", "manage_devices", {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      })
    ]);
  },

  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn("users", "manage_locks"),
      queryInterface.removeColumn("users", "manage_devices")
    ]);
  }
};
