import User from '../models/Users';

class UserController {
  async store(req, res) {
    const { email, name, password } = req.body;

    const userExists = await User.findOne({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    await User.create({ name, email, password });

    return res.json({
      name,
      email,
    });
  }
}

export default new UserController();
