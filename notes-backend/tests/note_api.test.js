const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Note = require('../models/note');
const initialNotes = require('./test_input');
const helper = require('./test_helpers');

beforeEach(async () => {
  await Note.deleteMany({});
  const notes = initialNotes.map(note => new Note(note));
  await Note.insertMany(notes);
});

test('notes are returned as json', async () => {
  await api
    .get('/api/notes/all')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all notes are returned', async () => {
  const response = await api.get('/api/notes/all');
  expect(response.body).toHaveLength(initialNotes.length);
});

test('important notes are returned', async () => {
  const response = await api.get('/api/notes/important');
  const important = initialNotes.filter(note => note.important);
  expect(response.body).toHaveLength(important.length);
});

test('all notes have content', async () => {
  const response = await api.get('/api/notes/all');
  const notes = response.body;
  let pass = true;
  for (const note of notes) {
    if (!note.content) {
      pass = false;
      break;
    }
  }
  expect(pass).toBe(true);
});

test('a valid note can be added', async () => {
  await api
    .post('/api/notes')
    .send({ content: 'async/await simplifies life' })
    .expect(201)
    .expect('Content-Type', /application\/json/);
  
  const notes = await helper.notesInDB();
  const contents = notes.map(note => note.content);
  expect(contents).toHaveLength(initialNotes.length + 1);
  expect(contents).toContain('async/await simplifies life');
});

test('an invalid note cannot be added', async () => {
  await api
    .post('/api/notes')
    .send({ important: true })
    .expect(400);

  const notes = await helper.notesInDB();
  expect(notes).toHaveLength(initialNotes.length);
});

test('a specific note can be viewed', async () => {
  const notes = await helper.notesInDB();
  const response = await api
    .get(`/api/notes/${notes[0].id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);
  
  expect(response.body).toEqual(JSON.parse(JSON.stringify(notes[0])));
});

test('non-existing ID returns 404', async () => {
  const nonExistingID = await helper.nonExistingID();
  await api
    .get(`/api/notes/${nonExistingID}`)
    .expect(404);
});

test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDB();
  const noteToDelete = notesAtStart[0];
  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204);
  
  const notesAtEnd = await helper.notesInDB();
  expect(notesAtEnd).toHaveLength(notesAtStart.length - 1);

  const contents = notesAtEnd.map(note => note.content);
  expect(contents).not.toContain(noteToDelete.content);
});

afterAll(() => mongoose.connection.close());
