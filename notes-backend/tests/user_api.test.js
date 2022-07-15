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

describe('GET requests', () => {
  test('all users are returned and in proper format', async () => {
    const usersInDB = await helper.usersInDB();
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(usersInDB.length);
  });
});

describe('POST requests', () => {
  test('successfully adds new user if valid data', async () => {
    const usersAtStart = await helper.usersInDB();
    const newUser = {
      username: 'userY',
      name: 'Person Y',
      password: 'P@ssword123'
    };
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    
    const usersAtEnd = await helper.usersInDB();
    const usernames = usersAtEnd.map(user => user.username);
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    expect(usernames).toContain(newUser.username.toLowerCase());
  });

  test('fails if username already taken', async () => {
    const usersAtStart = await helper.usersInDB();
    const newUser = {
      username: 'user1',
      name: 'Existing User',
      password: 'P@ssword123'
    };
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
    
    expect(response.body.error).toContain("expected `username` to be unique");
    const usersAtEnd = await helper.usersInDB();
    expect(usersAtEnd).toEqual(usersAtStart);
   
  });

  test('fails if username invalid', async () => {
    const usersAtStart = await helper.usersInDB();
    const newUser = {
      username: '12 3',
      name: 'Invalid User',
      password: 'P@ssword123'
    };
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
    
    expect(response.body.error).toContain('username must have at least one letter and contain zero spaces');
    const usersAtEnd = await helper.usersInDB();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('fails if password invalid', async () => {
    const usersAtStart = await helper.usersInDB();
    const newUser = {
      username: 'userY',
      name: 'Person Y',
      password: 'password123'
    };
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain('uppercase');
    expect(response.body.error).toContain('symbols');
  });

  test('name defaults to username if not provided', async () => {
    const usersAtStart = await helper.usersInDB();
    const newUser = {
      username: 'userY',
      password: 'P@ssword123'
    };
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    
    expect(response.body.name).toBe(newUser.username.toLowerCase());
  });
});

afterAll(() => mongoose.connection.close());
