const getTopMostParentId = (comments, id, topMostParentDepth) => {
  const { depth, id: newId, parentId } = comments.find(comment => comment.id === id);
  if (!depth || depth === topMostParentDepth) return newId;
  else return getTopMostParentId(comments, parentId, topMostParentDepth);
};

const removeParentAndChildren = (comments, topMostParentId) => {
  const topParentDepth = comments.find(comment => comment.id === topMostParentId).depth;
  return comments.filter(
    comment =>
      comment.id !== topMostParentId &&
      comment.parentId !== topMostParentId &&
      getTopMostParentId(comments, comment.id, topParentDepth) !== topMostParentId
  );
};

const testComments = [
  {
    body: 'Testing',
    depth: 0,
    id: '62ad8e',
    parentId: null,
    user: {
      image: 'https://jalford.me/assets/me/JA_Pro_Square_web.jpg',
      uid: 'C7VXSRpoFcQvEp8kVC0EUrr0FkY2',
      username: 'Jacob'
    }
  },
  {
    body: 'subtesting',
    depth: 1,
    id: '3156c3', // Removed
    parentId: '62ad8e',
    user: {
      image: 'https://jalford.me/assets/me/JA_Pro_Square_web.jpg',
      uid: 'C7VXSRpoFcQvEp8kVC0EUrr0FkY2',
      username: 'Jacob'
    }
  },
  {
    body: 'thirdorder',
    depth: 2,
    id: '53bf62',
    parentId: '3156c3', // Removed
    user: {
      image: 'https://jalford.me/assets/me/JA_Pro_Square_web.jpg',
      uid: 'C7VXSRpoFcQvEp8kVC0EUrr0FkY2',
      username: 'Jacob'
    }
  },
  {
    body: 'first order',
    depth: 1,
    id: '66e0e0',
    parentId: '62ad8e',
    user: {
      image: 'https://jalford.me/assets/me/JA_Pro_Square_web.jpg',
      uid: 'C7VXSRpoFcQvEp8kVC0EUrr0FkY2',
      username: 'Jacob'
    }
  },
  {
    body: 'second again',
    depth: 2,
    id: '2f4682',
    parentId: '66e0e0',
    user: {
      image: 'https://jalford.me/assets/me/JA_Pro_Square_web.jpg',
      uid: 'C7VXSRpoFcQvEp8kVC0EUrr0FkY2',
      username: 'Jacob'
    }
  },
  {
    body: 'substring',
    depth: 2,
    id: '7ce120',
    parentId: '3156c3', // removed
    user: {
      image: 'https://jalford.me/assets/me/JA_Pro_Square_web.jpg',
      uid: 'C7VXSRpoFcQvEp8kVC0EUrr0FkY2',
      username: 'Jacob'
    }
  }
];

test('Successfully retrieves top-most parent id', () => {
  expect(getTopMostParentId(testComments, '62ad8e', 0)).toBe('62ad8e');
  expect(getTopMostParentId(testComments, '7ce120', 0)).toBe('62ad8e');
  expect(getTopMostParentId(testComments, '7ce120', 1)).toBe('3156c3');
});

test('Successfully removes parent and children', () => {
  expect(removeParentAndChildren(testComments, '62ad8e')).toHaveLength(0);
  expect(removeParentAndChildren(testComments, '3156c3')).toHaveLength(3);
});
