const puzzleAccessors = {
  feb22_19: '19-2-22',
  feb26_19: '19-2-26',
  feb27_19: '19-2-27',
  mar3_19: '19-3-3'
};

const puzzles = {
  [puzzleAccessors.feb22_19]: {
    text: '1',
    link: `/puzzles/${puzzleAccessors.feb22_19}`,
    difficulty: 'easy',
    uid: puzzleAccessors.feb22_19
  },
  [puzzleAccessors.feb26_19]: {
    text: '2',
    link: `/puzzles/${puzzleAccessors.feb26_19}`,
    difficulty: 'medium',
    uid: puzzleAccessors.feb26_19
  },
  [puzzleAccessors.mar3_19]: {
    text: '3',
    link: `/puzzles/${puzzleAccessors.mar3_19}`,
    difficulty: 'hard',
    uid: puzzleAccessors.mar3_19
  }
};

export default puzzles;
