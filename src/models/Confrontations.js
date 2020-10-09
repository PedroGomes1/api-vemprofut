import Sequelize, { Model } from 'sequelize';

class Confrontations extends Model {
  static init(sequelize) {
    super.init(
      {
        team_one: Sequelize.STRING,
        team_two: Sequelize.STRING,
        match_id: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Teams, { foreignKey: 'team_one', as: 'teamone' });
    this.belongsTo(models.Teams, { foreignKey: 'team_two', as: 'teamtwo' });
    this.belongsTo(models.Matches, { foreignKey: 'match_id', as: 'matches' });
  }
}

export default Confrontations;
