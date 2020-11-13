import Sequelize, { Model } from 'sequelize';

class MatchesPlayers extends Model {
  static init(sequelize) {
    super.init(
      {
        match_id: Sequelize.INTEGER,
        team_id: Sequelize.INTEGER,
        player_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Teams, { foreignKey: 'team_id', as: 'team' });
    this.belongsTo(models.Matches, { foreignKey: 'match_id', as: 'matches' });
    this.belongsTo(models.Players, { foreignKey: 'player_id', as: 'players' });
  }
}

export default MatchesPlayers;
