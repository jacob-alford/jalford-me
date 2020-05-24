import React, { useState, useCallback, memo } from 'react';

import TextField from 'components/words/AlfordField/AlfordField';
import Button, { types as btnTypes } from 'components/words/AlfordButton/AlfordButton';
import Loader from 'components/words/Loader';

import { NewCommentCard, CardButtons, NotLoggedIn } from './NewComment.styled';

import { userState, useStoreState } from 'global-state';

interface NewCommentProps {
  addComment: (commentText: string) => void;
  closeModal: () => void;
  user: userState;
}

const NewComment = (props: NewCommentProps) => {
  const { addComment, closeModal = () => {}, user } = props;
  const theme = useStoreState(state => state.theme);
  const [commentText, setCommentText] = useState('');
  const handleCommentEdit = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => setCommentText(evt.target.value),
    []
  );
  const userLoading = user.hydrated === false;
  if (userLoading) return <Loader />;
  return (
    <NewCommentCard theme={theme}>
      {!user.loggedIn ? (
        <NotLoggedIn theme={theme} variant='body1'>
          log in to post a comment
        </NotLoggedIn>
      ) : (
        <>
          <TextField
            theme={theme}
            multiline
            fullWidth
            label='New Comment'
            onChange={handleCommentEdit}
            value={commentText}
          />
          <NotLoggedIn theme={theme} variant='body1'>
            **<strong>[bold]</strong>** — *<i>[italic]</i>* — ~~
            <s>[strikethrough]</s>~~
          </NotLoggedIn>
        </>
      )}
      {user.loggedIn && (
        <CardButtons>
          <Button
            type={btnTypes.success}
            color='primary'
            disabled={!user.loggedIn || commentText === ''}
            onClick={() => {
              addComment(commentText);
              closeModal();
            }}>
            Submit
          </Button>
        </CardButtons>
      )}
    </NewCommentCard>
  );
};

const Eq = (i1: any, i2: any) => i1 === i2;

export default memo(
  NewComment,
  ({ user: userP }, { user: userN }) =>
    Eq(userP.loggedIn, userN.loggedIn) && Eq(userP.hydrated, userN.hydrated)
);
