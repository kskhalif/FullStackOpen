const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Note = require('../models/note');
const helper = require('./note_test_helper');

beforeEach(async () => {
  await Note.deleteMany({});
  await Note.insertMany(helper.initialNotes);
});

describe('when fetching existing notes', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes/all')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  
  test('all notes are returned', async () => {
    const notes = await helper.notesInDB();
    const response = await api.get('/api/notes/all');
    expect(response.body).toHaveLength(notes.length);
  });
  
  test('important notes are returned', async () => {
    const notes = await helper.notesInDB();
    const response = await api.get('/api/notes/important');
    const important = notes.filter(note => note.important);
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
});

describe('when fetching a specific note', () => {
  test('succeeds if valid ID', async () => {
    const notes = await helper.notesInDB();
    const response = await api
      .get(`/api/notes/${notes[0].id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    
    expect(response.body).toEqual(JSON.parse(JSON.stringify(notes[0])));
  });
  
  test('fails with status code 404 if invalid ID', async () => {
    const nonExistingID = await helper.nonExistingID();
    await api
      .get(`/api/notes/${nonExistingID}`)
      .expect(404);
  });
});

describe('when adding a note', () => {
  test('succeeds if valid data', async () => {
    await api
      .post('/api/notes')
      .send({ content: 'async/await simplifies life' })
      .expect(201)
      .expect('Content-Type', /application\/json/);
    
    const notes = await helper.notesInDB();
    const contents = notes.map(note => note.content);
    expect(contents).toHaveLength(helper.initialNotes.length + 1);
    expect(contents).toContain('async/await simplifies life');
  });
  
  test('fails with status code 400 if invalid data', async () => {
    await api
      .post('/api/notes')
      .send({ important: true })
      .expect(400);
  
    const notes = await helper.notesInDB();
    expect(notes).toHaveLength(helper.initialNotes.length);
  });
});

describe('when deleting a note', () => {
  test('succeeds if valid ID', async () => {
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

  test('fails with status code 400 if invalid ID', async () => {
    const nonExistingID = await helper.nonExistingID();
    await api
      .delete(`/api/notes/${nonExistingID}`)
      .expect(400);
  });
});

describe('when updating a note', () => {
  test('succeeds if valid ID', async () => {
    const notesAtStart = await helper.notesInDB();
    const noteToUpdate = notesAtStart[0];
    await api
      .put(`/api/notes/${noteToUpdate.id}`)
      .expect(200);

    const notesAtEnd = await helper.notesInDB();
    const updatedNote = notesAtEnd[0];
    expect(updatedNote.important).not.toBe(noteToUpdate.important);
  });

  test('fails with status code 400 if invalid ID', async () => {
    const nonExistingID = await helper.nonExistingID();
    await api
      .put(`/api/notes/${nonExistingID}`)
      .expect(400);
  });
});

afterAll(() => mongoose.connection.close());
