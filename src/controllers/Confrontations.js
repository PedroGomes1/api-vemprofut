import Confrontations from '../models/Confrontations';
import Teams from '../models/Teams';

class ConfrontationsController {
  async store(req, res) {
    const { teams, match_id, quantity_teams } = req.body;

    const myArray = [];

    // Pegar a quantidade de times, e dividir por 2 para conseguir total de confrontos
    const totalClashes = quantity_teams / 2;

    for (let i = 0; i < totalClashes; i++) {
      const random = () => {
        return Math.random() * 2 - 1;
      };

      teams.sort(random);
      // A partir do primeiro índice, removo 2 times do array
      const resultRandomTwoTeams = teams.splice(0, 2);

      myArray.push({
        team_one: resultRandomTwoTeams[0],
        team_two: resultRandomTwoTeams[1],
        match_id,
      });
    }

    const match = await Confrontations.bulkCreate(myArray);

    return res.json(match);
  }

  async index(req, res) {
    const { match_id } = req.query;

    const confrontations = await Confrontations.findAll({
      where: {
        match_id,
      },
      include: [
        {
          model: Teams,
          as: 'teamone',
          attributes: ['id', 'name'],
        },
        {
          model: Teams,
          as: 'teamtwo',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(confrontations);
  }
}

export default new ConfrontationsController();
