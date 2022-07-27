const testingRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user');
const noteHelper = require('../tests/note_test_helper');
const userHelper = require('../tests/user_test_helper');

testingRouter.post('/reset', async (request, response) => {
  await Note.deleteMany({});
  await User.deleteMany({});
  const intialUsers = await userHelper.intialUsers();
  const users = await User.insertMany(intialUsers);
  const initialNotes = await noteHelper.initialNotes();
  const notes = await Note.insertMany(initialNotes);
  for (let i = 0; i < 3; ++i) {
    users[i].notes = [notes[i]._id];
    await users[i].save();
  }
  response.status(204).end();
});

module.exports = testingRouter;
