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
  const users = await User.insertMany(intialUsers);
  const initialNotes = await noteHelper.initialNotes();
  const notes = await Note.insertMany(initialNotes);
  for (let i = 0; i < 3; ++i) {
    users[i].notes = [notes[i]._id];
    await users[i].save();
  }
});

describe('GET requests', () => {
  test('users returned with populated "notes" field', async () => {
    const usersInDB = await userHelper.usersInDB();
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    
    const users = response.body;
    expect(users).toHaveLength(usersInDB.length);
    const notes = users.map(user => user.notes);
    expect(notes[0][0]).toHaveProperty('content');
    expect(notes[0][0]).toHaveProperty('important');
  });

  test('notes returned with populated "users" field', async () => {
    const notesInDB = await noteHelper.notesInDB();
    const response = await api
      .get('/api/notes/all')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    
    const notes = response.body;
    expect(notes).toHaveLength(notesInDB.length);
    const users = notes.map(note => note.user);
    expect(users[0]).toHaveProperty('username');
    expect(users[0]).toHaveProperty('name');
  });
});

afterAll(() => mongoose.connection.close());
