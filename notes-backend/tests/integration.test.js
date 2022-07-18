const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Note = require('../models/note');
const User = require('../models/user')
const noteHelper = require('./note_test_helper');
const userHelper = require('./user_test_helper');

beforeEach(async () => {
  await Note.deleteMany({});
  await User.deleteMany({});
  const intialUsers = await userHelper.intialUsers();
  await User.insertMany(intialUsers);
});

test('posting new notes with user IDs', async () => {
  const initialNotes = await noteHelper.initialNotes();
  for (const note of initialNotes) {
    await api
      .post('/api/notes')
      .send(note)
      .expect(201)
  }
});

afterAll(() => mongoose.connection.close());
