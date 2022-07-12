const blogListRouter = require('express').Router();
const Blog = require('../models/blog');

blogListRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogList => response.send(blogList))
    .catch(() => response.status(404).end());
});

blogListRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);
  blog
    .save()
    .then(result => response.send(result))
    .catch(() => response.status(400).end());
});

module.exports = blogListRouter;
