import Sequelize, { Model } from 'sequelize';

class Players extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        year: Sequelize.INTEGER,
        position: Sequelize.STRING,
        is_active: Sequelize.BOOLEAN,
        user_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Matches, { foreignKey: 'user_id', as: 'users' });
  }
}

export default Players;
