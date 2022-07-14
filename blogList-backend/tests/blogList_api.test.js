const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const initialBlogList = require('../utils/test_input').manyBlogs;
const helper = require('../utils/test_helper');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogList);
});

describe('GET requests', () => {
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
});

describe('POST requests', () => {
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
});

describe('DELETE requests', () => {
  test('succeeds if valid ID', async () => {
    const blogsAtStart = await Blog.find({});
    const blogToDelete = blogsAtStart[0];
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);
    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    const URLs = blogsAtEnd.map(blog => blog.url);
    expect(URLs).not.toContain(blogToDelete.url);
  });

  test('invalid ID returns 400', async () => {
    const nonExistingID = await helper.nonExistingID();
    await api
      .delete(`/api/blogs/${nonExistingID}`)
      .expect(400);
  });
});

describe('PUT requests', () => {
  test('number of likes successfuly increments', async () => {
    const blogsAtStart = await Blog.find({});
    const blogToUpdate = blogsAtStart[0];
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .expect(200);
    
    const blogsAtEnd = await Blog.find({});
    const updatedBlog = blogsAtEnd[0];
    expect(updatedBlog.likes).toBe(blogToUpdate.likes + 1);
  });

  test('invalid ID returns 400', async () => {
    const nonExistingID = await helper.nonExistingID();
    await api
      .put(`/api/blogs/${nonExistingID}`)
      .expect(400);
  });
});

afterAll(() => mongoose.connection.close());
