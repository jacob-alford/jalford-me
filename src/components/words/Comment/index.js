import React , { useState } from 'react';
import Markdown from 'react-markdown';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputBase from '@material-ui/core/InputBase';

import Holder from 'components/words/Holder';
import CommentActions from './CommentActions.js';

import markdownConfig from 'helpers/blogParse.js';
import { katexMarkdown } from 'helpers/blogParse.js';

import { themeHook } from 'theme';


const useClasses = themeHook(
  ['getGrayText','getDarkText'],
  ([grayText,darkText]) => ({
    card:{
      marginTop:'8px',
      flexGrow:1
    },
    user:{
      color:grayText,
      fontSize:'24px',
      paddingLeft:'8px'
    },
    avatar:{
      width:'25px',
      height:'25px'
    },
    bodyHolder:{
      padding:'14px'
    },
    depthMeter:{
      width:'2px',
      minWidth:'2px',
      top:0,
      bottom:0,
      marginLeft:'15px',
      marginRight:'15px',
      backgroundColor:'white'
    },
    holderHolder:{
      display:'flex',
      flexDirection:'row',
      alignItems:'stretch'
    },
    commyMarkdown:{
      width:'100%'
    },
    newCommentHolder:{
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    }
  })
);

export default function Comment(props){
  const classes = useClasses(props);
  const {
    comment:{
      body,
      depth,
      comments,
      user,
      id:commentId
    },
    docId,
    updateComment,
    deleteComment,
    handleReply,
    permDelete,
    addComment,
    loggedUser
  } = props;
  /* Edit Comment */
  const [bodyText,setBodyText] = useState(body);
  const handleBodyTextChange = evt => setBodyText(evt.target.value);
  const [isEditing,setIsEditing] = useState(false);
  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    updateComment(bodyText,commentId);
    setIsEditing(false);
  }
  const handleRevert = () => {
    setBodyText(body);
    setIsEditing(false);
  }
  const handleDelete = () => deleteComment(commentId);
  const handlePermDelete = () => permDelete(commentId);
  const handleDoReply = () => handleReply(depth + 1,commentId);

  return (
    <React.Fragment>
      <Container className={classes.holderHolder}>
        {new Array(depth).fill(0).map((_,index) => (
          <div className={classes.depthMeter} key={`depthMeter#${index}`}/>
        ))}
        <Card className={classes.card}>
          <CardContent>
            <Holder direction="row" justify="space-between">
              <Holder direction="row" justify="flex-start">
                {(user.image) ? (
                  <Avatar src={user.image} />
                ) : (
                  <Avatar>
                    {(user.username || "NA").substring(0,2)}
                  </Avatar>
                )}
                <Typography variant="h3" className={classes.user}>
                  {user.username}
                </Typography>
              </Holder>
              <Holder direction="row">
                <CommentActions
                  activeUser={loggedUser.activeUser}
                  commentUser={user}
                  edit={handleEdit}
                  remove={handleDelete}
                  permDelete={handlePermDelete}
                  isEditing={isEditing}/>
              </Holder>
            </Holder>
            {(isEditing) ? (
              <Holder className={classes.bodyHolder}>
                <InputBase
                  value={bodyText}
                  fullWidth
                  multiline
                  onChange={handleBodyTextChange} />
              </Holder>
            ) : (
              <Holder className={classes.bodyHolder}>
                <Markdown className={classes.commyMarkdown} renderers={markdownConfig} source={katexMarkdown(bodyText)} />
              </Holder>
            )}
          </CardContent>
          <CardActions>
            {(depth < 6 && !isEditing && loggedUser.loggedIn) ? (
              <Button size="small" onClick={handleDoReply}>Reply</Button>
            ) : null}
            {(isEditing) ? (
              <React.Fragment>
                <Button size="small" color="primary" onClick={handleSave}>
                  Save
                </Button>
                <Button size="small" onClick={handleRevert}>
                  Cancel
                </Button>
              </React.Fragment>
            ) : null}
          </CardActions>
        </Card>
      </Container>
      {comments && comments.map((comment,index) => (
        <Comment
          docId={docId}
          updateComment={updateComment}
          deleteComment={deleteComment}
          permDelete={permDelete}
          addComment={addComment}
          loggedUser={loggedUser}
          handleReply={handleReply}
          comment={comment}
          user={comment.user}
          key={comment.id}/>
      ))}
    </React.Fragment>
  );
}
