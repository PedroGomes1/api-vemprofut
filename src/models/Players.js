import Sequelize, { Model } from 'sequelize';

class Players extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        year: Sequelize.INTEGER,
        position: Sequelize.STRING,
        team_id: Sequelize.INTEGER,
        match_id: Sequelize.INTEGER,
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
  }
}

export default Players;
