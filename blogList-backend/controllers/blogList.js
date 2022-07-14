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

blogListRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndDelete(request.params.id);
  blog ? response.status(204).send(blog) : response.status(400).end();
});

blogListRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(400).end();
  }
  blog.likes += 1;
  const updatedBlog = await blog.save();
  response.send(updatedBlog);
});

module.exports = blogListRouter;
