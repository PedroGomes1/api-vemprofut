module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('teams', 'quantity', {
      type: Sequelize.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('teams', 'quantity');
  },
};
