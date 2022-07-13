const favoriteBlog = require('../utils/list_helper').favoriteBlog;
const testCases = require('../utils/test_input');

describe('favorite blog', () => {
  test('when list has zero blogs, returns empty array', () => {
    expect(favoriteBlog(testCases.emptyList))
      .toEqual([]);
  });

  test('when list has one blog, returns that blog', () => {
    expect(favoriteBlog(testCases.oneBlog))
      .toEqual(["React patterns"]);
  });

  test('when list has many blogs, returns blog with most likes', () => {
    expect(favoriteBlog(testCases.manyBlogs))
      .toEqual(["Canonical string reduction"]);
  });

  test('when multiple blogs are tied for most likes, returns them all', () => {
    expect(favoriteBlog(testCases.tiedFavorite))
    .toEqual([
      "Go To Statement Considered Harmful",
      "Canonical string reduction"
    ]);
  });
});
