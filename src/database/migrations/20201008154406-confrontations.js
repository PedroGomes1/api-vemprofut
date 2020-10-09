module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('confrontations', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      team_one: {
        type: Sequelize.INTEGER,
        references: { model: 'teams', key: 'id' },
        allowNull: false,
      },
      team_two: {
        type: Sequelize.INTEGER,
        references: { model: 'teams', key: 'id' },
        allowNull: false,
      },
      match_id: {
        type: Sequelize.INTEGER,
        references: { model: 'matches', key: 'id' },
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
    return queryInterface.dropTable('confrontations');
  },
};
