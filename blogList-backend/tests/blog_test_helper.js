const Blog = require('../models/blog');
const User = require('../models/user');

const nonExistingID = async () => {
  const user = await User.findOne({});
  const blog = new Blog({ 
    title: 'Full Stack Open', 
    url: 'https://fullstackopen.com/en/',
    user: user._id
  });
  await blog.save();
  await blog.remove();
  return blog._id;
};

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs;
};

const initialBlogs = async () => {
  const initialUsers = await User.find({});
  return [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      user: initialUsers[0]._id
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      user: initialUsers[1]._id
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      user: initialUsers[2]._id
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      user: initialUsers[0]._id
    },
    {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      user: initialUsers[1]._id
    },
    {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      user: initialUsers[2]._id
    }
  ];
};

module.exports = { 
  nonExistingID,
  blogsInDB,
  initialBlogs
};
