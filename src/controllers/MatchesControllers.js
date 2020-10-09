import Matches from '../models/Matches';

class PlayersControllers {
  async store(req, res) {
    const { name } = req.body;
    const user_id = req.userId;

    const match = await Matches.create({
      name,
      user_id,
    });
    return res.json(match);
  }

  async index(req, res) {
    const idUser = req.userId;

    const searchMatch = await Matches.findAll({
      where: {
        user_id: idUser,
      },
    });

    if (!searchMatch) {
      return res.status(400).json('Match not found');
    }

    return res.json(searchMatch);
  }
}

export default new PlayersControllers();
