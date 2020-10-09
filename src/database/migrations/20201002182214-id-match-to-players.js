module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('players', 'match_id', {
      type: Sequelize.INTEGER,
      references: { model: 'matches', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('players', 'match_id');
  },
};
