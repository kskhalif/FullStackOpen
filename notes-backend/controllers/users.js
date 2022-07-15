const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/user');
const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();
passwordSchema
  .is().min(8)
  .is().max(100)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().symbols()
  .has().not().spaces();

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.send(users);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;
  const errors = passwordSchema.validate(password, { list: true });
  if (errors.length) {
    return response.status(400).send({ error: errors });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const newUser = new User({ username, name, passwordHash });
  const savedUser = await newUser.save();
  response.status(201).send(savedUser);
});

module.exports = usersRouter;
