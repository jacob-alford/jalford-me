const puzzleAccessors = {
  feb22_19:"19-2-22",
  feb26_19:"19-2-26",
  feb27_19:"19-2-27",
  mar3_19:"19-3-3"
}

const puzzles = {
  [puzzleAccessors.feb22_19]:{
    emoji:"thinking_face",
    link:`/puzzles/${puzzleAccessors.feb22_19}`,
    difficulty:"hard",
    uid:"19-2-22"
  },
  [puzzleAccessors.feb26_19]:{
    emoji:"eagle",
    link:puzzleAccessors.feb26_19,
    difficulty:"medium",
    uid:"aaaaab",
    hidden:true
  },
  [puzzleAccessors.mar3_19]:{
    emoji:"selfie",
    link:puzzleAccessors.mar3_19,
    difficulty:"easy",
    uid:"aaaaad",
    hidden:true
  }
}

export default puzzles;
