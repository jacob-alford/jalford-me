import { useCallback } from 'react';

import { firebase } from 'firebase.ts';

import useRHook from 'components/bindings/hooks/useRHook';
import useNotify from 'components/bindings/hooks/useNotify';

const getUserId = user => user && user.activeUser.uid;
const getPuzzles = user => (user && user.activeUser.puzzles) || [];

export default function useRPuzzUpdate(puzzleId) {
  const { user, userLoading } = useRHook();
  const notify = useNotify({
    timeout: 4500,
    alertType: 'info',
    body: `Set to 'solved.'`
  });
  return useCallback(() => {
    const puzzles = getPuzzles(user);
    if (!puzzles.includes(puzzleId) && !userLoading) {
      const db = firebase.firestore();
      const userRef = db.doc(`users/${getUserId(user)}`);
      userRef
        .update({
          puzzles: [...puzzles, puzzleId]
        })
        .then(() => notify())
        .catch(err => {
          notify({
            alertType: 'error',
            body: `There was a problem setting puzzle to 'solved!'  Make sure you're logged in!`
          });
          console.error(err);
        });
    } else {
      notify({
        alertType: 'info',
        body: `Wow, solved it twice, heh?`
      });
    }
  }, [user, puzzleId, notify, userLoading]);
}
