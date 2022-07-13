const mostLikes = require('../utils/list_helper').mostLikes;
const testCases = require('../utils/test_input');

describe('most likes', () => {
  test('when list has zero blogs, returns empty array', () => {
    expect(mostLikes(testCases.emptyList))
      .toEqual([]);
  });

  test('when list has one blog, returns that author', () => {
    expect(mostLikes(testCases.oneBlog))
      .toEqual([{ author: "Michael Chan", likes: 7 }]);
  });

  test('when list has many blogs, returns author with most likes', () => {
    expect(mostLikes(testCases.manyBlogs))
      .toEqual([{ author: "Edsger W. Dijkstra", likes: 17 }]);
  });

  test('when multiple authors are tied for most likes, returns them all', () => {
    expect(mostLikes(testCases.tiedMostLikes))
    .toEqual([
      { author: "Edsger W. Dijkstra", likes: 17 },
      { author: "Robert C. Martin", likes: 17 }
    ]);
  });
});
