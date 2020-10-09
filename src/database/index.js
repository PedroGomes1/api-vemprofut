import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../models/Users';
import Players from '../models/Players';
import Teams from '../models/Teams';
import Matches from '../models/Matches';
import Confrontations from '../models/Confrontations';

const models = [User, Teams, Players, Matches, Confrontations];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
