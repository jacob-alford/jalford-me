import React, { useState } from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import TextField from 'components/words/AlfordField/AlfordField';
import Button, { types as btnTypes } from 'components/words/AlfordButton/AlfordButton';
import Holder from 'components/words/Holder';
import Loader from 'components/words/Loader';

import { NewCommentCard, CardButtons, NotLoggedIn } from './NewComment.styled';

import { userState, useStoreState } from 'global-state';

import { themeHook } from 'theme';

export default function NewComment(props: {
  addComment: (commentText: string) => void;
  closeModal: () => void;
  user: userState;
}) {
  const { addComment, closeModal = () => {}, user } = props;
  const userLoading = user.hydrated === false;
  const theme = useStoreState(state => state.theme);
  const [commentText, setCommentText] = useState('');
  const handleCommentEdit = (evt: React.ChangeEvent<HTMLInputElement>) =>
    setCommentText(evt.target.value);
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
      {user.loggedIn ? (
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
      ) : null}
    </NewCommentCard>
  );
}
