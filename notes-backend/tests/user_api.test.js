const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const User = require('../models/user');
const helper = require('./user_test_helper');

beforeEach(async () => {
  const intialUsers = await helper.intialUsers();
  await User.deleteMany({});
  await User.insertMany(intialUsers);
});

describe('POST requests', () => {
  test('successfully adds new user if valid data', async () => {
    const usersAtStart = await helper.usersInDB();
    const newUser = {
      username: 'userY',
      name: 'Person Y',
      password: 'P@sswordY'
    };
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    
    const usersAtEnd = await helper.usersInDB();
    const usernames = usersAtEnd.map(user => user.username);
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    expect(usernames).toContain(newUser.username);
  });
});

afterAll(() => mongoose.connection.close());
