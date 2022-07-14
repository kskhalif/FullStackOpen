const blogListRouter = require('express').Router();
const Blog = require('../models/blog');

blogListRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.send(blogs);
});

blogListRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  blog ? response.send(blog) : response.status(404).end();
});

blogListRouter.post('/', async (request, response) => {
  const newBlog = new Blog(request.body);
  const savedBlog = await newBlog.save();
  response.status(201).send(savedBlog);
});

module.exports = blogListRouter;
