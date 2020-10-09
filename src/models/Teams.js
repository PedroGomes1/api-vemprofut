import Sequelize, { Model } from 'sequelize';

class Teams extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        quantity: Sequelize.INTEGER,
        match_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Matches, { foreignKey: 'match_id', as: 'matches' });
  }
}

export default Teams;
