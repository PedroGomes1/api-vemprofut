import Sequelize from 'sequelize';
import { response } from 'express';
import Players from '../models/Players';
import Teams from '../models/Teams';
import Matches from '../models/Matches';

class PlayersControllers {
  async store(req, res) {
    const { name, year, position, team_id, match_id } = req.body;

    // Buscando todos os times daquela partida
    const searchTeamExists = await Teams.findAll({
      raw: true,
      where: {
        match_id,
      },
    }).map((team) => team.id);

    if (!searchTeamExists) {
      return response.status(400).json('Match not found');
    }

    // Buscando todos jogadores do time
    const findAllPlayers = await Players.findAll({
      raw: true,
      where: {
        team_id,
      },
      attributes: [[Sequelize.col('team.name'), 'time']],
      include: [
        {
          model: Teams,
          as: 'team',
          attributes: [],
        },
      ],
    });

    // Verificando a quantidade de jogadores daquele time
    const { quantity } = await Teams.findOne({
      raw: true,
      where: {
        id: team_id,
      },
      attributes: ['quantity'],
    });

    if (findAllPlayers.length >= quantity) {
      return res.status(400).json({
        error: `O limite de jogadores do time ${findAllPlayers[0].time} foi ultrapassado!`,
      });
    }

    await Players.create({
      name,
      year,
      position,
      team_id,
      match_id,
    });

    return res.json(searchTeamExists);
  }

  async index(req, res) {
    const { match_id } = req.query;

    const players = await Players.findAll({
      where: {
        match_id,
      },
      include: [
        {
          model: Teams,
          as: 'team',
          attributes: ['id', 'name'],
        },
        {
          model: Matches,
          as: 'matches',
          attributes: ['id', 'name'],
        },
      ],
      order: [[{ model: Teams, as: 'team' }, 'name', 'ASC']],
    });

    return res.json(players);
  }

  async delete(req, res) {
    const { id } = req.params;

    const findPlayer = await Players.findByPk(id);

    if (!findPlayer) {
      return res.status(400).json('Player not found');
    }

    await findPlayer.destroy();

    return res.json('');
  }
}

export default new PlayersControllers();
