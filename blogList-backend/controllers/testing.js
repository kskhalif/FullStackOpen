const testingRouter = require('express').Router();
const Blog = require('../models/blog');
const blogHelper = require('../tests/blog_test_helper');
const User = require ('../models/user');
const userHelper = require('../tests/user_test_helper');

testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  const initialUsers = await userHelper.intialUsers();
  const usersInDB = await User.insertMany(initialUsers);
  const initialBlogs = await blogHelper.initialBlogs();
  const blogsInDB = await Blog.insertMany(initialBlogs);
  for (let i = 0; i < 6; ++i) {
    usersInDB[i % 3].blogs = usersInDB[i % 3].blogs.concat(blogsInDB[i]._id);
    await usersInDB[i % 3].save();
  }
  response.status(204).end();
});

module.exports = testingRouter;
