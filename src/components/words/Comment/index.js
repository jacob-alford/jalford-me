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
    }
  })
);

export default function Comment(props){
  const [isEditing,setIsEditing] = useState(false);
  const {
    comment:{
      body,
      depth,
      comments,
      user
    }
  } = props;
  const [bodyText,setBodyText] = useState(body);
  const handleBodyTextChange = evt => setBodyText(evt.target.value);
  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleRevert = () => {
    setBodyText(body);
    setIsEditing(false);
  }
  const classes = useClasses(props);
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
                    {user.username.substring(0,2)}
                  </Avatar>
                )}
                <Typography variant="h3" className={classes.user}>
                  {user.username}
                </Typography>
              </Holder>
              <Holder direction="row">
                <CommentActions
                  activeUser={{uid:'ghi',permissions:{value:10}}}
                  commentUser={user}
                  edit={handleEdit}
                  delete={val => val}
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
            {(depth < 6 && !isEditing) ? (
              <Button size="small">Reply</Button>
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
        <Comment comment={comment} user={comment.user} key={`comment#${index}Depth${comment.depth}`}/>
      ))}
    </React.Fragment>
  );
}
