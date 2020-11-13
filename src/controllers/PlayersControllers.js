import { Op } from 'sequelize';
import Players from '../models/Players';

class PlayersControllers {
  async store(req, res) {
    const { name, year, position, user_id } = req.body;

    const player = await Players.create({
      name,
      year,
      position,
      user_id,
    });

    return res.json(player);
  }

  async index(req, res) {
    const idUser = req.userId;
    const { namePlayer, is_active } = req.query;

    const players = await Players.findAll({
      where: {
        user_id: idUser,
        name: namePlayer
          ? {
              [Op.like]: `%${namePlayer}%`,
            }
          : { [Op.like]: '%' },
        is_active: is_active
          ? {
              [Op.like]: `%${Number(is_active)}%`,
            }
          : { [Op.like]: '%' },
      },
      order: [['is_active']],
    });

    return res.json(players);
  }

  async update(req, res) {
    const { idPlayer } = req.params;

    const { is_active } = req.body;

    const player = await Players.findByPk(idPlayer);

    if (!player) {
      return res.status(400).json('Jogador não encontrado');
    }

    await player.update({
      is_active,
    });

    return res.json(player);
  }
}

export default new PlayersControllers();
