import React , { useState } from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Holder from 'components/words/Holder';
import Loader from 'components/words/Loader';

import useRHook from 'components/bindings/hooks/useRHook';

import { themeHook } from 'theme';

const useClasses = themeHook({
  loginMessage:{
    color:'rgba(0,0,0,.64)',
    marginTop:'8px'
  }
});

export default function NewComment(props){
  const { addComment } = props;
  const { user , userLoading } = useRHook();
  const [commentText,setCommentText] = useState("");
  const classes = useClasses();
  const handleCommentEdit = evt => setCommentText(evt.target.value);
  if(userLoading) return <Loader />;
  return (
    <Card>
      <CardContent>
        <Holder>
         {(!user.loggedIn) ? (
            <Typography variant="body1" className={classes.loginMessage}>
              log in to post a comment
            </Typography>
          ) : (
            <TextField
              multiline
              fullWidth
              label="New Comment"
              onChange={handleCommentEdit}
              value={commentText} />
          )}
        </Holder>
      </CardContent>
      {(user.loggedIn) ? (
        <CardActions>
          <Button
            color='primary'
            disabled={!user.loggedIn}
            onClick={() => addComment(commentText)}>
            Submit
          </Button>
        </CardActions>
      ) : null}
    </Card>
  );
}
