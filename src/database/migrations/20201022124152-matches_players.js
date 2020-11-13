module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('matches_players', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      match_id: {
        type: Sequelize.INTEGER,
        references: { model: 'matches', key: 'id' },
        allowNull: false,
      },
      player_id: {
        type: Sequelize.INTEGER,
        references: { model: 'players', key: 'id' },
        allowNull: false,
      },
      team_id: {
        type: Sequelize.INTEGER,
        references: { model: 'teams', key: 'id' },
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface) => {
    return queryInterface.dropTable('matches_players');
  },
};
