const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');
const blogHelper = require('./blog_test_helper');
const userHelper = require('./user_test_helper');

beforeEach(async () => {
  await api.post('/api/testing/reset');
});

describe('POST /users', () => {
  test('successfully adds new user if valid data', async () => {
    const usersAtStart = await userHelper.usersInDB();
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
    
    const usersAtEnd = await userHelper.usersInDB();
    const usernames = usersAtEnd.map(user => user.username);
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    expect(usernames).toContain(newUser.username.toLowerCase());
  });

  test('fails if username already taken', async () => {
    const usersAtStart = await userHelper.usersInDB();
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
    const usersAtEnd = await userHelper.usersInDB();
    expect(usersAtEnd).toEqual(usersAtStart);
   
  });

  test('fails if username invalid', async () => {
    const usersAtStart = await userHelper.usersInDB();
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
    const usersAtEnd = await userHelper.usersInDB();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('fails if password invalid', async () => {
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

describe('GET /users', () => {
  test('all users returned with populated "blogs" field', async () => {
    const usersInDB = await userHelper.usersInDB();
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    
    const users = response.body;
    expect(users).toHaveLength(usersInDB.length);
    const blogs = users.map(user => user.blogs);
    expect(blogs[0][0]).toHaveProperty('title');
    expect(blogs[0][0]).toHaveProperty('author');
    expect(blogs[0][0]).toHaveProperty('url');
    expect(blogs[0][0]).toHaveProperty('likes');
  });

  test('specific user returned with populated "blogs" field', async () => {
    const usersInDB = await userHelper.usersInDB();
    const userToFetch = usersInDB[0];
    const id = userToFetch._id.toString();
    const response = await api
      .get(`/api/users/${id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    
    const fetchedUser = response.body;
    expect(fetchedUser._id.toString()).toBe(id);
    const blogs = fetchedUser.blogs;
    expect(blogs[0]).toHaveProperty('title');
    expect(blogs[0]).toHaveProperty('author');
    expect(blogs[0]).toHaveProperty('url');
    expect(blogs[0]).toHaveProperty('likes');
  });

  test('invalid ID returns 404', async () => {
    const id = await userHelper.nonExistingID();
    await api
      .get(`/api/users/${id.toString()}`)
      .expect(404);
  });
});

describe('GET /blogs', () => {
  test('all blogs returned with populated "user" field', async () => {
    const blogsInDB = await blogHelper.blogsInDB();
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    
    const blogs = response.body;
    expect(blogs).toHaveLength(blogsInDB.length);
    expect(blogs[0].user).toHaveProperty('username');
    expect(blogs[0].user).toHaveProperty('name');
  });

  test('specific blog returned with populated "user" field', async () => {
    const blogsInDB = await blogHelper.blogsInDB();
    const blogToFetch = blogsInDB[0];
    const id = blogToFetch._id.toString();
    const response = await api
      .get(`/api/blogs/${id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    
    const fetchedBlog = response.body;
    expect(fetchedBlog._id.toString()).toBe(id);
    const user = fetchedBlog.user;
    expect(user).toHaveProperty('username');
    expect(user).toHaveProperty('name');
  });

  test('invalid ID returns 404', async () => {
    const id = await blogHelper.nonExistingID();
    await api
      .get(`/api/blogs/${id.toString()}`)
      .expect(404);
  });
});

describe('POST /blogs', () => {
  test('a logged in user can add a valid blog', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'user1', password: 'P@ssword1' })
      .expect(200);

    const token = loginResponse.body.token;
    const newBlog = {
      title: "The Ring",
      author: 'Frodo Baggins',
      url: 'coming soon!',
    };
    const postResponse = await api
      .post('/api/blogs')
      .auth(token, { type: 'bearer' })
      .send(newBlog)
      .expect(201);
    
    const savedBlog = postResponse.body;
    const allBlogs = await blogHelper.blogsInDB();
    const titles = allBlogs.map(blog => blog.title);
    expect(titles).toContain(savedBlog.title);

    const user = await User.findById(savedBlog.user);
    const blogIDs = user.blogs.map(id => id.toString());
    expect(blogIDs).toContain(savedBlog._id.toString());
  });

  test('invalid token returns 401 + message', async () => {
    const newBlog = {
      title: "The Ring",
      author: 'Frodo Baggins',
      url: 'coming soon!',
    };
    const response = await api
      .post('/api/blogs')
      .auth(undefined, { type: 'bearer' })
      .send(newBlog)
      .expect(401);
    
    expect(response.body.error).toBe('invalid token');
  });
});

describe('DELETE /blogs', () => {
  test('a logged in user can delete one of their existing blogs', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'user1', password: 'P@ssword1' })
      .expect(200);

    const token = loginResponse.body.token;
    const user = await User.findOne({ username: 'user1' });
    const blogToDeleteID = user.blogs[0].toString();
    const blogToDelete = await Blog.findById(blogToDeleteID);
    await api
      .delete(`/api/blogs/${blogToDeleteID}`)
      .auth(token, { type: 'bearer' })
      .expect(200);
    
    const blogs = await blogHelper.blogsInDB();
    const titles = blogs.map(blog => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
    const userAtEnd = await User.findOne({ username: 'user1' });
    const blogIDs = userAtEnd.blogs.map(id => id.toString());
    expect(blogIDs).not.toContain(blogToDeleteID);
  });
  
  test("a logged in user cannot delete another user's blog", async () => {
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'user1', password: 'P@ssword1' })
      .expect(200);

    const token = loginResponse.body.token;
    const user = await User.findOne({ username: 'user2' });
    const blogToDeleteID = user.blogs[0].toString();
    const deleteResponse = await api
      .delete(`/api/blogs/${blogToDeleteID}`)
      .auth(token, { type: 'bearer' })
      .expect(401);
    
    expect(deleteResponse.body.error).toBe('user not authorized to delete blog');
  });
});

describe('PUT /blogs', () => {
  test('a logged in user can "like" an existing blog', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'user1', password: 'P@ssword1' })
      .expect(200);

    const token = loginResponse.body.token;
    const user = await User.findOne({ username: 'user2' });
    const blogToLikeID = user.blogs[0].toString();
    const blogToLike = await Blog.findById(blogToLikeID);
    const putResponse = await api
      .put(`/api/blogs/${blogToLikeID}`)
      .auth(token, { type: 'bearer' })
      .expect(200);
    
    const likedBlog = putResponse.body;
    expect(likedBlog.likes).toBe(blogToLike.likes + 1);
  });

  test('invalid token returns 401 + message', async () => {
    const blogs = await blogHelper.blogsInDB();
    const blogToLike = blogs[0];
    const id = blogToLike._id.toString();
    const putResponse = await api
      .put(`/api/blogs/${id}`)
      .auth(undefined, { type: 'bearer' })
      .expect(401);
    
    expect(putResponse.body.error).toBe('invalid token');
  });
});

afterAll(() => mongoose.connection.close());
