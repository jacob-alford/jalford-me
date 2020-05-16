import React, { useState } from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Holder from 'components/words/Holder';
import Loader from 'components/words/Loader';

import { userState, useStoreState } from 'global-state';

import { themeHook } from 'theme';

const useClasses = themeHook({
  loginMessage: {
    color: (config: { tldState: string }) =>
      config.tldState === 'light' ? 'rgba(0,0,0,.87)' : 'rgba(255,255,255,1)',
    marginTop: '8px',
    textAlign: 'center'
  },
  newCommentCard: {
    background: (config: { tldState: string }) =>
      config.tldState === 'light' ? '#fff' : '#454545'
  },
  commentText: {
    color: (config: { tldState: string }) =>
      config.tldState === 'light' ? 'rgba(0,0,0,.87)' : 'rgba(255,255,255,1)'
  }
});
export default function NewComment(props: {
  addComment: (commentText: string) => void;
  closeModal: () => void;
  user: userState;
}) {
  const { addComment, closeModal = () => {}, user } = props;
  const userLoading = user.hydrated === false;
  const tldState = useStoreState(state => state.theme);
  const [commentText, setCommentText] = useState('');
  const classes = useClasses({ tldState });
  const handleCommentEdit = (evt: React.ChangeEvent<HTMLInputElement>) =>
    setCommentText(evt.target.value);
  if (userLoading) return <Loader />;
  return (
    <Card className={classes.newCommentCard}>
      <CardContent>
        <Holder>
          {!user.loggedIn ? (
            <Typography variant='body1' className={classes.loginMessage}>
              log in to post a comment
            </Typography>
          ) : (
            <React.Fragment>
              <TextField
                multiline
                fullWidth
                label='New Comment'
                onChange={handleCommentEdit}
                value={commentText}
              />
              <Typography variant='body1' className={classes.loginMessage}>
                **<strong>[bold]</strong>** — *<i>[italic]</i>* — ~~
                <s>[strikethrough]</s>~~
              </Typography>
            </React.Fragment>
          )}
        </Holder>
      </CardContent>
      {user.loggedIn ? (
        <CardActions>
          <Button
            color='primary'
            disabled={!user.loggedIn || commentText === ''}
            onClick={() => {
              addComment(commentText);
              closeModal();
            }}>
            Submit
          </Button>
        </CardActions>
      ) : null}
    </Card>
  );
}
