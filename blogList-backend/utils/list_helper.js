const totalLikes = (blogs) => {
  return blogs.length ? blogs.reduce((sum, blog) => sum + blog.likes, 0) : 0;
};

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes);
  const max = Math.max(...likes);
  const favs = blogs.filter(blog => blog.likes === max);
  return favs.map(blog => blog.title);
};

const mostBlogs = (blogs) => {
  const map = new Map();
  for (const blog of blogs) {
    const author = blog.author;
    const numBlogs = map.get(author);
    if (numBlogs) {
      map.set(author, numBlogs + 1);
    }
    else {
      map.set(author, 1);
    }
  }
  const max = Math.max(...map.values());
  const mostBlogsArray = [];
  for (const [key, val] of map) {
    if (val === max) {
      mostBlogsArray.push({author: key, blogs: val});
    }
  }
  return mostBlogsArray;
};

const mostLikes = (blogs) => {
  const map = new Map();
  for (const blog of blogs) {
    const author = blog.author;
    const likes = blog.likes;
    const totalLikes = map.get(author);
    if (totalLikes) {
      map.set(author, totalLikes + likes);
    }
    else {
      map.set(author, likes);
    }
  }
  const max = Math.max(...map.values());
  const mostLikesArray = [];
  for (const [key, val] of map) {
    if (val === max) {
      mostLikesArray.push({author: key, likes: val});
    }
  }
  return mostLikesArray;
};

module.exports = { 
  totalLikes, 
  favoriteBlog, 
  mostBlogs, 
  mostLikes 
};
