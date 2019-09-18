import React , { useState } from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import Holder from 'components/words/Holder';

import { themeHook } from 'theme';

import useRHook from 'components/bindings/hooks/useRHook';

const useClasses = themeHook({
  holder:{
    color:'black',
    marginTop:'14px'
  },
  card:{
    width:'100%'
  },
  title:{
    textAlign:'center'
  }
});

export default function NewComment(){
  const [commentText,setCommentText] = useState("");
  const handleCommentEdit = evt => setCommentText(evt.target.value);
  const { user , userLoading } = useRHook();
  const classes = useClasses();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Holder className={classes.holder}>
          {(userLoading) ? <CircularProgress />
         : (!user.loggedIn) ? (
            <Typography variant="body2">
              You must log in first!
            </Typography>
           ) : (
            <React.Fragment>
              <Typography variant="h3" className={classes.title}>
                New Comment
              </Typography>
              <TextField
                multiline
                fullWidth
                onChange={handleCommentEdit}
                value={commentText} />
            </React.Fragment>
           )}
        </Holder>
      </CardContent>
      <CardActions>
        <Button color='primary' disabled={!user.loggedIn || userLoading}>
          Submit
        </Button>
      </CardActions>
    </Card>
  );
}
