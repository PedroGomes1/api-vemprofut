module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('players', 'is_active', {
      type: Sequelize.BOOLEAN,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      defaultValue: true,
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('players', 'is_active');
  },
};
