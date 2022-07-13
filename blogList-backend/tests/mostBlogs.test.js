const mostBlogs = require('../utils/list_helper').mostBlogs;
const testCases = require('../utils/test_input');

describe('most blogs', () => {
  test('when list has zero blogs, returns empty array', () => {
    expect(mostBlogs(testCases.emptyList))
      .toEqual([]);
  });

  test('when list has one blog, returns that author', () => {
    expect(mostBlogs(testCases.oneBlog))
      .toEqual([{ author: "Michael Chan", blogs: 1 }]);
  });

  test('when list has many blogs, returns author with most blogs', () => {
    expect(mostBlogs(testCases.manyBlogs))
      .toEqual([{ author: "Robert C. Martin", blogs: 3 }]);
  });

  test('when multiple authors are tied for most blogs, returns them all', () => {
    expect(mostBlogs(testCases.tiedMostBlogs))
    .toEqual([
      { author: "Edsger W. Dijkstra", blogs: 3 },
      { author: "Robert C. Martin", blogs: 3 }
    ]);
  });
});
