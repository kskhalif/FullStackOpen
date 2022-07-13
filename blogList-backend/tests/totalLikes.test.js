const totalLikes = require('../utils/list_helper').totalLikes;
const testCases = require('../utils/test_input');

describe('total likes', () => {
  test('when list has zero blogs, equals zero', () => {
    expect(totalLikes(testCases.emptyList)).toBe(0);
  });

  test('when list has one blog, equals likes of that blog', () => {
    expect(totalLikes(testCases.oneBlog)).toBe(7);
  });

  test('when list has many blogs, equals sum of all likes', () => {
    expect(totalLikes(testCases.manyBlogs)).toBe(36);
  });
});
