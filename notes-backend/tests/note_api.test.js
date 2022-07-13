const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('notes are returned as json', async () => {
  await api
    .get('/api/notes/all')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are three notes', async () => {
  const response = await api.get('/api/notes/all');
  expect(response.body).toHaveLength(3);
});

test('the first note is about mongoose', async () => {
  const response = await api.get('/api/notes/all');
  expect(response.body[0].content).toMatch('mongoose');
});

afterAll(() => mongoose.connection.close());
