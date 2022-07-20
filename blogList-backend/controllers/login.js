const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  if (!user) {
    return response.status(401).send({ error: 'invalid username' });
  }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!passwordCorrect) {
    return response.status(401).send({ error: 'incorrect password' });
  }

  const userForToken = {
    username: user.username,
    _id: user._id
  };
  
  const token = jwt.sign(
    userForToken, 
    process.env.SECRET,
    { expiresIn: 3600 }
  );

  response.status(200).send({ 
    token, 
    username: user.username, 
    name: user.name 
  });
});

module.exports = loginRouter;
