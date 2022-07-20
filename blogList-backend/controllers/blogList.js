const blogListRouter = require('express').Router();
const Blog = require('../models/blog');

blogListRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 });
  response.send(blogs);
});

blogListRouter.get('/:id', async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)
    .populate('user', {username: 1, name: 1 });
  blog ? response.send(blog) : response.status(404).end();
});

blogListRouter.post('/', async (request, response) => {
  const user = request.user;
  const blog = request.body;
  blog.user = user._id;
  const savedBlog = await Blog.create(blog);
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).send(savedBlog);
});

blogListRouter.delete('/:id', async (request, response) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(400).send({
      error: 'blog does not exist'
    });
  }
  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).send({
      error: 'user not authorized to delete blog'
    });
  }
  user.blogs = user.blogs.filter(id => id.toString() !== blog._id.toString());
  await user.save();
  const deletedBlog = await blog.remove();
  response.send(deletedBlog);
});

blogListRouter.put('/:id', async (request, response) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(400).send({
      error: 'blog does not exist'
    });
  }
  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).send({
      error: 'user not authorized to update blog'
    });
  }
  blog.likes += 1;
  const updatedBlog = await blog.save();
  response.send(updatedBlog);
});

module.exports = blogListRouter;
