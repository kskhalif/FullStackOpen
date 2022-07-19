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

describe('POST /login', () => {
  test('valid login returns user details & token', async () => {
    const response = await api
      .post('/api/login')
      .send({ username: 'user1', password: 'P@ssword1' })
      .expect(200);
    
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('username');
    expect(response.body).toHaveProperty('name');
  });

  test('invalid username returns 401 + message', async () => {
    const response = await api
      .post('/api/login')
      .send({ username: 'user4', password: 'P@ssword4' })
      .expect(401);
    
    expect(response.body.error).toBe('invalid username');
  });

  test('incorrect password returns 401 + message', async () => {
    const response = await api
      .post('/api/login')
      .send({ username: 'user1', password: 'P@ssword4' })
      .expect(401);
    
    expect(response.body.error).toBe('incorrect password');
  });
});

describe('GET /notes', () => {
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

describe('POST /notes', () => {
  test('a logged in user can post a note', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'user1', password: 'P@ssword1' })
      .expect(200);

    const token = loginResponse.body.token;
    const postResponse = await api
      .post('/api/notes')
      .auth(token, { type: 'bearer' })
      .send({ content: 'Person One here, over and out.' })
      .expect(201);
    
    const savedNote = postResponse.body;
    const allNotes = await noteHelper.notesInDB();
    const contents = allNotes.map(note => note.content);
    expect(contents).toContain(savedNote.content);

    const user = await User.findById(savedNote.user);
    const noteIDs = user.notes.map(id => id.toString());
    expect(noteIDs).toContain(savedNote.id);
  });

  test('invalid token returns 401 + message', async () => {
    const response = await api
      .post('/api/notes')
      .auth('invalid_token', { type: 'bearer' })
      .expect(401);
    
    expect(response.body.error).toBe('invalid token');
  });
});

describe('DELETE /notes', () => {
  test('a logged in user can delete one of their existing note', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'user1', password: 'P@ssword1' })
      .expect(200);
    
    const token = loginResponse.body.token;
    const user = await User.findOne({ username: 'user1' });
    const noteToDeleteID = user.notes[0];
    const noteToDelete = await Note.findById(noteToDeleteID);
    await api
      .delete(`/api/notes/${noteToDeleteID}`)
      .auth(token, { type: 'bearer' })
      .expect(204);
    
    const notes = await noteHelper.notesInDB();
    const userAfter = await User.findOne({ username: 'user1' });
    const contents = notes.map(note => note.content);
    expect(contents).not.toContain(noteToDelete.content);
    const noteIDs = userAfter.notes.map(id => id.toString());
    expect(noteIDs).not.toContain(noteToDeleteID.toString());
  });

  test("a logged in user cannot delete another user's note", async () => {
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'user1', password: 'P@ssword1' })
      .expect(200);
    
    const token = loginResponse.body.token;
    const user = await User.findOne({ username: 'user2' });
    const noteToDeleteID = user.notes[0];
    const deleteResponse = await api
      .delete(`/api/notes/${noteToDeleteID}`)
      .auth(token, { type: 'bearer' })
      .expect(401);
    
    expect(deleteResponse.body.error).toBe('user not authorized to delete note');
  });
});

describe('PUT /notes', () => {
  test('a logged in user can update one of their existing notes', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'user1', password: 'P@ssword1' })
      .expect(200);

    const token = loginResponse.body.token;
    const user = await User.findOne({ username: 'user1' });
    const noteToUpdateID = user.notes[0];
    const noteToUpdate = await Note.findById(noteToUpdateID);
    const putResponse = await api
      .put(`/api/notes/${noteToUpdateID}`)
      .auth(token, { type: 'bearer' })
      .expect(200);
    
    const updatedNote = putResponse.body;
    expect(updatedNote.important).not.toBe(noteToUpdate.important);
  });

  test("a logged in user cannot update another user's note", async () => {
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'user1', password: 'P@ssword1' })
      .expect(200);
    
    const token = loginResponse.body.token;
    const user = await User.findOne({ username: 'user2' });
    const noteToUpdateID = user.notes[0];
    const putResponse = await api
      .put(`/api/notes/${noteToUpdateID}`)
      .auth(token, { type: 'bearer' })
      .expect(401);
    
    expect(putResponse.body.error).toBe('user not authorized to update note');
  });
});

afterAll(() => mongoose.connection.close());
