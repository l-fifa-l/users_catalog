import User from '../models/user';

export const addUser = async (req, res) => {
  try {
    const { name, email, username } = req.body;
    // validate the user name, email, password
    if (!name) return res.status(400).send('Name is required');
    if (!username || username.length < 4) {
      return res
        .status(400)
        .send('Username is required and should be min 4 character long');
    }
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send('Email is taken');

    //register
    const user = new User({
      name,
      email,
      username,
    });

    // save user
    await user.save();
    // console.log("saved user", user);
    return res.json({ ok: true });
  } catch (error) {
    console.log(error);
    return res.status(400).send('Error! Try Again');
  }
};

export const getAllUsers = async (req, res) => {
  User.find()
    .then((User) => res.json(User))
    .catch((err) => res.status(400).json('Error: ' + err));
};
