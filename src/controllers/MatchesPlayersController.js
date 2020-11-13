import Sequelize from 'sequelize';
import MatchesPlayers from '../models/MatchesPlayers';
import Teams from '../models/Teams';
import Players from '../models/Players';
import Matches from '../models/Matches';

class MatchesPlayersController {
  async store(req, res) {
    const { player_id, team_id, match_id } = req.body;

    // Validação se o time é valido
    const existingTeams = await Teams.findByPk(team_id);

    if (!existingTeams) {
      return res.status(400).json('Team not found');
    }

    // Buscando todos jogadores do time
    const findAllPlayers = await MatchesPlayers.findAll({
      raw: true,
      where: {
        team_id,
      },
      include: [
        {
          model: Teams,
          as: 'team',
          attributes: [],
        },
      ],
      attributes: [[Sequelize.col('team.name'), 'time']], // Trazer o nome do time no erro
    });

    if (findAllPlayers.length >= existingTeams.quantity) {
      return res.status(400).json({
        error: `O limite de jogadores do time ${findAllPlayers[0].time} foi ultrapassado!`,
      });
    }
    const player = await MatchesPlayers.create({
      player_id,
      team_id,
      match_id,
    });

    return res.json(player);
  }

  async index(req, res) {
    const { match_id } = req.params;

    const players = await MatchesPlayers.findAll({
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
        {
          model: Players,
          as: 'players',
          attributes: ['id', 'name', 'year', 'position'],
        },
      ],
      order: [[{ model: Teams, as: 'team' }, 'name', 'ASC']],
    });

    return res.json(players);
  }

  async delete(req, res) {
    const { id } = req.params;

    const findPlayer = await MatchesPlayers.findByPk(id);

    if (!findPlayer) {
      return res.status(400).json('Player not found');
    }

    await findPlayer.destroy();

    return res.json('');
  }
}

export default new MatchesPlayersController();
