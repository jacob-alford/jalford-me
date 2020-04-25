import { useState, useEffect } from 'react';
import { firebase } from 'firebase.ts';

export default function usePuzzleConnect(id) {
  const [isLoading, setIsLoading] = useState(true);
  const [puzzleData, setPuzzleData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const db = firebase.firestore();
    const puzzleRef = db.collection('puzzles').doc(id);
    puzzleRef
      .get()
      .then(doc => {
        if (doc.exists) setPuzzleData(doc.data());
        else setError(`Puzzle with ID: ${id} doesn't exist!`);
      })
      .catch(err => setError(err))
      .finally(() => setIsLoading(false));
  }, [id]);
  return { puzzleData, isLoading, error };
}
