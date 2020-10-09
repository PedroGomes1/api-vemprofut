module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('matches', 'user_id', {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('matches', 'user_id');
  },
};
