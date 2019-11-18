module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("users", "house_id", {
      type: Sequelize.INTEGER,
      references: { model: "houses", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      allowNull: true
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn("users", "house_id");
  }
};
