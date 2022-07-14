const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const initialBlogList = require('../utils/test_input').manyBlogs;
const helper = require('../utils/test_helper');

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogList = initialBlogList.map(blog => new Blog(blog));
  await Blog.insertMany(blogList);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(initialBlogList.length);
});

test('a specific blog can be viewed', async () => {
  const blogs = await Blog.find({});
  const response = await api
    .get(`/api/blogs/${blogs[0].id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);
  
  expect(response.body).toEqual(JSON.parse(JSON.stringify(blogs[0])));
});

test('non-existing ID returns 404', async () => {
  const nonExistingID = await helper.nonExistingID();
  await api
    .get(`/api/blogs/${nonExistingID}`)
    .expect(404);
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "Kacem's Blog", 
    author: 'Kacem Khalife', 
    url: 'N/A', 
    likes: 0 
  };
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const savedBlog = response.body;
  expect(savedBlog).toBeDefined();
  expect(savedBlog.author).toBe('Kacem Khalife');
});

test('"likes" property defaults to zero if not provided', async () => {
  const newBlog = {
    title: "The Ring",
    author: 'Frodo Baggins',
    url: 'coming soon!'
  };
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  
  const savedBlog = response.body;
  expect(savedBlog.likes).toBeDefined();
  expect(savedBlog.likes).toBe(0);
});

test('"author" property defaults to N/A if not provided', async () => {
  const newBlog = {
    title: 'The Ring',
    url: 'coming soon!',
    likes: 0
  };
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  
  const savedBlog = response.body;
  expect(savedBlog.author).toBeDefined();
  expect(savedBlog.author).toBe('N/A');
});

test('missing URL returns 400', async () => {
  const newBlog = {
    title: "No URL means U R not reaL",
    author: "Hacker",
    likes: 100
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
});

test('missing title returns 400', async () => {
  const newBlog = {
    author: 'Hacker',
    url: 'coming soon!',
    likes: 100
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
});

afterAll(() => mongoose.connection.close());
