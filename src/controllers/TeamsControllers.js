import Teams from '../models/Teams';

class TeamsController {
  async store(req, res) {
    const { teams, quantity, match_id } = req.body;

    const formattedTeams = teams.map((team) => ({
      name: team,
      quantity,
      match_id,
    }));

    const registerTeams = await Teams.bulkCreate(formattedTeams);

    return res.json(registerTeams);
  }
}

export default new TeamsController();
