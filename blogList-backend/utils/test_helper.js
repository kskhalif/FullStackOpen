const Blog = require('../models/blog');

const nonExistingID = async () => {
  const blog = new Blog({ 
    title: 'Full Stack Open', 
    url: 'https://fullstackopen.com/en/' 
  });
  await blog.save();
  await blog.remove();
  return blog._id.toString();
};

module.exports = { nonExistingID };
