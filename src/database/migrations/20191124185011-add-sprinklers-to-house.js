module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("houses", "sprinklers_status", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn("houses", "sprinklers_status");
  }
};
